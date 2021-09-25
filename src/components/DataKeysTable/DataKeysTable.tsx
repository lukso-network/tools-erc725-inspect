import React, { useEffect, useState } from 'react';

import useWeb3 from '../../hooks/useWeb3';
import { getAllDataKeys, getDataMultiple } from '../../utils/web3';
import { explainErc725YKey } from '../../utils/erc725y';
import AddressButtons from '../AddressButtons';

interface Props {
  address: string;
  isErc725Y: boolean;
}

const DataKeysTable: React.FC<Props> = ({ address, isErc725Y }) => {
  const [data, setData] = useState<{ key: string; value: string }[]>([]);

  const web3 = useWeb3();

  useEffect(() => {
    const fetch = async () => {
      if (!web3 || !isErc725Y) {
        return;
      }

      try {
        const fetchedDataKeys = await getAllDataKeys(address, web3);
        const fetchedDataValues = await getDataMultiple(
          address,
          fetchedDataKeys,
          web3,
        );

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
  }, [address, web3, isErc725Y]);

  if (!isErc725Y) {
    return null;
  }

  return (
    <div>
      {data.map((data) => {
        const keyInfo = explainErc725YKey(data.key);

        return (
          <div key={data.key} className="content py-5">
            <h4 className="title is-4">
              {keyInfo.name}{' '}
              <span className="tag is-link is-light">{keyInfo.keyType}</span>
            </h4>
            <ul>
              <li>
                Key: <code>{keyInfo.key}</code>
              </li>
              <li>
                Raw value:{' '}
                <code style={{ lineBreak: 'anywhere' }}>{data.value}</code>
              </li>
              <li>Value content: {keyInfo.valueContent}</li>
              <li>
                Decoded value{' '}
                <span className="tag is-link is-light">
                  {keyInfo.valueType}
                </span>
                :{' '}
                {keyInfo.valueType === 'address' ? (
                  <>
                    <code>{data.value}</code>
                    <AddressButtons address={data.value} />
                  </>
                ) : (
                  'TODO'
                )}
              </li>
              {keyInfo.keyType === 'AddressMappingWithGrouping' && (
                <li>
                  Mapped address: <code>0x{keyInfo.name.split(':').pop()}</code>{' '}
                  <AddressButtons
                    address={`0x${keyInfo.name.split(':').pop()}`}
                  />
                </li>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default DataKeysTable;
