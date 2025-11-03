/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import ERC725, { ERC725JSONSchema } from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import { isAddress, isHex } from 'viem';

import CodeEditor from '@/components/ui/CodeEditor';
import CollapsibleSchema from '@/components/ui/CollapsibleSchema';
import PermissionsBtns from '@/components/ui/PermissionsBtns';
import ToolInfos from '@/components/layout/ToolInfos';

import { LSP_DOCS_URL } from '@/constants/links';

const AddressPermissionsSchema: ERC725JSONSchema | undefined = LSP6Schema.find(
  (schema) => schema.name.startsWith('AddressPermissions:Permissions:'),
);

const KeyManagerPermissions: React.FC = () => {
  const initialEncodedPermissions =
    '0x0000000000000000000000000000000000000000000000000000000000000001';

  const [controllerAddress, setControllerAddress] = useState('');

  const [encodedPermissions, setEncodedPermissions] = useState(
    initialEncodedPermissions,
  );

  const [decodedPermissions, setDecodedPermissions] = useState<
    Record<string, boolean>
  >(ERC725.decodePermissions(initialEncodedPermissions));

  const [encodedDataKeyValues, setEncodedDataKeyValues] = useState<
    { key: string; value: string } | string
  >();

  const handleEncodeDataKeyValue = () => {
    if (!AddressPermissionsSchema) {
      alert('AddressPermissions schema not found');
      return;
    }

    if (!isAddress(controllerAddress.toLowerCase())) {
      alert('Please enter a valid controller address');
      return;
    }

    if (
      !encodedPermissions ||
      !isHex(encodedPermissions) ||
      encodedPermissions.length !== 66
    ) {
      alert('Invalid encoded permissions. Must be a 32 bytes hex string');
      return;
    }

    try {
      const result = ERC725.encodeData(
        [
          {
            keyName: `AddressPermissions:Permissions:<address>`,
            dynamicKeyParts: controllerAddress,
            value: encodedPermissions,
          },
        ],
        [AddressPermissionsSchema],
      );

      setEncodedDataKeyValues({
        key: result.keys[0],
        value: result.values[0],
      });
    } catch (error: any) {
      console.error('Error encoding data:', error);
      setEncodedDataKeyValues(`Error: ${error.message}`);
    }
  };

  const handleEncodedPermissionChange = (input: string) => {
    if (
      !encodedPermissions ||
      !isHex(encodedPermissions) ||
      encodedPermissions.length !== 66
    ) {
      alert('Invalid encoded permissions. Must be a 32 bytes hex string');
      return;
    }

    try {
      setEncodedPermissions(input);
      setDecodedPermissions(ERC725.decodePermissions(input as `0x${string}`));
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

      <div className="columns mx-1 p-4 has-background-light">
        <div className="column">
          <h5 className="title is-5">Encoded Data Key / Value Permissions</h5>
          {AddressPermissionsSchema && (
            <CollapsibleSchema schema={AddressPermissionsSchema} />
          )}

          <div className="field">
            <label className="label is-normal">Controller Address</label>
            <div className="control">
              <input
                className="input is-normal"
                type="text"
                placeholder="enter controller address"
                value={controllerAddress}
                onChange={(e) => setControllerAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label is-normal">Encoded Permissions</label>
            <div className="control">
              <input
                className="input is-normal"
                type="text"
                placeholder="0x0000000000000000000000000000000000000000000000000000000000000001"
                value={encodedPermissions}
                onChange={(e) => handleEncodedPermissionChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <button
            className="button is-primary"
            type="button"
            onClick={handleEncodeDataKeyValue}
            disabled={!controllerAddress || !encodedPermissions}
          >
            Encode Data Key / Value
          </button>

          {encodedDataKeyValues && (
            <div className="mt-4">
              <h6 className="title is-6">Encoded Result:</h6>
              <CodeEditor
                sourceCode={JSON.stringify(encodedDataKeyValues, null, 2)}
                readOnly
              />
            </div>
          )}
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
