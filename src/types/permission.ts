import { PERMISSIONS } from '@lukso/lsp-smart-contracts';

export type PermissionColorClass =
  | 'is-red'
  | 'is-extension'
  | 'is-fuschia'
  | 'is-yellow'
  | 'is-orange'
  | 'is-grey'
  | 'is-blue'
  | 'is-purple';

export type PermissionName = keyof typeof PERMISSIONS | 'ERC4337_PERMISSION';

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
