import React from 'react';
import PermissionTag from '@/components/ui/PermissionTag';
import type { PermissionName } from '@/types/permission';
import type { Hex } from 'viem';
import PermissionsSummary from './PermissionsDescriptionSummary';

interface PermissionsListProps {
  permissions: { [key: string]: boolean };
  bitArray: Hex | null;
}

interface PermissionCategory {
  title: string;
  permissions: PermissionName[];
}

const PERMISSION_CATEGORIES: PermissionCategory[] = [
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

const PermissionsList: React.FC<PermissionsListProps> = ({
  permissions,
  bitArray,
}) => {
  // Filter categories to only show those with at least one enabled permission
  const visibleCategories = PERMISSION_CATEGORIES.filter((category) =>
    category.permissions.some((permission) => permissions[permission]),
  );

  if (visibleCategories.length === 0) {
    return <i>No permissions set</i>;
  }

  const permissionsEnabledCount = Object.values(permissions).filter(
    (isEnabled) => isEnabled == true,
  ).length;

  return (
    <div className="container">
      <PermissionsSummary permissions={permissions} />
      <details>
        <summary className="has-background-primary-light p-2 is-clickable has-text-weight-semibold is-size-7">
          {permissionsEnabledCount} permission
          {permissionsEnabledCount > 1 ? 's' : ''} found
        </summary>
        <div className="p-2">
          <p className="text-bold">
            Permissions:{' '}
            {bitArray && <code className="has-text-primary">{bitArray}</code>}
          </p>
          <table
            className="table is-narrow is-fullwidth is-bordered is-hoverable"
            style={{ backgroundColor: 'transparent' }}
          >
            <thead>
              <tr className="is-primary is-size-7">
                <th>Category</th>
                <th>Permissions</th>
              </tr>
            </thead>
            <tbody>
              {visibleCategories.map((category) => (
                <tr key={category.title}>
                  <td className="has-background-primary-80 has-text-primary-80-invert">
                    <strong className="mb-2 is-size-7">{category.title}</strong>
                  </td>
                  <td>
                    {category.permissions
                      .filter((permission) => permissions[permission])
                      .map((permission) => (
                        <PermissionTag
                          key={permission}
                          permission={permission as PermissionName}
                        />
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
};

export default PermissionsList;
