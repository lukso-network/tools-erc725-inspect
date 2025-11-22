import React from 'react';

type Props = {
  permissions: { [key: string]: boolean };
};

interface PermissionCapability {
  icon: string;
  description: string;
  checkPermissions: (permissions: { [key: string]: boolean }) => boolean;
  getDescription: (permissions: { [key: string]: boolean }) => string;
}

const PERMISSION_CAPABILITIES: PermissionCapability[] = [
  {
    icon: '🔐',
    description: '',
    checkPermissions: (permissions) =>
      permissions['ADDCONTROLLER'] || permissions['EDITPERMISSIONS'],
    getDescription: (permissions) => {
      const canAdd = permissions['ADDCONTROLLER'];
      const canEdit = permissions['EDITPERMISSIONS'];

      if (canAdd && canEdit) {
        return 'Can grant permissions to new addresses (controllers), and update permissions of existing controllers';
      } else if (canAdd) {
        return 'Can give permissions to new controllers';
      } else if (canEdit) {
        return 'Can modify the permissions of existing controllers';
      } else {
        return '';
      }
    },
  },
  {
    icon: '📢',
    description: '',
    checkPermissions: (permissions) =>
      permissions['ADDUNIVERSALRECEIVERDELEGATE'] ||
      permissions['CHANGEUNIVERSALRECEIVERDELEGATE'],
    getDescription: (permissions) => {
      const canAdd = permissions['ADDUNIVERSALRECEIVERDELEGATE'];
      const canChange = permissions['CHANGEUNIVERSALRECEIVERDELEGATE'];
      if (canAdd && canChange) {
        return 'Can connect new or update existing Universal Receiver Delegates contracts on this UP to react on notifications';
      } else if (canAdd) {
        return 'Can connect new Universal Receiver Delegates contracts to this UP to react on notifications';
      } else if (canChange) {
        return 'Can change the Universal Receiver Delegates contracts connected to this UP that react on notifications';
      }
      return '';
    },
  },
  {
    icon: '🧩',
    description: '',
    checkPermissions: (permissions) =>
      permissions['ADDEXTENSIONS'] || permissions['CHANGEEXTENSIONS'],
    getDescription: (permissions) => {
      const canAdd = permissions['ADDEXTENSIONS'];
      const canChange = permissions['CHANGEEXTENSIONS'];
      if (canAdd && canChange) {
        return 'Connect this UP to LSP17 Extensions + update them';
      } else if (canAdd) {
        return 'Connect this UP to LSP17 Extensions';
      } else if (canChange) {
        return 'Update the LSP17 Extensions connected to this UP';
      }
      return '';
    },
  },
  {
    icon: '💰',
    description: '',
    checkPermissions: (permissions) =>
      permissions['TRANSFERVALUE'] || permissions['SUPER_TRANSFERVALUE'],
    getDescription: (permissions) => {
      const hasSuper = permissions['SUPER_TRANSFERVALUE'];
      const hasRegular = permissions['TRANSFERVALUE'];
      if (hasSuper) {
        return "Can send the LYX from this UP's balance to ANY address";
      } else if (hasRegular) {
        return "Can send the LYX from this UP's balance to addresses restricted under the Allowed Calls";
      }
      return '';
    },
  },
  {
    icon: '➡️',
    description: '',
    checkPermissions: (permissions) =>
      permissions['CALL'] ||
      permissions['SUPER_CALL'] ||
      permissions['STATICCALL'] ||
      permissions['SUPER_STATICCALL'],
    getDescription: (permissions) => {
      const hasSuperCall =
        permissions['SUPER_CALL'] || permissions['SUPER_STATICCALL'];
      const hasRegularCall = permissions['CALL'] || permissions['STATICCALL'];

      if (hasSuperCall) {
        return 'Can use this UP to interact with ANY external addresses and smart contracts';
      } else if (hasRegularCall) {
        return 'Can use this UP to interact with addresses / smart contracts restricted under the Allowed Calls';
      }
      return '';
    },
  },
  {
    icon: '🏭',
    description: 'Use this UP to deploy smart contracts',
    checkPermissions: (permissions) => permissions['DEPLOY'],
    getDescription: () => 'Can make this UP deploy new smart contracts',
  },
  {
    icon: '🗄️',
    description: '',
    checkPermissions: (permissions) =>
      permissions['SETDATA'] || permissions['SUPER_SETDATA'],
    getDescription: (permissions) => {
      const hasSuper = permissions['SUPER_SETDATA'];
      const hasRegular = permissions['SETDATA'];

      if (hasSuper) {
        return 'Can set or update ANY metadata on this UP (e.g: profile metadata, grid, issued / received assets, etc...)';
      } else if (hasRegular) {
        return 'Can set or update specific metadata restricted under the Allowed ERC725Y Data Keys';
      }
      return '';
    },
  },
  {
    icon: '✍️',
    description: '',
    checkPermissions: (permissions) =>
      permissions['SIGN'] || permissions['ENCRYPT'] || permissions['DECRYPT'],
    getDescription: (permissions) => {
      const canSign = permissions['SIGN'];
      const canEncrypt = permissions['ENCRYPT'];
      const canDecrypt = permissions['DECRYPT'];
      const hasEncryption = canEncrypt || canDecrypt;

      if (canSign && hasEncryption) {
        return 'Can use this UP to log into dApps (via SIWE), sign messages and encrypt/decrypt data';
      } else if (canSign) {
        return 'Can use this UP to log into dApps (via SIWE) and sign messages';
      } else if (hasEncryption) {
        return 'Can use this UP to encrypt/decrypt data';
      }
      return '';
    },
  },
  {
    icon: '⛽',
    description: '',
    checkPermissions: (permissions) => permissions['EXECUTE_RELAY_CALL'],
    getDescription: (permissions) => {
      const hasRelayCall = permissions['EXECUTE_RELAY_CALL'];

      if (hasRelayCall) {
        return '✅ This controller can use relayers to perform gasless transactions on this UP';
      }
      return '';
    },
  },
  {
    icon: '🔄',
    description: '',
    checkPermissions: (permissions) => permissions['REENTRANCY'],
    getDescription: (permissions) => {
      const hasReentrancy = permissions['REENTRANCY'];

      if (hasReentrancy) {
        return 'Can callback the UP during a transaction to perform further actions on it';
      }
      return '';
    },
  },
];

const PermissionsDescriptionSummary: React.FC<Props> = ({ permissions }) => {
  const visibleCapabilities = PERMISSION_CAPABILITIES.filter((capability) => {
    const isEnabled = capability.checkPermissions(permissions);
    if (isEnabled) {
      capability.description = capability.getDescription(permissions);
    }
    return isEnabled && capability.description;
  });

  if (visibleCapabilities.length === 0) return null;

  return (
    <div className="mb-4">
      <h4 className="title is-6 mb-3">
        What can this controller do on this 🆙 with its permissions?
      </h4>
      <ul className="is-size-7" style={{ listStyle: 'none', paddingLeft: 0 }}>
        {visibleCapabilities.map((capability, index) => (
          <li
            key={index}
            className="mb-2"
            style={{ display: 'flex', alignItems: 'flex-start' }}
          >
            <span className="mr-2" style={{ flexShrink: 0 }}>
              {capability.icon}
            </span>
            <span>{capability.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionsDescriptionSummary;
