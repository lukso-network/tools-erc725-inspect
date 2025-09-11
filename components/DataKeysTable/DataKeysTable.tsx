import React, { useEffect, useState } from 'react';
import { ERC725JSONSchema } from '@erc725/erc725.js';

import AddressButtons from '@/components/AddressButtons';
import ValueTypeDecoder from '@/components/ValueTypeDecoder';

import ProfileSchema from './ProfileSchema.json';
import LSP1NotificationsSchema from './LSP1NotificationsSchema.json';
import AssetSchema from './AssetSchema.json';
import LSP8Schema from './LSP8Schema.json';

import { SCHEMA_DOCS_LINKS, SchemaName } from './schemas';

import { getDataBatch } from '@/utils/web3';

import useWeb3 from '@/hooks/useWeb3';
import CodeEditor from '../CodeEditor';

interface Props {
  address: string;
  isErc725Y: boolean;
  isAsset: boolean;
  isLSP8: boolean;
}

const DataKeysTable: React.FC<Props> = ({
  address,
  isErc725Y,
  isAsset,
  isLSP8,
}) => {
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
          let schemaToLoad = [...ProfileSchema, ...LSP1NotificationsSchema];

          if (isAsset) {
            schemaToLoad = AssetSchema;

            if (isLSP8) {
              schemaToLoad = schemaToLoad.concat(LSP8Schema);
            }
          }
          const dataKeys = schemaToLoad.map((schema) => schema.key);

          const result = await getDataBatch(address, dataKeys, web3);
          result.map((_, i) => {
            dataResult.push({
              key: dataKeys[i],
              value: result[i],
              schema: schemaToLoad[i],
            });
          });
        }
      } catch (err) {
        console.error(err);
      }

      setData(dataResult);
    };

    fetch();
  }, [address, web3, isErc725Y, isAsset, isLSP8]);

  if (!web3) return <p>error: could not load provider</p>;

  if (!address) {
    return <p>⬆️ enter the address of your UP</p>;
  }

  return (
    <div className="columns is-multiline">
      {data.map((data) => {
        return (
          <div className="column is-full mt-4 dataKeyBox" key={data.key}>
            <div className="content">
              <div className="title is-4">
                {data.schema.name in SchemaName ? (
                  <a
                    href={SCHEMA_DOCS_LINKS[data.schema.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-link"
                  >
                    {data.schema.name} ↗️
                  </a>
                ) : (
                  data.schema.name
                )}

                <span className="tag is-small mx-2 is-info">
                  {data.schema.keyType}
                </span>
              </div>
              <details className="has-background-light p-2 is-clickable m-4 is-size-6 has-text-weight-light">
                <summary className="has-text-weight-semibold">
                  See LSP2 JSON Schema of <code>{data.schema.name}</code>
                </summary>
                <CodeEditor
                  sourceCode={JSON.stringify(data.schema, null, 4)}
                  readOnly={true}
                />
              </details>
              <ul>
                <li>
                  <strong>Key:</strong> <code>{data.schema.key}</code>
                </li>
                <li>
                  <strong>Raw value: </strong>
                  <span className="tag is-small mx-2 is-link is-light">
                    {data.schema.valueType}
                  </span>
                  <code>{data.value}</code>
                </li>
                <li>
                  <strong>Value Content: </strong>
                  <span className="tag is-small is-link is-light">
                    {data.schema.valueContent.toLowerCase()}
                  </span>
                </li>
                <li>
                  <strong>Decoded value: </strong>
                  <span className="my-3 mr-3">
                    <ValueTypeDecoder
                      address={address}
                      erc725JSONSchema={data.schema}
                      value={data.value}
                    />
                  </span>
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
