/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React, { useState, useEffect } from 'react';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import { Erc725JsonSchemaAll } from '../../interfaces/erc725';
import AddressButtons from '../AddressButtons';
import { LUKSO_IPFS_BASE_URL } from '../../globals';
import Web3 from 'web3';

interface Props {
  provider: Web3;
  address: string;
  erc725JSONSchema: ERC725JSONSchema | Erc725JsonSchemaAll;
  value: string;
}

const ValueTypeDecoder: React.FC<Props> = ({
  provider,
  address,
  erc725JSONSchema,
  value,
}) => {
  const [decodedDataOneKey, setDecodedDataOneKey] = useState([]);
  const [fetchedData, setFetchedData] = useState({});
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const startDecoding = async () => {
      isLoading(true);

      if (address) {
        const schema: ERC725JSONSchema[] = [erc725JSONSchema];
        const erc725 = new ERC725(schema, address, provider.currentProvider);

        const decodedData = erc725.decodeData([
          {
            keyName: erc725JSONSchema.name,
            value: value,
          },
        ]);

        setDecodedDataOneKey(decodedData);

        const result = await erc725.getData(erc725JSONSchema.name);
        setFetchedData(result);
      }

      isLoading(false);
    };
    startDecoding();

    return () => {};
  }, [address]);

  if (loading) return <span>loading...</span>;
  try {
    if (typeof decodedDataOneKey[0].value === 'string') {
      if (erc725JSONSchema.valueContent === 'Address') {
        return <AddressView value={decodedDataOneKey[0].value} />;
      }

      return <code>{value}</code>;
    }

    if (
      Array.isArray(fetchedData.value) &&
      erc725JSONSchema.keyType === 'Array'
    ) {
      return (
        <ul>
          {fetchedData.value.map((item, index) => (
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
