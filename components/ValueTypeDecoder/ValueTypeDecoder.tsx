/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React, { useState, useEffect } from 'react';
import { encodeArrayKey, ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import AddressButtons from '@/components/AddressButtons';
import ControllersList from '@/components/ControllersList';
import { LUKSO_IPFS_BASE_URL } from '@/globals';

import useWeb3 from '@/hooks/useWeb3';

import { DecodeDataOutput } from '@erc725/erc725.js/build/main/src/types/decodeData';
import AddressInfos from '@/components/AddressInfos';

import { LSP4_TOKEN_TYPES } from '@lukso/lsp-smart-contracts';
import AssetsList from '../AssetsList';

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
  }, [address, web3, erc725JSONSchema, value]);

  try {
    if (decodedDataOneKey[0].name.startsWith('LSP1UniversalReceiverDelegate')) {
      const badgeContent = decodedDataOneKey[0].value;

      return (
        <>
          <code>{value}</code>
          <div className="mt-4"></div>
          <AddressInfos address={badgeContent} />
        </>
      );
    }
    if (
      !decodedDataOneKey[0].name.endsWith('[]') &&
      (typeof decodedDataOneKey[0].value === 'string' ||
        typeof decodedDataOneKey[0].value === 'number')
    ) {
      let badgeContent = decodedDataOneKey[0].value;

      if (erc725JSONSchema.valueContent === 'Address') {
        return (
          <>
            <code>{value}</code>
            <div className="mt-4"></div>
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

        if (
          erc725JSONSchema.name == 'LSP5ReceivedAssets[]' ||
          erc725JSONSchema.name == 'LSP12IssuedAssets[]'
        ) {
          // TODO: Create component <AssetList />
          return (
            <AssetsList
              decodedDataArray={decodedDataArray}
              erc725JSONSchema={erc725JSONSchema}
              userAddress={address}
            />
          );
        }

        return <p>decoding not yet implemented...</p>;
      }
    }

    if (
      erc725JSONSchema.valueContent === 'VerifiableURI' ||
      erc725JSONSchema.valueContent === 'JSONURL'
    ) {
      if (
        !decodedDataOneKey ||
        !decodedDataOneKey[0] ||
        !decodedDataOneKey[0].value
      ) {
        return <span className="help">No data found for this key.</span>;
      }

      return (
        <>
          <pre>{JSON.stringify(decodedDataOneKey[0].value, null, 4)}</pre>

          <span>
            URL:
            <code className="ml-2">{decodedDataOneKey[0].value.url}</code>
          </span>
          {decodedDataOneKey[0].value.url &&
            decodedDataOneKey[0].value.url.indexOf('ipfs://') !== -1 && (
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
