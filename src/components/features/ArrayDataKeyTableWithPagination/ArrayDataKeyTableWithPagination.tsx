import React, { useState } from 'react';
import { encodeArrayKey, ERC725JSONSchema } from '@erc725/erc725.js';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AddressInfos from '@/components/features/AddressInfos';

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
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(values.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageData = values.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
        className="pagination is-centered is-rounded"
        role="navigation"
        aria-label="pagination"
        style={{ justifyContent: 'center', gap: '1rem' }}
      >
        <ul
          className="pagination-list"
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
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
                  className={`pagination-link ${
                    pageNumber === currentPage ? 'is-current' : ''
                  }`}
                  aria-label={`Page ${pageNumber}`}
                  aria-current={pageNumber === currentPage ? 'page' : undefined}
                  onClick={() => handlePageChange(pageNumber)}
                  style={{ cursor: 'pointer' }}
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
                marginLeft: '0.5rem',
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
        {renderPagination()}
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
