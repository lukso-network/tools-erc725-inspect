import React, { useContext, useEffect, useState } from 'react';
import { encodeArrayKey, encodeKeyName } from '@erc725/erc725.js';
import type { Hex } from 'viem';

import { getDataBatch } from '@/utils/erc725y';
import { NetworkContext } from '@/contexts/NetworksContext';

import AddressInfos from '@/components/features/AddressInfos';
import PermissionsDecoder from '@/components/features/PermissionsDecoder';

import MappingWithGroupingDataKeyDisplay from '@/components/ui/MappingWithGroupingDataKeyDisplay';

import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import AllowedCallsDecoder from '../AllowedCallsDecoder/AllowedCallsDecoder';
import { decodeAllowedCalls } from '@/utils/encoding';

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
      allowedCallsDataKey: string | null;
      allowedCallsList: Hex[][] | null;
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
            let allowedCallsDataKey: string | null = null;
            let bitArray: string | null = null;
            let allowedCallsList: Hex[][] | null = null;

            if (controller != null) {
              permissionDataKey = encodeKeyName(
                'AddressPermissions:Permissions:<address>',
                controller,
              );

              allowedCallsDataKey = encodeKeyName(
                'AddressPermissions:AllowedCalls:<address>',
                controller,
              );

              // permission values are fetched below all at once via `getDataBatch`
              // for optimisation to avoid multiple RPC calls per controller
              bitArray = null;
              allowedCallsList = null;
            }

            currentState[index] = {
              arrayIndexDataKey: encodeArrayKey(
                ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
                index,
              ),
              controller,
              permissionDataKey,
              bitArray,
              allowedCallsDataKey,
              allowedCallsList,
            };

            setControllersPermissions(currentState);
          });

          // for unknown controllers (null), we cannot encode the data key, so we use address(0) as placeholder
          const permissionsDataKeysToFetch = Object.values(
            controllersPermissions,
          ).map(({ permissionDataKey }) => {
            return (
              permissionDataKey ||
              encodeKeyName(
                'AddressPermissions:Permissions:<address>',
                '0x0000000000000000000000000000000000000000',
              )
            );
          });

          const allowedCallsDataKeysToFetch = Object.values(
            controllersPermissions,
          ).map(({ allowedCallsDataKey }) => {
            return (
              allowedCallsDataKey ||
              encodeKeyName(
                'AddressPermissions:AllowedCalls:<address>',
                '0x0000000000000000000000000000000000000000',
              )
            );
          });

          const permissionsDataValues = await getDataBatch(
            address,
            permissionsDataKeysToFetch as `0x${string}`[],
            network,
          );

          const allowedCallsDataValues = await getDataBatch(
            address,
            allowedCallsDataKeysToFetch as `0x${string}`[],
            network,
          );

          Object.values(controllersPermissions).forEach(
            ({ controller }, index) => {
              const currentState = controllersPermissions;

              currentState[index].bitArray =
                controller && permissionsDataValues[index];

              if (controller && allowedCallsDataValues[index] !== '0x') {
                const [{ value: decodedAllowedCalls }] = decodeAllowedCalls(
                  allowedCallsDataValues[index],
                  controller,
                );

                currentState[index].allowedCallsList = decodedAllowedCalls;
              }

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
                  allowedCallsDataKey,
                  bitArray,
                  allowedCallsList,
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
                          <MappingWithGroupingDataKeyDisplay
                            dataKey={permissionDataKey}
                          />
                        </p>
                      ) : (
                        <p className="notification is-warning is-light">
                          ⚠️ Cannot encode data key: controller address unknown
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <p className="has-text-weight-bold">
                        AddressPermissions:AllowedCalls:
                        <code className="is-size-7">
                          {controller ? controller : 'unknown'}
                        </code>
                      </p>

                      {controller && allowedCallsDataKey ? (
                        <p>
                          ➡{' '}
                          <MappingWithGroupingDataKeyDisplay
                            dataKey={allowedCallsDataKey}
                            colourSecondWord="has-text-link"
                          />
                        </p>
                      ) : (
                        <p className="notification is-warning is-light">
                          ⚠️ Cannot encode data key: controller address unknown
                        </p>
                      )}
                    </div>
                  </td>
                  <td style={{ width: '55%' }}>
                    <div className="is-flex mb-0">
                      <span className="mr-2">Controller:</span>
                      <div>
                        {controller ? (
                          <AddressInfos address={controller} />
                        ) : (
                          <p className="notification is-warning is-light">
                            ⚠️ No controller found at index {index}
                          </p>
                        )}
                      </div>
                    </div>

                    {controller ? (
                      <div>
                        <p className="text-bold">
                          Permissions:{' '}
                          <code className="has-text-primary">{bitArray}</code>
                        </p>
                        <PermissionsDecoder
                          bitArrayHexValue={bitArray}
                          showPermissionTable={false}
                        />
                        {allowedCallsList !== null ? (
                          <details className="my-2">
                            <summary className="has-background-link-light p-2 is-clickable has-text-weight-semibold is-size-7">
                              {allowedCallsList.length} allowed call
                              {allowedCallsList.length > 1 ? 's' : ''} found
                            </summary>
                            <div className="px-2">
                              <AllowedCallsDecoder
                                allowedCallsList={allowedCallsList}
                                size="small"
                              />
                            </div>
                          </details>
                        ) : (
                          <p className="notification is-link is-light has-text-weight-semibold is-size-7 my-2 p-2">
                            No allowed calls configured for this controller
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="notification is-warning is-light">
                        ⚠️ Cannot fetch permissions: controller unknown at index{' '}
                        {index}
                      </p>
                    )}
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
