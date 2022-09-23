import { useState } from 'react';
import ERC725 from '@erc725/erc725.js';
import PermissionsBtns from '../PermissionsBtns';

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
    <div className="container">
      <h2 className="title is-2">Permissions</h2>
      <article className="message is-info">
        <div className="message-body">
          This tool will encode/decode permissions according to{' '}
          <a href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager">
            LSP6 KeyManager Standard
          </a>{' '}
          smart contract and attempt to match them with their{' '}
          <a href="https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md">
            LSP2 ERC725YJSONSchema
          </a>
          .<br />
          The erc725.js lib provides a{' '}
          <a href="https://docs.lukso.tech/tools/erc725js/classes/ERC725#encodepermissions">
            decodePermissions
          </a>{' '}
          method to decode the permissions.
        </div>
      </article>

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
        <div className="column">
          <PermissionsBtns
            permissions={['SETDATA', 'SIGN', 'ENCRYPT']}
            color={'is-info'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
          <PermissionsBtns
            permissions={[
              'STATICCALL',
              'CALL',
              'DELEGATECALL',
              'DEPLOY',
              'TRANSFERVALUE',
            ]}
            color={'is-warning'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />

          <PermissionsBtns
            permissions={['CHANGEOWNER', 'CHANGEPERMISSIONS', 'ADDPERMISSIONS']}
            color={'is-primary'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
          <PermissionsBtns
            permissions={[
              'SUPER_SETDATA',
              'SUPER_TRANSFERVALUE',
              'SUPER_CALL',
              'SUPER_STATICCALL',
              'SUPER_DELEGATECALL',
            ]}
            color={'is-danger '}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <pre>{JSON.stringify(decodedPermissions, undefined, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default KeyManagerPermissions;
