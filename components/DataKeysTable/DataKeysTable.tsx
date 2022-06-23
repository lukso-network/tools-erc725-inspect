/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import ERC725, { ERC725JSONSchema } from '@erc725/erc725.js';

import useWeb3 from '../../hooks/useWeb3';
import { getAllDataKeys, getData, getDataMultiple } from '../../utils/web3';
import AddressButtons from '../AddressButtons';
import ValueTypeDecoder from '../ValueTypeDecoder';

import { Erc725JsonSchemaAll } from '../../interfaces/erc725';

import LegacySchema from './legacySchemas.json';

const erc725 = new ERC725([]);

interface Props {
  address: string;
  isErc725Y: boolean;
  isErc725Y_v2: boolean;
  isErc725YLegacy: boolean;
}

const DataKeysTable: React.FC<Props> = ({
  address,
  isErc725Y,
  isErc725Y_v2,
  isErc725YLegacy,
}) => {
  const [data, setData] = useState<
    {
      key: string;
      value: string;
      schema: ERC725JSONSchema | Erc725JsonSchemaAll;
    }[]
  >([]);

  const web3 = useWeb3();

  useEffect(() => {
    const fetch = async () => {
      if (!web3) {
        return;
      }

      if (!isErc725Y && !isErc725Y_v2 && !isErc725YLegacy) {
        return;
      }

      try {
        const fetchedDataKeys = await getAllDataKeys(address, web3);

        let fetchedDataValues: string[] = [];

        if (isErc725Y) {
          fetchedDataValues = await getData(address, fetchedDataKeys, web3);
        }

        if (isErc725Y_v2) {
        }

        if (isErc725YLegacy) {
          fetchedDataValues = await getDataMultiple(
            address,
            fetchedDataKeys,
            web3,
          );
        }

        console.log(fetchedDataKeys);

        const schema = erc725.getSchema(
          fetchedDataKeys,
          LegacySchema as ERC725JSONSchema[],
        );

        console.log('schema', schema);

        setData(
          fetchedDataKeys.map((fetchedDataKey, i) => {
            return {
              key: fetchedDataKey,
              value: fetchedDataValues[i],
              schema: schema[fetchedDataKey] || {
                name: 'UNKNOWN',
                key: fetchedDataKey,
                keyType: 'UNKNOWN',
                valueContent: 'UNKNOWN',
                valueType: 'UNKNOWN',
              },
            };
          }),
        );
      } catch (err) {
        setData([]);
      }
    };

    fetch();
  }, [address, web3, isErc725Y, isErc725YLegacy]);

  if (!isErc725Y && !isErc725YLegacy) {
    return null;
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
                    erc725JSONSchema={data.schema}
                    value={data.value}
                  />
                </li>
                {data.schema.keyType === 'AddressMappingWithGrouping' && (
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
