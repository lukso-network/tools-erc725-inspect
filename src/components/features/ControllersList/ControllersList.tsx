import React, { useContext, useEffect, useState } from 'react';
import ERC725, { encodeArrayKey, encodeKeyName } from '@erc725/erc725.js';
import type { Hex } from 'viem';

import { getDataBatch } from '@/utils/erc725y';
import AddressInfos from '@/components/features/AddressInfos';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import { NetworkContext } from '@/contexts/NetworksContext';

interface PermissionDataKeyDisplayProps {
  permissionDataKey: string;
}

const PermissionDataKeyDisplay: React.FC<PermissionDataKeyDisplayProps> = ({
  permissionDataKey,
}) => {
  // Extract the three parts of the permission data key
  const addressPermissionsPrefix = permissionDataKey.slice(0, 22); // First 10 bytes: AddressPermissions:Permissions prefix
  const separator = permissionDataKey.slice(22, 26); // Next 2 bytes: 0000 separator
  const controllerAddress = permissionDataKey.slice(26); // Last 20 bytes: controller address

  return (
    <code className="has-text-weight-bold">
      <span title="AddressPermissions:Permissions prefix (10 bytes)">
        {addressPermissionsPrefix}
      </span>
      <span
        className="has-text-grey"
        title="Separator (2 bytes - should be 0000)"
      >
        {separator}
      </span>
      <span title="Controller address (20 bytes)">{controllerAddress}</span>
    </code>
  );
};

interface Props {
  address: string; // UP address
  controllers: (string | null)[];
}

const ControllersList: React.FC<Props> = ({ address, controllers }) => {
  const { network } = useContext(NetworkContext);

  const [isLoading, setIsLoading] = useState(false);

  const [controllersPermissions, setControllersPermissions] = useState<{
    [key: number]: {
      controller: string | null;
      arrayIndexDataKey: string;
      permissionDataKey: string | null;
      bitArray: string | null;
      permissions: { [key: string]: boolean };
    };
  }>({});

  useEffect(() => {
    const getPermissions = async () => {
      setIsLoading(true);

      try {
        if (address && network !== undefined) {
          controllers.map(async (controller, index) => {
            const currentState = controllersPermissions;

            let permissionDataKey: string | null = null;
            let bitArray: string | null = null;

            if (controller != null) {
              permissionDataKey = encodeKeyName(
                'AddressPermissions:Permissions:<address>',
                controller,
              );

              // permission values are fetched below all at once via `getDataBatch`
              // for optimisation to avoid multiple RPC calls per controller
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
            permissionsDataKeysToFetch as `0x${string}`[],
            network,
          );

          Object.values(controllersPermissions).forEach(
            ({ controller }, index) => {
              const currentState = controllersPermissions;

              currentState[index].bitArray =
                controller && permissionsDataValues[index];

              currentState[index].permissions = controller
                ? (ERC725.decodePermissions(
                    permissionsDataValues[index] as Hex,
                  ) as {
                    [key: string]: any;
                  })
                : {};

              setControllersPermissions({ ...currentState });
            },
          );
        }
      } catch (error: any) {
        console.error(error);
      }

      setIsLoading(false);
    };
    getPermissions();
  }, [address, network]);

  return (
    <>
      <p style={{ display: 'inline' }}>
        {controllers.length} controllers found
      </p>

      <div className="m-3" hidden={!isLoading}>
        <span>Loading controllers permissions. Please wait...</span>
        <progress
          className="progress is-small is-primary mt-1"
          style={{ width: '300px' }}
          max="100"
        >
          Loading...{' '}
        </progress>
      </div>

      {controllers.some((controller) => controller == null) && (
        <div className="notification is-warning is-light mt-3">
          <p>
            ⚠️ It looks like some entries inside the{' '}
            <code>AddressPermissions[]</code> array do not contain controller
            addresses. The value for some indexes is set to <code>0x</code>.
          </p>
          <p>
            <strong></strong>
          </p>
          <table
            className="table my-4"
            style={{ backgroundColor: 'transparent' }}
          >
            <thead>
              <tr>
                <th className="">Affected indexes:</th>
                <th className="">Array Index Data Key</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(controllersPermissions)
                .map((controllerInfo, index) => ({ ...controllerInfo, index }))
                .filter(({ controller }) => controller == null)
                .map(({ index, arrayIndexDataKey }) => (
                  <tr key={index}>
                    <td>
                      <code>AddressPermissions[{index}]</code>
                    </td>
                    <td className="ml-4 mt-1">
                      <code>{arrayIndexDataKey}</code>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p>
            This could be because some controller addresses have been removed at
            these specific indexes, but the array length has not been updated.
          </p>
          <p>
            <code>AddressPermissions[].length = {controllers.length}</code>{' '}
            (correspond to the <strong>&quot;Raw value&quot;</strong> above
            converted from hex to decimal)
          </p>
          <strong>
            Consider updating the array length or re-adding the controller
            addresses at these specific indexes to fix the list of controllers.
          </strong>
        </div>
      )}

      {!isLoading && (
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
              (
                {
                  controller,
                  arrayIndexDataKey,
                  permissionDataKey,
                  bitArray,
                  permissions,
                },
                index,
              ) => (
                <tr key={index}>
                  <td>
                    <div className="mb-6">
                      <p className="has-text-weight-bold">
                        AddressPermissions[{index}]
                      </p>
                      ➡{' '}
                      <code className="has-text-weight-bold">
                        {arrayIndexDataKey}
                      </code>
                    </div>
                    <div className="mb-6">
                      <p className="has-text-weight-bold">
                        AddressPermissions:Permissions:
                        <code className="is-size-7">
                          {controller ? controller : 'unknown'}
                        </code>
                      </p>

                      {controller && permissionDataKey ? (
                        <p>
                          ➡{' '}
                          <PermissionDataKeyDisplay
                            permissionDataKey={permissionDataKey}
                          />
                        </p>
                      ) : (
                        <p className="notification is-warning is-light">
                          ⚠️ Cannot encode data key: controller address unknown
                        </p>
                      )}
                    </div>
                  </td>
                  <td style={{ width: '50%' }}>
                    <div className="mb-3">
                      <p>Controller Infos:</p>
                      {controller ? (
                        <AddressInfos address={controller} />
                      ) : (
                        <p className="notification is-warning is-light">
                          ⚠️ No controller found at index {index}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      {<p className="text-bold">Permissions:</p>}
                      {controller ? (
                        <div>
                          <p>
                            <code className="has-text-primary">{bitArray}</code>
                          </p>
                          <p>
                            {bitArray == '0x' ||
                              (bitArray ==
                                '0x0000000000000000000000000000000000000000000000000000000000000000' && (
                                <i>No permission set</i>
                              ))}
                            {Object.entries(permissions).map(
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
                        </div>
                      ) : (
                        <p className="notification is-warning is-light">
                          ⚠️ Cannot fetch permissions: controller unknown at
                          index {index}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ControllersList;
