/* eslint-disable react/no-unescaped-entities */

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
          Encode and decode{' '}
          <a
            href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/#address-permissions"
            target="_blank"
            rel="noreferrer"
          >
            permissions
          </a>{' '}
          based on the{' '}
          <a
            href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager"
            target="_blank"
            rel="noreferrer"
          >
            LSP6 KeyManager
          </a>{' '}
          standard.
        </div>
      </article>
      <article className="message">
        <div className="message-body">
          It&lsquo;s using the{' '}
          <a
            href="https://docs.lukso.tech/tools/erc725js/classes/ERC725#encodepermissions"
            target="_blank"
            rel="noreferrer"
          >
            encodePermissions
          </a>{' '}
          function of the{' '}
          <a
            href="https://www.npmjs.com/package/@erc725/erc725.js"
            target="_blank"
            rel="noreferrer"
          >
            erc725.js
          </a>{' '}
          library.
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
        <div className="column is-half">
          <h5 className="mb-2 title is-5">Contract Ownership</h5>
          <PermissionsBtns
            permissions={['CHANGEOWNER', 'ADDCONTROLLER', 'EDITPERMISSIONS']}
            color={'is-orange-dark'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
          <h5 className="mb-2 title is-5">Extensions</h5>
          <PermissionsBtns
            permissions={['ADDEXTENSIONS', 'CHANGEEXTENSIONS']}
            color={'is-orange'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
          <h5 className="mb-2 title is-5">Universal Receivers</h5>
          <PermissionsBtns
            permissions={[
              'ADDUNIVERSALRECEIVERDELEGATE',
              'CHANGEUNIVERSALRECEIVERDELEGATE',
            ]}
            color={'is-warning'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
          <h5 className="mb-2 title is-5">Payload Execution</h5>
          <PermissionsBtns
            permissions={['REENTRANCY', 'ERC4337_PERMISSION']}
            color={'is-danger'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
          <h5 className="mb-2 title is-5">Contract Interactions</h5>
          <PermissionsBtns
            permissions={[
              'SUPER_TRANSFERVALUE',
              'TRANSFERVALUE',
              'SUPER_CALL',
              'CALL',
              'SUPER_STATICCALL',
              'STATICCALL',
              'SUPER_DELEGATECALL',
              'DELEGATECALL',
              'DEPLOY',
            ]}
            color={'is-primary'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
          <h5 className="mb-2 title is-5">Contract Storage</h5>
          <PermissionsBtns
            permissions={['SUPER_SETDATA', 'SETDATA']}
            color={'is-success'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
          <h5 className="mb-2 title is-5">Signing Verification</h5>
          <PermissionsBtns
            permissions={['ENCRYPT', 'DECRYPT', 'SIGN']}
            color={'is-purple'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
        </div>
        <div className="column is-half">
          <pre>{JSON.stringify(decodedPermissions, undefined, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default KeyManagerPermissions;
