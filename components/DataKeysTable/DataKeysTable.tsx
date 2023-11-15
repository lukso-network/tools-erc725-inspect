/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Jean Cavallera <git@jeanc.abc>
 */
import React, { useEffect, useState } from 'react';
import { ERC725JSONSchema } from '@erc725/erc725.js';

import AddressButtons from '../AddressButtons';
import ValueTypeDecoder from '../ValueTypeDecoder';
import styles from './DataKeysTable.module.scss';

import Schema from './Schema.json';
import SchemaLinks from './SchemaLinks.json';

import { getDataBatch } from '../../utils/web3';

import useWeb3 from '../../hooks/useWeb3';

interface Props {
  address: string;
  isErc725Y: boolean;
}

const DataKeysTable: React.FC<Props> = ({ address, isErc725Y }) => {
  const [data, setData] = useState<
    {
      key: string;
      value: string | string[];
      schema: ERC725JSONSchema;
    }[]
  >([]);

  const web3 = useWeb3();

  useEffect(() => {
    const fetch = async () => {
      if (!web3) return;

      if (!isErc725Y) return;

      const dataResult: {
        key: string;
        value: string;
        schema: ERC725JSONSchema;
      }[] = [];

      try {
        if (isErc725Y) {
          const dataKeys = Schema.map((schema) => schema.key);

          const result = await getDataBatch(address, dataKeys, web3);

          result.map((_, i) => {
            dataResult.push({
              key: dataKeys[i],
              value: result[i],
              schema: Schema[i] as ERC725JSONSchema,
            });
          });
        }
      } catch (err) {
        console.error(err);
      }

      setData(dataResult);
    };

    fetch();
  }, [address, web3, isErc725Y]);

  if (!web3) return <p>error: could not load provider</p>;

  if (!address) {
    return <p>⬆️ enter the address of your UP</p>;
  }

  const findLinkForSchemaName = (schemaName) => {
    const linkObj = SchemaLinks.find(
      (linkItem) => linkItem.name === schemaName,
    );
    return linkObj ? linkObj.link : '#';
  };

  return (
    <div className="columns is-multiline">
      {data.map((data) => {
        const schemaLink = findLinkForSchemaName(data.schema.name);
        return (
          <div className="column is-full mt-4 dataKeyBox" key={data.key}>
            <div className="content py-5">
              <div className="title is-4 home-link">
                <a href={schemaLink} target="_blank" rel="noopener noreferrer">
                  {data.schema.name} ↗️
                </a>
                <span className="tag is-small mb-2 mx-2 is-info">
                  {data.schema.keyType}
                </span>
              </div>
              <ul>
                <li className="mt-2">
                  <strong>Key:</strong> <code>{data.schema.key}</code>
                </li>
                <li className="mt-4 mt-4">
                  <strong>Raw value: </strong>
                  <span className="tag is-small mx-2 is-link is-light">
                    {data.schema.valueType}
                  </span>
                  <code>{data.value}</code>
                </li>
                <li className="mt-4">
                  <strong>Value Content: </strong>
                  <span className="tag is-small mb-2 mr-2 is-link is-light">
                    {data.schema.valueContent.toLowerCase()}
                  </span>
                </li>
                <li className="mt-2">
                  <strong>Decoded value: </strong>
                  <div className="mt-3 mb-3">
                    <ValueTypeDecoder
                      address={address}
                      erc725JSONSchema={data.schema}
                      value={data.value}
                    />
                  </div>
                </li>
                {data.schema.keyType === 'MappingWithGrouping' && (
                  <li>
                    Mapped address:{' '}
                    <code>0x{data.schema.name.split(':').pop()}</code>{' '}
                    <AddressButtons
                      address={`0x${data.schema.name.split(':').pop()}`}
                    />
                  </li>
                )}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DataKeysTable;
