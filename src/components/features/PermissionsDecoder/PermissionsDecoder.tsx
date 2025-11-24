import React from 'react';
import { size, type Hex } from 'viem';
import ERC725 from '@erc725/erc725.js';

import type { PermissionName } from '@/types/permission';
import { PERMISSION_CATEGORIES } from '@/constants/permissions';

import PermissionBadge from '@/components/ui/PermissionBadge';
import PermissionsDescriptionSummary from '../PermissionsDescriptionSummary';

interface Props {
  bitArrayHexValue: string | null;
  showPermissionTable: boolean;
}

const PermissionsEnabledList: React.FC<Props> = ({
  bitArrayHexValue,
  showPermissionTable = true,
}) => {
  if (
    !bitArrayHexValue ||
    bitArrayHexValue == '0x' ||
    bitArrayHexValue ==
      '0x0000000000000000000000000000000000000000000000000000000000000000'
  ) {
    return <i>No permissions set</i>;
  }

  if (size(bitArrayHexValue as Hex) !== 32) {
    return (
      <i className="notification is-warning is-light">
        Invalid bit array length: {size(bitArrayHexValue as Hex)}
      </i>
    );
  }

  const permissions = bitArrayHexValue
    ? ERC725.decodePermissions(bitArrayHexValue as Hex)
    : {};

  // Filter categories to only show those with at least one enabled permission
  const visibleCategories = PERMISSION_CATEGORIES.filter((category) =>
    category.permissions.some((permission) => permissions[permission]),
  );

  const permissionsEnabledCount = Object.values(permissions).filter(
    (isEnabled) => isEnabled == true,
  ).length;

  return (
    <div className="container mt-5">
      <PermissionsDescriptionSummary permissions={permissions} />
      <details open={showPermissionTable}>
        <summary className="has-background-primary-light p-2 is-clickable has-text-weight-semibold is-size-7">
          {permissionsEnabledCount} permission
          {permissionsEnabledCount > 1 ? 's' : ''} found
          {showPermissionTable ? '' : ' (click to expand)'}
        </summary>
        <div className="p-2">
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
                        <PermissionBadge
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

export default PermissionsEnabledList;
