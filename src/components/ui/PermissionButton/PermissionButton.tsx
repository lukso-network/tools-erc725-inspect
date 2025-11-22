import React from 'react';
import type { PermissionName } from '@/types/permission';
import { PERMISSION_COLOR_MAP } from '@/constants/permissions';

type Props = {
  permissionName: PermissionName;
  permissionHex: string;
  isActive: boolean;
  handlePermissionClick: (permission: string) => void;
};

const PermissionButton: React.FC<Props> = ({
  permissionName,
  permissionHex,
  isActive,
  handlePermissionClick,
}) => (
  <span
    key={permissionName}
    className={`button ${PERMISSION_COLOR_MAP[permissionName]} ${
      !isActive && 'is-outlined'
    }`}
    onClick={(e) => {
      e.preventDefault();
      handlePermissionClick(permissionHex);
    }}
  >
    {permissionName}
  </span>
);

export default PermissionButton;
