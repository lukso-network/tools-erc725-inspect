/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Jean Cavallera <git@jeanc.abc>
 */
import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import { ERC725JSONSchema } from '@erc725/erc725.js';

import useWeb3 from '../../hooks/useWeb3';
import AddressButtons from '../AddressButtons';
import ValueTypeDecoder from '../ValueTypeDecoder';

// for 0.6.0 (to be removed and fetch directly from erc725.js)
import Schema_v06 from './Schema_v06.json';

// for 0.5.0
import Schema_v05 from './Schema_v05.json';
import { getData } from '../../utils/web3';

// legacy
import LegacySchema from './legacySchemas.json';
import { getAllDataKeys } from '../../utils/web3';

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
      value: string | string[];
      schema: ERC725JSONSchema;
    }[]
  >([]);

  const web3 = useWeb3();

  const isErc725YContract = isErc725Y || isErc725Y_v2 || isErc725YLegacy;

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
          const dataKeys = Schema_v06.map((schema) => schema.key);

          const result = await getData(address, dataKeys, web3);

          result.map((_, i) => {
            dataResult.push({
              key: dataKeys[i],
              value: result[i],
              schema: Schema_v06[i] as ERC725JSONSchema,
            });
          });
        }

        // if 0.5.0 UP, use data keys from v0.5.0 schema
        if (isErc725Y_v2) {
          const dataKeys = Schema_v05.map((schema) => schema.key);

          const result = await getData(address, dataKeys, web3);

          result.map((_, i) => {
            dataResult.push({
              key: dataKeys[i],
              value: result[i],
              schema: Schema_v05[i] as ERC725JSONSchema,
            });
          });
        }

        // for very old UPs, try legacy contract calls
        if (isErc725YLegacy) {
          const dataKeys = LegacySchema.map((schema) => schema.key);

          const result = await getAllDataKeys(address, web3);

          dataResult.push({
            key: dataKeys[0],
            value: result[0],
            schema: LegacySchema[0] as ERC725JSONSchema,
          });
        }
      } catch (err) {
        console.error(err);
      }

      setData(dataResult);
    };

    fetch();
  }, [address, web3, isErc725Y, isErc725Y_v2, isErc725YLegacy]);

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
