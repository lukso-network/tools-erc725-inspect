/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React, { useState, useEffect } from 'react';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import AddressButtons from '../AddressButtons';
import ControllersList from '../ControllersList';
import { LUKSO_IPFS_BASE_URL } from '../../globals';

import useWeb3 from '../../hooks/useWeb3';

import { DecodeDataOutput } from '@erc725/erc725.js/build/main/src/types/decodeData';
import AddressInfos from '../AddressInfos';

import { LSP4_TOKEN_TYPES } from '@lukso/lsp-smart-contracts';

interface Props {
  address: string;
  erc725JSONSchema: ERC725JSONSchema;
  value: string | string[];
}

const ValueTypeDecoder: React.FC<Props> = ({
  address,
  erc725JSONSchema,
  value,
}) => {
  // state to decoded the value retrieved from a data key
  const [decodedDataOneKey, setDecodedDataOneKey] = useState<{
    [key: string]: any;
  }>([]);
  // state used to retrieve entries for an Array data key
  const [decodedDataArray, setDecodedDataArray] = useState<DecodeDataOutput>({
    key: '',
    name: '',
    value: [],
  });

  const web3 = useWeb3();

  useEffect(() => {
    const startDecoding = async () => {
      try {
        if (address && web3 !== undefined) {
          const schema: ERC725JSONSchema[] = [erc725JSONSchema];
          const erc725 = new ERC725(schema, address, web3.currentProvider);

          const decodedData = erc725.decodeData([
            {
              keyName: erc725JSONSchema.name,
              value: value as string,
            },
          ]);
          setDecodedDataOneKey(decodedData);

          if (erc725JSONSchema.keyType === 'Array') {
            const result = await erc725.getData(erc725JSONSchema.name);
            setDecodedDataArray(result);
          }
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    startDecoding();
  }, [address, web3]);

  try {
    if (
      typeof decodedDataOneKey[0].value === 'string' ||
      typeof decodedDataOneKey[0].value === 'number'
    ) {
      let badgeContent = decodedDataOneKey[0].value;

      if (erc725JSONSchema.valueContent === 'Address') {
        return (
          <>
            <code>{value}</code>
            <div className="mt-4"></div>
            <AddressButtons address={badgeContent} />
          </>
        );
      }

      if (erc725JSONSchema.name == 'LSP4TokenType') {
        const tokenTypeName = Object.keys(LSP4_TOKEN_TYPES).filter((key) =>
          LSP4_TOKEN_TYPES[key].toString().includes(badgeContent),
        );
        badgeContent += ` - ${tokenTypeName}`;
      }

      return (
        <>
          <span className="tag is-medium is-info is-light">{badgeContent}</span>
        </>
      );
    }

    if (
      decodedDataArray !== undefined &&
      Array.isArray(decodedDataArray.value) &&
      erc725JSONSchema.keyType === 'Array'
    ) {
      if (decodedDataArray.value.length === 0) {
        return <span className="help">No array entries found.</span>;
      } else {
        if (erc725JSONSchema.name == 'AddressPermissions[]') {
          return (
            <ControllersList
              address={address}
              controllers={decodedDataArray.value as string[]}
            />
          );
        }

        return (
          <ul>
            <li style={{ listStyleType: 'none' }}>
              {decodedDataArray.value.length} elements in Array
            </li>
            {decodedDataArray.value.map(
              (item, index) =>
                item && (
                  <li key={index}>
                    <AddressInfos
                      assetAddress={item.toString()}
                      userAddress={address}
                    />
                  </li>
                ),
            )}
          </ul>
        );
      }
    }

    if (
      erc725JSONSchema.valueContent === 'VerifiableURI' ||
      erc725JSONSchema.valueContent === 'JSONURL'
    ) {
      return (
        <>
          <pre>{JSON.stringify(decodedDataOneKey[0].value, null, 4)}</pre>

          <span>
            URL:
            <code className="ml-2">{decodedDataOneKey[0].value.url}</code>
          </span>
          {decodedDataOneKey[0].value.url.indexOf('ipfs://') !== -1 && (
            <>
              <a
                className="has-text-link button is-small is-light is-info"
                target="_blank"
                rel="noreferrer"
                href={`${LUKSO_IPFS_BASE_URL}/${decodedDataOneKey[0].value.url.replace(
                  'ipfs://',
                  '',
                )}`}
              >
                Retrieve IPFS File ↗️
              </a>
            </>
          )}
        </>
      );
    }

    // display in a code block as a fallback
    return (
      <div>
        <pre>{JSON.stringify(decodedDataOneKey[0], null, 4)}</pre>
      </div>
    );
  } catch (err) {
    console.warn('Could not decode the key: ', err);
    return <span>Can&apos;t decode this key</span>;
  }
};

export default ValueTypeDecoder;
