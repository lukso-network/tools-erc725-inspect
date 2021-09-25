import React, { useEffect, useState } from 'react';

import useWeb3 from '../../hooks/useWeb3';
import { getAllDataKeys, getDataMultiple } from '../../utils/web3';
import { explainErc725YKey } from '../../utils/erc725y';

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
          <div key={data.key} className="py-5">
            <h4 className="title is-4">{keyInfo.name}</h4>
            <ul>
              <li>
                <span className="tag is-link is-light">{keyInfo.keyType}</span>
              </li>
              <li>
                <code>{keyInfo.key}</code>
              </li>
              <li>{keyInfo.valueType}</li>
              <li>
                Raw value: <code>{data.value}</code>{' '}
                {keyInfo.valueType === 'address' && (
                  <div className="buttons are-small">
                    <a
                      className="button is-primary is-light"
                      target="_blank"
                      rel="noreferrer"
                      href={`https://universalprofile.cloud/${data.value}`}
                    >
                      View UP as Profile
                    </a>
                    <a
                      className="button is-info is-light"
                      target="_blank"
                      rel="noreferrer"
                      href={`https://universalprofile.cloud/asset/${data.value}`}
                    >
                      View UP as Asset
                    </a>
                    <a
                      className="button is-link is-light"
                      target="_blank"
                      rel="noreferrer"
                      href={`https://blockscout.com/lukso/l14/address/${data.value}`}
                    >
                      Blockscout
                    </a>
                  </div>
                )}
              </li>
              <li>Decoded value: TODO</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default DataKeysTable;
