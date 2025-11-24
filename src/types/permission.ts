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

export type PermissionCategory = {
  title: string;
  permissions: PermissionName[];
};
