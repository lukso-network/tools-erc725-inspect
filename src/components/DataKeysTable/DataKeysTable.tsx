/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React, { useEffect, useState } from 'react';

import useWeb3 from '../../hooks/useWeb3';
import { getAllDataKeys, getDataMultiple } from '../../utils/web3';
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
      if (!web3 || !isErc725YLegacy) {
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
  }, [address, web3, isErc725Y, isErc725YLegacy]);

  if (!isErc725Y && !isErc725YLegacy) {
    return null;
  }

  if (isErc725Y) {
    return <div>New ERC725Y contracts are not supported yet.</div>;
  }

  return (
    <div className="columns is-multiline">
      {data.map((data) => {
        const keyInfo = explainErc725YKey(data.key);

        return (
          <div className="column is-half">
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
