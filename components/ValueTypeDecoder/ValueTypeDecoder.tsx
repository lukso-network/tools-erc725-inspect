/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React, { useState, useEffect, useContext } from 'react';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import AddressButtons from '../AddressButtons';
import { LUKSO_IPFS_BASE_URL } from '../../globals';

import { NetworkContext } from '../../contexts/NetworksContext';

import { DecodeDataOutput } from '@erc725/erc725.js/build/main/src/types/decodeData';

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

  const { web3 } = useContext(NetworkContext);

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
    if (typeof decodedDataOneKey[0].value === 'string') {
      if (erc725JSONSchema.valueContent === 'Address') {
        return (
          <>
            <code>{value}</code>
            <AddressButtons address={decodedDataOneKey[0].value} />
          </>
        );
      }

      return <code>{value}</code>;
    }

    if (
      decodedDataArray !== undefined &&
      Array.isArray(decodedDataArray.value) &&
      erc725JSONSchema.keyType === 'Array'
    ) {
      if (decodedDataArray.value.length === 0) {
        return <span className="help">No array entries found.</span>;
      } else {
        return (
          <ul>
            {decodedDataArray.value.map((item, index) => (
              <li key={index}>
                <code>{item}</code>
              </li>
            ))}
          </ul>
        );
      }
    }

    if (erc725JSONSchema.valueContent === 'JSONURL') {
      return (
        <>
          <pre>{JSON.stringify(decodedDataOneKey[0].value, null, 4)}</pre>
          <div>
            <span>URL: {decodedDataOneKey[0].value.url}</span> -{' '}
            {decodedDataOneKey[0].value.url.indexOf('ipfs://') !== -1 && (
              <>
                [
                <a
                  className="has-text-link"
                  target="_blank"
                  rel="noreferrer"
                  href={`${LUKSO_IPFS_BASE_URL}/${decodedDataOneKey[0].value.url.replace(
                    'ipfs://',
                    '',
                  )}`}
                >
                  LUKSO IPFS
                </a>
                ]
              </>
            )}
          </div>
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
