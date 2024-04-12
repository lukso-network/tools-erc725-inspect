import React, { useEffect, useState } from 'react';
import ERC725, { encodeKeyName } from '@erc725/erc725.js';

import { getDataBatch } from '../../utils/web3';
import useWeb3 from '../../hooks/useWeb3';
import AddressInfos from '../AddressInfos';

interface Props {
  address: string;
  controllers: string[];
}

const ControllersList: React.FC<Props> = ({ address, controllers }) => {
  const [controllersPermissions, setControllersPermissions] = useState<{
    [key: string]: any;
  }>([]);

  const web3 = useWeb3();

  useEffect(() => {
    const getPermissions = async () => {
      try {
        if (address && web3 !== undefined) {
          const permissionsDataKeys = controllers.map((controller) => {
            return encodeKeyName(
              'AddressPermissions:Permissions:<address>',
              controller,
            );
          });

          const result = await getDataBatch(address, permissionsDataKeys, web3);

          const decodedPermissions = result.map((value) =>
            ERC725.decodePermissions(value),
          );
          setControllersPermissions(decodedPermissions);
        }
      } catch (error: any) {
        console.error(error);
      }
    };
    getPermissions();
  }, [address, web3]);

  return (
    <ul>
      <li style={{ listStyleType: 'none' }}>
        {controllers.length} controllers found
      </li>
      {controllers &&
        controllers.map(
          (item, index) =>
            item && (
              <li key={index} className="my-2">
                <div className="columns">
                  <div className="column">
                    <p>Controller Infos:</p>
                    <AddressInfos address={item.toString()} />
                  </div>
                  <div className="column">
                    <p>Permissions:</p>
                    {controllersPermissions[index] &&
                      Object.entries(controllersPermissions[index]).map(
                        ([permission, isSet]) =>
                          isSet && (
                            <span key={index} className="tag is-primary m-1">
                              {permission}
                            </span>
                          ),
                      )}
                  </div>
                </div>
              </li>
            ),
        )}
    </ul>
  );
};

export default ControllersList;
