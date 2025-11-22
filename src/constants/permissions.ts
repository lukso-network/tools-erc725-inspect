import type {
  PermissionCategory,
  PermissionColorClass,
  PermissionName,
} from '@/types/permission';

export const PERMISSION_COLOR_MAP: Record<
  PermissionName,
  PermissionColorClass
> = {
  // Administration & Ownership
  CHANGEOWNER: 'is-red',
  ADDCONTROLLER: 'is-red',
  EDITPERMISSIONS: 'is-red',
  // LSP17 Extensions
  ADDEXTENSIONS: 'is-extension',
  CHANGEEXTENSIONS: 'is-extension',
  // LSP1 Universal Receivers Delegates
  ADDUNIVERSALRECEIVERDELEGATE: 'is-fuschia',
  CHANGEUNIVERSALRECEIVERDELEGATE: 'is-fuschia',
  // Contract Interactions
  SUPER_TRANSFERVALUE: 'is-yellow',
  TRANSFERVALUE: 'is-yellow',
  SUPER_CALL: 'is-yellow',
  CALL: 'is-yellow',
  SUPER_STATICCALL: 'is-yellow',
  STATICCALL: 'is-yellow',
  DEPLOY: 'is-yellow',
  EXECUTE_RELAY_CALL: 'is-orange',
  SUPER_DELEGATECALL: 'is-red',
  DELEGATECALL: 'is-red',
  REENTRANCY: 'is-red',
  ERC4337_PERMISSION: 'is-grey',
  // Metadata
  SUPER_SETDATA: 'is-blue',
  SETDATA: 'is-blue',
  // Signing Verification
  SIGN: 'is-purple',
  ENCRYPT: 'is-purple',
  DECRYPT: 'is-purple',
};

export const PERMISSION_CATEGORIES: PermissionCategory[] = [
  {
    title: 'Administration & Ownership',
    permissions: ['CHANGEOWNER', 'ADDCONTROLLER', 'EDITPERMISSIONS'],
  },
  {
    title: 'LSP17 Extensions',
    permissions: ['ADDEXTENSIONS', 'CHANGEEXTENSIONS'],
  },
  {
    title: 'LSP1 Universal Receivers Delegates',
    permissions: [
      'ADDUNIVERSALRECEIVERDELEGATE',
      'CHANGEUNIVERSALRECEIVERDELEGATE',
    ],
  },
  {
    title: 'Contract Interactions',
    permissions: [
      'SUPER_TRANSFERVALUE',
      'TRANSFERVALUE',
      'SUPER_CALL',
      'CALL',
      'SUPER_STATICCALL',
      'STATICCALL',
      'DEPLOY',
      'EXECUTE_RELAY_CALL',
      'SUPER_DELEGATECALL',
      'DELEGATECALL',
      'REENTRANCY',
      'ERC4337_PERMISSION',
    ],
  },
  {
    title: 'Metadata',
    permissions: ['SUPER_SETDATA', 'SETDATA'],
  },
  {
    title: 'Signing Verification',
    permissions: ['SIGN', 'ENCRYPT', 'DECRYPT'],
  },
];
