/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import ERC725, { ERC725JSONSchema } from '@erc725/erc725.js';
import { URLDataWithHash } from '@erc725/erc725.js/build/main/src/types';

import useWeb3 from '../../hooks/useWeb3';
import AddressButtons from '../AddressButtons';
import ValueTypeDecoder from '../ValueTypeDecoder';

import { Erc725JsonSchemaAll } from '../../interfaces/erc725';

import Schema_v06 from './Schema_v06.json';

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
      value: string | string[] | URLDataWithHash;
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

      const SCHEMA = Schema_v06 as ERC725JSONSchema[];

      let erc725: ERC725;
      let dataResult: {
        key: string;
        value: string | string[] | URLDataWithHash;
        schema: ERC725JSONSchema | Erc725JsonSchemaAll;
      }[] = [];

      try {
        if (isErc725Y) {
          // 1.1 create instance of erc725.js
          erc725 = new ERC725(SCHEMA, address, web3.currentProvider);

          // 1.2 retrieve the data + console.log
          const result = await erc725.getData();
          console.log('result: ', result);

          // 1.3 display in UI
          result.map((data, i) => {
            if (data.value)
              dataResult.push({
                key: data.key,
                value: data.value,
                schema: SCHEMA[i] as ERC725JSONSchema,
              });
          });
        }
      } catch (err) {
        console.error(err);
      }

      setData(dataResult);
    };

    fetch();
  }, [address, web3, isErc725Y, isErc725Y_v2, isErc725YLegacy]);

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
