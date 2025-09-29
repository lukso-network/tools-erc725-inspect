import React, { useEffect, useState } from 'react';
import ERC725, { encodeArrayKey, encodeKeyName } from '@erc725/erc725.js';

import { getData, getDataBatch } from '@/utils/web3';
import useWeb3 from '@/hooks/useWeb3';
import AddressInfos from '@/components/AddressInfos';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

interface Props {
  dataKey: string;
  address: string;
  controllers: string[];
}

const ControllersList: React.FC<Props> = ({ address, controllers }) => {
  const [controllersPermissions, setControllersPermissions] = useState<{
    [key: number]: {
      dataKey: string;
      bitArray: string;
      permissions: { [key: string]: any };
    } | null;
  }>({
    0: {
      dataKey: encodeKeyName(
        'AddressPermissions:Permissions:<address>',
        '0xcafecafecafecafecafecafecafecafecafecafe',
      ),
      bitArray:
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      permissions: [],
    },
  });

  const web3 = useWeb3();

  useEffect(() => {
    const getPermissions = async () => {
      try {
        if (address && web3 !== undefined) {
          controllers.map(async (controller, index) => {
            const currentState = controllersPermissions;

            if (controller === null) {
              currentState[index] = null;
              setControllersPermissions(currentState);
            } else {
              const controllerPermissionDataKey = encodeKeyName(
                'AddressPermissions:Permissions:<address>',
                controller,
              );
              const controllerPermissionDataValue = await getData(
                address,
                controllerPermissionDataKey,
                web3,
              );

              currentState[index] = {
                dataKey: controllerPermissionDataKey,
                bitArray:
                  controllerPermissionDataValue ||
                  '0x0000000000000000000000000000000000000000000000000000000000000000',
                permissions: controllerPermissionDataValue
                  ? ERC725.decodePermissions(controllerPermissionDataValue)
                  : [],
              };
              setControllersPermissions(currentState);
            }
          });
        }
      } catch (error: any) {
        console.error(error);
      }
    };
    getPermissions();
  }, [address, web3]);

  return (
    <>
      <p style={{ display: 'inline' }}>
        {controllers.length} controllers found
      </p>

      {controllers.find((controller) => controller == null) && (
        <div className="notification is-warning is-light mt-3">
          <p>
            ⚠️ It looks like at some indexes inside your{' '}
            <code>AddressPermissions[]</code> array, some values are set to{' '}
            <code>null</code> /<code>0x</code>.
          </p>
          <p>
            This could be due to the fact that some controller addresses at
            specific indexes got removed, but the value for the array length
            data key <br />
            <code>
              AddressPermissions[] ➡{' '}
              {ERC725YDataKeys.LSP6['AddressPermissions[]'].length}
            </code>{' '}
            never got updated.
          </p>
          <strong>
            Consider updating the array length to fix your array of controllers.
          </strong>
        </div>
      )}

      {controllers && (
        <table className="table" style={{ backgroundColor: 'transparent' }}>
          <thead>
            <tr>
              <th>
                <abbr title="Position">Data Key index</abbr>
              </th>
              <th>
                <abbr title="Played">Value</abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            {controllers.map((controller, index) => {
              return (
                <tr key={controller}>
                  <td>
                    <div className="mb-6">
                      <p className="has-text-weight-bold">
                        AddressPermissions[{index}]
                      </p>
                      ➡{' '}
                      <code className="has-text-weight-bold">
                        {/* TODO: add this data key in the state as `arrayIndexDataKey` */}
                        {encodeArrayKey(
                          ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
                          index,
                        )}
                      </code>
                    </div>
                    <div className="mb-6">
                      <p className="has-text-weight-bold">
                        AddressPermissions:Permissions:
                        <code className="is-size-7">{controller}</code>
                      </p>
                      ➡{' '}
                      {controller ? (
                        <code className="has-text-weight-bold">
                          {/* TODO: rename to `permissionDataKey` */}
                          {controllersPermissions[index]?.dataKey}
                        </code>
                      ) : (
                        <i>
                          Cannot encode the data key if controller address is
                          unknown
                        </i>
                      )}
                    </div>
                  </td>
                  <td style={{ width: '50%' }}>
                    <div className="mb-3">
                      <p>Controller Infos:</p>
                      {controller ? (
                        // TODO: remove `toString()`
                        <AddressInfos address={controller.toString()} />
                      ) : (
                        <p>No controller found at index {index}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      {<p className="text-bold">Permissions:</p>}
                      {controllersPermissions[index] != null ? (
                        <p>
                          <code className="has-text-primary">
                            {controllersPermissions[index] &&
                              controllersPermissions[index].bitArray}
                          </code>
                          {controllersPermissions[index] &&
                            Object.entries(
                              controllersPermissions[index].permissions,
                            ).map(
                              ([permission, isSet]) =>
                                isSet &&
                                permission !== '0x' && (
                                  <span
                                    key={permission}
                                    className="tag is-primary m-1"
                                  >
                                    {permission}
                                  </span>
                                ),
                            )}
                        </p>
                      ) : (
                        <p>
                          Cannot fetch permissions as controller is unknown at
                          index {index}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ControllersList;
