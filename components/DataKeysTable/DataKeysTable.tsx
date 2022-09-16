/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';

import useWeb3 from '../../hooks/useWeb3';
import { getAllDataKeys, getData, getDataMultiple } from '../../utils/web3';
import { explainErc725YKey } from '../../utils/erc725y';
import AddressButtons from '../AddressButtons';
import ValueTypeDecoder from '../ValueTypeDecoder';

interface Props {
  address: string;
  isErc725Y: boolean;
  isErc725YLegacy: boolean;
}

const DataKeysTable: React.FC<Props> = ({
  address,
  isErc725Y,
  isErc725YLegacy,
}) => {
  const [data, setData] = useState<{ key: string; value: string }[]>([]);

  const web3 = useWeb3();

  useEffect(() => {
    const fetch = async () => {
      if (!web3) {
        return;
      }

      if (!isErc725Y && !isErc725YLegacy) {
        return;
      }

      try {
        const fetchedDataKeys = await getAllDataKeys(address, web3);

        let fetchedDataValues: string[] = [];

        if (isErc725Y) {
          fetchedDataValues = await getData(address, fetchedDataKeys, web3);
        } else {
          fetchedDataValues = await getDataMultiple(
            address,
            fetchedDataKeys,
            web3,
          );
        }

        setData(
          fetchedDataKeys.map((fetchedDataKey, i) => {
            return {
              key: fetchedDataKey,
              value: fetchedDataValues[i],
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
        const keyInfo = explainErc725YKey(data.key);

        return (
          <div className="column is-full" key={data.key}>
            <div className="content py-5">
              <h4 className="title is-4">
                {keyInfo.name}{' '}
                <Chip
                  label={keyInfo.keyType}
                  color="success"
                  variant="outlined"
                  size="small"
                />
              </h4>
              <ul>
                <li>
                  Key: <code>{keyInfo.key}</code>
                </li>
                <li>
                  Raw value{' '}
                  <span className="tag is-link is-light">
                    {keyInfo.valueType}
                  </span>
                  : <code>{data.value}</code>
                </li>
                <li>
                  Decoded value{' '}
                  <span className="tag is-link is-light">
                    {keyInfo.valueContent}
                  </span>
                  :{' '}
                  <ValueTypeDecoder
                    erc725JSONSchema={keyInfo}
                    value={data.value}
                  />
                </li>
                {keyInfo.keyType === 'AddressMappingWithGrouping' && (
                  <li>
                    Mapped address:{' '}
                    <code>0x{keyInfo.name.split(':').pop()}</code>{' '}
                    <AddressButtons
                      address={`0x${keyInfo.name.split(':').pop()}`}
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
