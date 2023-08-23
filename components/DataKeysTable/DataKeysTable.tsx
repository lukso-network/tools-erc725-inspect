/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Jean Cavallera <git@jeanc.abc>
 */
import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import { ERC725JSONSchema } from '@erc725/erc725.js';

import AddressButtons from '../AddressButtons';
import ValueTypeDecoder from '../ValueTypeDecoder';

import Schema from './Schema.json';

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
