import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { encodeArrayKey, ERC725JSONSchema } from '@erc725/erc725.js';
import {
  faChevronLeft,
  faChevronRight,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isAddress } from 'viem';
import { hexToString } from 'viem';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

import AddressInfos from '@/components/features/AddressInfos';
import { NetworkContext } from '@/contexts/NetworksContext';
import { getDataBatch } from '@/utils/erc725y';

interface Props {
  schema: ERC725JSONSchema;
  values: (string | null)[];
  userAddress: string;
}

const ITEMS_PER_PAGE = 10;

const ArrayDataKeyTableWithPagination: React.FC<Props> = ({
  schema,
  values,
  userAddress,
}) => {
  const { network } = useContext(NetworkContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    Array<{ index: number; address: string; name?: string; symbol?: string }>
  >([]);
  const [isSearching, setIsSearching] = useState(false);

  const paginationRef = useRef<HTMLElement>(null);

  const totalPages = Math.ceil(values.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageData = values.slice(startIndex, endIndex);

  // Fetch asset metadata for search
  useEffect(() => {
    if (!searchQuery || !network) return;

    const fetchAssetMetadata = async () => {
      setIsSearching(true);
      const query = searchQuery.toLowerCase().trim();

      // First, find addresses that match the query (case-insensitive partial match)
      const addressMatches = values
        .map((address, index) => ({ address, index }))
        .filter(
          ({ address }) =>
            address &&
            address.toLowerCase().includes(query) &&
            isAddress(address),
        );

      // If query looks like an address or starts with 0x, return address matches only
      if (isAddress(query) || (query.startsWith('0x') && query.length >= 3)) {
        setSearchResults(
          addressMatches.map(({ address, index }) => ({
            index,
            address: address!,
          })),
        );
        setIsSearching(false);
        return;
      }

      // Otherwise, fetch metadata for all addresses to search by name/symbol
      const addressesToFetch = values.filter(
        (addr): addr is string => addr !== null && isAddress(addr),
      );

      try {
        // Fetch name and symbol for all addresses
        const metadata: {
          [address: string]: { name: string; symbol: string };
        } = {};
        const results: Array<{
          index: number;
          address: string;
          name?: string;
          symbol?: string;
        }> = [];

        // Fetch metadata for each address
        await Promise.all(
          addressesToFetch.map(async (address) => {
            try {
              const [nameBytesValue, symbolBytesValue] = await getDataBatch(
                address,
                [
                  ERC725YDataKeys.LSP4.LSP4TokenName,
                  ERC725YDataKeys.LSP4.LSP4TokenSymbol,
                ],
                network,
              );

              const name = nameBytesValue
                ? hexToString(nameBytesValue as `0x${string}`)
                : '';
              const symbol = symbolBytesValue
                ? hexToString(symbolBytesValue as `0x${string}`)
                : '';

              metadata[address] = { name, symbol };

              // Check if name or symbol matches query
              if (
                name.toLowerCase().includes(query) ||
                symbol.toLowerCase().includes(query)
              ) {
                const index = values.findIndex((v) => v === address);
                if (index !== -1) {
                  results.push({ index, address, name, symbol });
                }
              }
            } catch (error) {
              // Skip addresses that fail to fetch
              console.error(`Error fetching metadata for ${address}:`, error);
            }
          }),
        );

        setSearchResults(results);
      } catch (error) {
        console.error('Error fetching asset metadata:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchAssetMetadata();
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, values, network]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchResultClick = (index: number) => {
    const targetPage = Math.floor(index / ITEMS_PER_PAGE) + 1;
    setCurrentPage(targetPage);
    setSearchQuery('');
    setSearchResults([]);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      // Calculate start and end of middle section
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the start
      if (currentPage <= 3) {
        end = 4;
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Show last page
      pages.push(totalPages);
    }

    return (
      <nav
        ref={paginationRef}
        className="pagination is-centered is-rounded gap-1"
        role="navigation"
        aria-label="pagination"
      >
        <ul className="pagination-list is-flex is-align-items-center is-justify-content-center gap-2">
          <li>
            <a
              className="pagination-previous"
              onClick={() => handlePageChange(currentPage - 1)}
              style={{
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1,
                marginRight: '0.5rem',
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </a>
          </li>
          {pages.map((page, index) => {
            if (page === '...') {
              return (
                <li key={`ellipsis-${index}`}>
                  <span className="pagination-ellipsis">&hellip;</span>
                </li>
              );
            }

            const pageNumber = page as number;
            return (
              <li key={pageNumber}>
                <a
                  className={`pagination-link cursor-pointer ${
                    pageNumber === currentPage ? 'is-current' : ''
                  }`}
                  aria-label={`Page ${pageNumber}`}
                  aria-current={pageNumber === currentPage ? 'page' : undefined}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </a>
              </li>
            );
          })}
          <li>
            <a
              className="pagination-next"
              onClick={() => handlePageChange(currentPage + 1)}
              style={{
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <>
      <p style={{ display: 'inline' }}>{values.length} elements found</p>

      <div className="my-3 mr-6">
        <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
          {renderPagination()}
          <div
            hidden={values.length <= 10}
            className="field"
            // TODO: put most of the inline css below in a scss module
            style={{
              position: 'relative',
              width: '30%',
              margin: '0 auto',
            }}
          >
            <div className="control has-icons-left">
              <input
                className="input "
                type="text"
                placeholder="Search by address or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="icon is-left">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>

            {/* Search Results Dropdown */}
            {searchQuery.trim() && (
              <div
                className="box"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  maxHeight: '300px',
                  overflowY: 'auto',
                  marginTop: '0.25rem',
                  display:
                    searchResults.length > 0 || isSearching ? 'block' : 'none',
                }}
              >
                {isSearching ? (
                  <p className="has-text-grey">Searching...</p>
                ) : searchResults.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li className="is-size-7">
                      {searchResults.length} results found
                    </li>
                    {searchResults.map((result) => (
                      <li
                        key={result.index}
                        className="p-2"
                        onClick={() => handleSearchResultClick(result.index)}
                        style={{
                          cursor: 'pointer',
                          borderBottom: '1px solid #e0e0e0',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f5f5f5';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <div>
                          <p className="has-text-weight-bold is-size-7">
                            {schema.name.replace('[]', '')}[{result.index}]
                          </p>
                          <code className="is-size-7">{result.address}</code>
                          {result.name && (
                            <p className="has-text-grey is-size-7 mt-1">
                              {result.name}{' '}
                              {result.symbol && `(${result.symbol})`}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="has-text-grey">No results found</p>
                )}
              </div>
            )}
          </div>
        </div>

        <table
          className="table my-3"
          style={{ backgroundColor: 'transparent' }}
        >
          <thead>
            <tr>
              <th>
                <abbr title="Data Key Index">Data Key index</abbr>
              </th>
              <th>
                <abbr title="Value">Value</abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item, relativeIndex) => {
              const absoluteIndex = startIndex + relativeIndex;
              const arrayIndexDataKey = encodeArrayKey(
                schema.key,
                absoluteIndex,
              );

              return (
                <tr key={absoluteIndex}>
                  <td>
                    <div className="my-3">
                      <p className="has-text-weight-bold">
                        {schema.name.replace('[]', '')}[{absoluteIndex}]
                      </p>
                      ➡{' '}
                      <code className="has-text-weight-bold">
                        {arrayIndexDataKey}
                      </code>
                    </div>
                  </td>
                  <td style={{ width: '50%' }}>
                    {item ? (
                      <AddressInfos address={item} userAddress={userAddress} />
                    ) : (
                      <p className="notification is-warning is-light">
                        ⚠️ No value found at index {absoluteIndex}
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {renderPagination()}
      </div>
    </>
  );
};

export default ArrayDataKeyTableWithPagination;
