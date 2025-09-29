import React, { useEffect, useState } from 'react';
import ERC725, { encodeArrayKey, encodeKeyName } from '@erc725/erc725.js';

import { getData, getDataBatch } from '@/utils/web3';
import useWeb3 from '@/hooks/useWeb3';
import AddressInfos from '@/components/AddressInfos';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

interface Props {
  address: string; // UP address
  permissionDataKey: string;
  controllers: string[];
}

const ControllersList: React.FC<Props> = ({ address, controllers }) => {
  const [controllersPermissions, setControllersPermissions] = useState<{
    [key: number]: {
      controller: string | null;
      arrayIndexDataKey: string;
      permissionDataKey: string | null;
      bitArray: string | null;
      permissions: { [key: string]: any };
    };
  }>({
    // TODO: do we need this initial empty state initially?
    0: {
      controller: null,
      arrayIndexDataKey: encodeArrayKey(
        ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
        0,
      ),
      permissionDataKey: encodeKeyName(
        'AddressPermissions:Permissions:<address>',
        '0xcafecafecafecafecafecafecafecafecafecafe',
      ),
      bitArray:
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      permissions: {},
    },
  });

  const web3 = useWeb3();

  useEffect(() => {
    const getPermissions = async () => {
      try {
        if (address && web3 !== undefined) {
          controllers.map(async (controller, index) => {
            const currentState = controllersPermissions;

            let permissionDataKey: string | null = null;
            let bitArray: string | null = null;

            if (controller != null) {
              permissionDataKey = encodeKeyName(
                'AddressPermissions:Permissions:<address>',
                controller,
              );

              // permission values are fetched below all at once via `getDataBatch` for optimisation
              // to avoid multiple RPC calls per controller
              bitArray = null;
            }

            currentState[index] = {
              arrayIndexDataKey: encodeArrayKey(
                ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
                index,
              ),
              controller,
              permissionDataKey,
              bitArray,
              permissions: {},
            };

            setControllersPermissions(currentState);
          });

          const permissionsDataKeysToFetch = Object.values(
            controllersPermissions,
          ).map(({ permissionDataKey }) => {
            // for unknown controllers (null), we cannot encode the data key, so we use address(0) as placeholder
            return (
              permissionDataKey ||
              encodeKeyName(
                'AddressPermissions:Permissions:<address>',
                '0x0000000000000000000000000000000000000000',
              )
            );
          });

          const permissionsDataValues = await getDataBatch(
            address,
            permissionsDataKeysToFetch,
            web3,
          );

          Object.values(
            controllersPermissions,
          ).forEach(({ controller }, index) => {
            const currentState = controllersPermissions;

            currentState[index].bitArray =
              controller && permissionsDataValues[index];

            currentState[index].permissions = controller
              ? (ERC725.decodePermissions(permissionsDataValues[index]) as {
                [key: string]: any;
              })
              : {};

            setControllersPermissions({ ...currentState });
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

      {/* TODO: This is not displayed. Fix it + improve the display as a better message */}
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
            {Object.values(controllersPermissions).map(
              (controllerInfos, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="mb-6">
                        <p className="has-text-weight-bold">
                          AddressPermissions[{index}]
                        </p>
                        ➡{' '}
                        <code className="has-text-weight-bold">
                          {controllerInfos.arrayIndexDataKey}
                        </code>
                      </div>
                      <div className="mb-6">
                        <p className="has-text-weight-bold">
                          AddressPermissions:Permissions:
                          <code className="is-size-7">
                            {controllerInfos.controller
                              ? controllerInfos.controller
                              : 'unknown'}
                          </code>
                        </p>
                        ➡{' '}
                        {controllerInfos.controller ? (
                          <code className="has-text-weight-bold">
                            {controllerInfos.permissionDataKey}
                          </code>
                        ) : (
                          <i>
                            Cannot encode data key: controller address unknown
                          </i>
                        )}
                      </div>
                    </td>
                    <td style={{ width: '50%' }}>
                      {/* TODO: Make this its own component (the two below) */}
                      <div className="mb-3">
                        <p>Controller Infos:</p>
                        {controllerInfos.controller ? (
                          <AddressInfos address={controllerInfos.controller} />
                        ) : (
                          <p>No controller found at index {index}</p>
                        )}
                      </div>

                      <div className="mb-3">
                        {<p className="text-bold">Permissions:</p>}
                        {controllerInfos.controller ? (
                          <p>
                            <code className="has-text-primary">
                              {controllerInfos.bitArray}
                            </code>
                            {Object.entries(controllerInfos.permissions).map(
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
                            Cannot fetch permissions: controller unknown at
                            index {index}
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ControllersList;
