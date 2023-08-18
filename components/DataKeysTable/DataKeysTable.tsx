/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Jean Cavallera <git@jeanc.abc>
 */
import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import { ERC725JSONSchema } from '@erc725/erc725.js';

import LSP1UniversalReceiverDelegateSchema from '@erc725/erc725.js/schemas/LSP1UniversalReceiverDelegate.json';

import LSP1DataKeys from '@erc725/erc725.js/schemas/LSP1UniversalReceiverDelegate.json';
import LSP3DataKeys from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import LSP4DataKeys from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import LSP5DataKeys from '@erc725/erc725.js/schemas/LSP5ReceivedAssets.json';
import LSP6DataKeys from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import LSP9DataKeys from '@erc725/erc725.js/schemas/LSP9Vault.json';

const erc725Schemas: ERC725JSONSchema[] = [
  ...(LSP1DataKeys as ERC725JSONSchema[]),
  ...(LSP3DataKeys as ERC725JSONSchema[]),
  ...(LSP4DataKeys as ERC725JSONSchema[]),
  ...(LSP5DataKeys as ERC725JSONSchema[]),
  ...(LSP6DataKeys as ERC725JSONSchema[]),
  ...(LSP9DataKeys as ERC725JSONSchema[]),
];

import AddressButtons from '../AddressButtons';
import ValueTypeDecoder from '../ValueTypeDecoder';

import { getDataBatch } from '../../utils/web3';

import useWeb3 from '../../hooks/useWeb3';

const erc735Schemas: ERC725JSONSchema[] = [];
LSP1UniversalReceiverDelegateSchema.forEach((schema) => {
  erc735Schemas.push(schema as ERC725JSONSchema);
});

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

  const isErc725YContract = isErc725Y;

  useEffect(() => {
    const fetch = async () => {
      if (!web3) return;
      if (!isErc725YContract) return;

      const dataResult: {
        key: string;
        value: string;
        schema: ERC725JSONSchema;
      }[] = [];

      try {
        // if latest 0.6.0 UP, use data keys from 0.6.0 schema
        if (isErc725Y) {
          const dataKeys = erc725Schemas.map((schema) => schema.key);

          const result = await getDataBatch(address, dataKeys, web3);

          result.map((_, i) => {
            dataResult.push({
              key: dataKeys[i],
              value: result[i],
              schema: erc735Schemas[i],
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

  return (
    <div className="columns is-multiline">
      {data.map((data) => {
        return (
          <div className="column is-full" key={data.key}>
            <div className="content py-5">
              <h4 className="title is-4">
                {data.schema.name}{' '}
                <Chip
                  label={data.schema.keyType}
                  color="success"
                  variant="outlined"
                  size="small"
                />
              </h4>
              <ul>
                <li>
                  Key: <code>{data.schema.key}</code>
                </li>
                <li>
                  Raw value{' '}
                  <span className="tag is-link is-light">
                    {data.schema.valueType}
                  </span>
                  : <code>{data.value}</code>
                </li>
                <li>
                  Decoded value{' '}
                  <span className="tag is-link is-light">
                    {data.schema.valueContent}
                  </span>
                  :{' '}
                  <ValueTypeDecoder
                    address={address}
                    erc725JSONSchema={data.schema}
                    value={data.value}
                  />
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
