import React, { useEffect, useState } from 'react';
import ERC725, { encodeArrayKey, encodeKeyName } from '@erc725/erc725.js';

import { getDataBatch } from '../../utils/web3';
import useWeb3 from '../../hooks/useWeb3';
import AddressInfos from '../AddressInfos';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

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
          const permissionsDataKeys = controllers
            .filter((controller) => controller != null)
            .map((controller) => {
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
    <>
      <p style={{ display: 'inline' }}>
        {controllers.length} controllers found
      </p>

      {controllers.find((controller) => controller === null) !== undefined && (
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
            {controllers.map((controller, index) => (
              <tr key={controller}>
                <td>
                  <p>
                    <strong>AddressPermissions[{index}]</strong>
                  </p>
                  <p>
                    ➡{' '}
                    <code>
                      {encodeArrayKey(
                        ERC725YDataKeys.LSP6['AddressPermissions[]'].length,
                        index,
                      )}
                    </code>
                  </p>
                </td>
                <td style={{ width: '50%' }}>
                  <p>Controller Infos:</p>
                  {controller ? (
                    <AddressInfos assetAddress={controller.toString()} />
                  ) : (
                    <i>No controller found at index {index}</i>
                  )}

                  {controller && <p>Permissions:</p>}
                  {controllersPermissions[index] &&
                    Object.entries(controllersPermissions[index]).map(
                      ([permission, isSet]) =>
                        isSet &&
                        permission !== '0x' && (
                          <span key={permission} className="tag is-primary m-1">
                            {permission}
                          </span>
                        ),
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ControllersList;
