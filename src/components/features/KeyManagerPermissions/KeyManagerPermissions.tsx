/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import ERC725 from '@erc725/erc725.js';
import PermissionsBtns from '@/components/ui/PermissionsBtns';
import ToolInfos from '@/components/layout/ToolInfos';
import { LSP_DOCS_URL } from '@/constants/links';
import CodeEditor from '@/components/ui/CodeEditor';

const KeyManagerPermissions: React.FC = () => {
  const initialEncodedPermissions =
    '0x0000000000000000000000000000000000000000000000000000000000000001';

  const [encodedPermissions, setEncodedPermissions] = useState(
    initialEncodedPermissions,
  );

  const [decodedPermissions, setDecodedPermissions] = useState<
    Record<string, boolean>
  >(ERC725.decodePermissions(initialEncodedPermissions));

  const handleEncodedPermissionChange = (input: string) => {
    try {
      // TODO: Check Validation. 32 bytes
      setEncodedPermissions(input);
      setDecodedPermissions(ERC725.decodePermissions(input));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handlePermissionClick = (permissionName: string) => {
    console.log('updatedDecodedPermissions', permissionName);

    const updatedDecodedPermissions = decodedPermissions;
    updatedDecodedPermissions[permissionName] =
      !updatedDecodedPermissions[permissionName];
    setDecodedPermissions(updatedDecodedPermissions);
    setEncodedPermissions(ERC725.encodePermissions(updatedDecodedPermissions));
  };

  return (
    <div className="container container-key-manager">
      <h2 className="title is-2">Permissions</h2>
      <ToolInfos
        erc725jsMethod={['encodePermissions', 'decodePermissions']}
        description={
          <>
            Encode and decode{' '}
            <a
              href={`${LSP_DOCS_URL.LSP6}#address-permissions`}
              target="_blank"
              rel="noreferrer"
            >
              permissions
            </a>{' '}
            based on the{' '}
            <a href={LSP_DOCS_URL.LSP6} target="_blank" rel="noreferrer">
              LSP6 Key Manager
            </a>{' '}
            standard.
          </>
        }
      />

      <div className="columns">
        <div className="column">
          <input
            className="input is-medium"
            type="text"
            placeholder="0x0000000000000000000000000000000000000000000000000000000000000001"
            value={encodedPermissions}
            onChange={(e) => handleEncodedPermissionChange(e.target.value)}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-two-thirds">
          <table className="table is-fullwidth mb-4">
            <thead>
              <tr>
                <th>Category</th>
                <th>Permissions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong className="mb-2 ">Administration & Ownership</strong>
                </td>
                <td>
                  <PermissionsBtns
                    permissions={[
                      'CHANGEOWNER',
                      'ADDCONTROLLER',
                      'EDITPERMISSIONS',
                    ]}
                    color={'is-red'}
                    decodedPermissions={decodedPermissions}
                    handlePermissionClick={handlePermissionClick}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong className="mb-2 ">LSP17 Extensions</strong>
                </td>
                <td>
                  {' '}
                  <PermissionsBtns
                    permissions={['ADDEXTENSIONS', 'CHANGEEXTENSIONS']}
                    color={'is-extension'}
                    decodedPermissions={decodedPermissions}
                    handlePermissionClick={handlePermissionClick}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong className="mb-2 ">
                    LSP1 Universal Receivers Delegates
                  </strong>
                </td>
                <td>
                  {' '}
                  <PermissionsBtns
                    permissions={[
                      'ADDUNIVERSALRECEIVERDELEGATE',
                      'CHANGEUNIVERSALRECEIVERDELEGATE',
                    ]}
                    color={'is-fuschia'}
                    decodedPermissions={decodedPermissions}
                    handlePermissionClick={handlePermissionClick}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong className="mb-2 ">Contract Interactions</strong>
                </td>
                <td>
                  {' '}
                  <PermissionsBtns
                    permissions={[
                      'SUPER_TRANSFERVALUE',
                      'TRANSFERVALUE',
                      'SUPER_CALL',
                      'CALL',
                      'SUPER_STATICCALL',
                      'STATICCALL',
                      'DEPLOY',
                    ]}
                    color={'is-yellow'}
                    decodedPermissions={decodedPermissions}
                    handlePermissionClick={handlePermissionClick}
                  />
                  <PermissionsBtns
                    permissions={['EXECUTE_RELAY_CALL']}
                    color={'is-orange'}
                    decodedPermissions={decodedPermissions}
                    handlePermissionClick={handlePermissionClick}
                  />
                  <PermissionsBtns
                    permissions={[
                      'SUPER_DELEGATECALL',
                      'DELEGATECALL',
                      'REENTRANCY',
                    ]}
                    color={'is-red'}
                    decodedPermissions={decodedPermissions}
                    handlePermissionClick={handlePermissionClick}
                  />
                  <PermissionsBtns
                    permissions={['ERC4337_PERMISSION']}
                    color={'is-grey'}
                    decodedPermissions={decodedPermissions}
                    handlePermissionClick={handlePermissionClick}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong className="mb-2 ">Metadata</strong>
                </td>
                <td>
                  {' '}
                  <PermissionsBtns
                    permissions={['SUPER_SETDATA', 'SETDATA']}
                    color={'is-blue'}
                    decodedPermissions={decodedPermissions}
                    handlePermissionClick={handlePermissionClick}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong className="mb-2 ">Signing Verification</strong>
                </td>
                <td>
                  {' '}
                  <PermissionsBtns
                    permissions={['SIGN', 'ENCRYPT', 'DECRYPT']}
                    color={'is-purple'}
                    decodedPermissions={decodedPermissions}
                    handlePermissionClick={handlePermissionClick}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="column is-one-third">
          <div className="mb-4 p-4 has-background-light">
            <CodeEditor
              sourceCode={JSON.stringify(decodedPermissions, undefined, 2)}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyManagerPermissions;
