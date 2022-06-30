/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React, { useState, useEffect } from 'react';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import AddressButtons from '../AddressButtons';
import { LUKSO_IPFS_BASE_URL } from '../../globals';
import Web3 from 'web3';

import { DecodeDataOutput } from '@erc725/erc725.js/build/main/src/types/decodeData';

interface Props {
  provider: Web3;
  address: string;
  erc725JSONSchema: ERC725JSONSchema;
  value: string | string[];
}

const ValueTypeDecoder: React.FC<Props> = ({
  provider,
  address,
  erc725JSONSchema,
  value,
}) => {
  const [decodedDataOneKey, setDecodedDataOneKey] = useState<{
    [key: string]: any;
  }>([]);
  const [fetchedData, setFetchedData] = useState<DecodeDataOutput>({
    key: '',
    name: '',
    value: [],
  });

  useEffect(() => {
    const startDecoding = async () => {
      if (address) {
        const schema: ERC725JSONSchema[] = [erc725JSONSchema];
        const erc725 = new ERC725(schema, address, provider.currentProvider);

        const decodedData = erc725.decodeData([
          {
            keyName: erc725JSONSchema.name,
            value: value as string,
          },
        ]);

        setDecodedDataOneKey(decodedData);

        const result = await erc725.getData(erc725JSONSchema.name);
        console.log(result);
        setFetchedData(result);
      }
    };
    startDecoding();
  }, [address]);

  try {
    if (typeof decodedDataOneKey[0].value === 'string') {
      if (erc725JSONSchema.valueContent === 'Address') {
        return <AddressView value={decodedDataOneKey[0].value} />;
      }

      return <code>{value}</code>;
    }

    if (
      fetchedData !== undefined &&
      Array.isArray(fetchedData.value as any) &&
      erc725JSONSchema.keyType === 'Array'
    ) {
      return (
        <ul>
          {(fetchedData.value as string[]).map((item, index) => (
            <li key={index}>
              <code>{item}</code>
            </li>
          ))}
        </ul>
      );
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
    return <span>Can&apos;t decode this key</span>;
  }
};

const AddressView = ({ value }: { value: string }) => {
  return (
    <>
      <code>{value}</code>
      <AddressButtons address={value} />
    </>
  );
};

export default ValueTypeDecoder;
