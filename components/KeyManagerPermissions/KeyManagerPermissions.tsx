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
          This tool will encode and decode
          <a
            href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/#address-permissions"
            target="_blank"
            rel="noreferrer"
            className="mx-1"
          >
            permissions
          </a>
          based on the
          <a
            href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager"
            target="_blank"
            rel="noreferrer"
            className="mx-1"
          >
            LSP6 KeyManager
          </a>
          standardization to match them with their
          <a
            href="https://docs.lukso.tech/standards/generic-standards/lsp2-json-schema"
            target="_blank"
            rel="noreferrer"
            className="ml-1"
          >
            LSP2 ERC725YJSONSchema
          </a>
          .
        </div>
      </article>
      <article className="message">
        <div className="message-body">
          It`s using the
          <a
            href="https://docs.lukso.tech/tools/erc725js/classes/ERC725#encodepermissions"
            target="_blank"
            rel="noreferrer"
            className="mx-1"
          >
            encodePermissions
          </a>
          function of the
          <a
            href="https://www.npmjs.com/package/@erc725/erc725.js"
            target="_blank"
            rel="noreferrer"
            className="mx-1"
          >
            erc725.js
          </a>
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
          <h2 className="mb-2 subtitle is-5">
            Manage Contract Ownership
            <a
              href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/#permissions"
              target="_blank"
              rel="noreferrer"
              className="ml-2 has-text-info-dark"
            >
              ↗
            </a>
          </h2>
          <PermissionsBtns
            permissions={['CHANGEOWNER', 'ADDCONTROLLER', 'EDITPERMISSIONS']}
            color={'is-orange-dark'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
          <h2 className="mb-2 subtitle is-5">
            Manage Extensions
            <a
              href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/#permissions"
              target="_blank"
              rel="noreferrer"
              className="ml-2 has-text-info-dark"
            >
              ↗
            </a>
          </h2>
          <PermissionsBtns
            permissions={['ADDEXTENSIONS', 'CHANGEEXTENSIONS']}
            color={'is-orange'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
          <h2 className="mb-2 subtitle is-5">
            Manage Universal Receivers
            <a
              href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/#permissions"
              target="_blank"
              rel="noreferrer"
              className="ml-2 has-text-info-dark"
            >
              ↗
            </a>
          </h2>
          <PermissionsBtns
            permissions={[
              'ADDUNIVERSALRECEIVERDELEGATE',
              'CHANGEUNIVERSALRECEIVERDELEGATE',
            ]}
            color={'is-warning'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
          <h2 className="mb-2 subtitle is-5">
            Manage Payload Execution
            <a
              href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/#permissions"
              target="_blank"
              rel="noreferrer"
              className="ml-2 has-text-info-dark"
            >
              ↗
            </a>
          </h2>
          <PermissionsBtns
            permissions={['REENTRANCY']}
            color={'is-danger'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
          <h2 className="mb-2 subtitle is-5">
            Manage Contract Interactions
            <a
              href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/#permissions"
              target="_blank"
              rel="noreferrer"
              className="ml-2 has-text-info-dark"
            >
              ↗
            </a>
          </h2>
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
          <h2 className="mb-2 subtitle is-5">
            Manage Contract Storage
            <a
              href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/#permissions"
              target="_blank"
              rel="noreferrer"
              className="ml-2 has-text-info-dark"
            >
              ↗
            </a>
          </h2>
          <PermissionsBtns
            permissions={['SUPER_SETDATA', 'SETDATA']}
            color={'is-success'}
            decodedPermissions={decodedPermissions}
            handlePermissionClick={handlePermissionClick}
          />
          <h2 className="mb-2 subtitle is-5">
            Manage Signing Verification
            <a
              href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/#permissions"
              target="_blank"
              rel="noreferrer"
              className="ml-2 has-text-info-dark"
            >
              ↗
            </a>
          </h2>
          <PermissionsBtns
            permissions={['ENCRYPT', 'DECRYPT', 'SIGN']}
            color={'is-purple'}
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
