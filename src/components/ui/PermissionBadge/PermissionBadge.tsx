import type { PermissionName } from '@/types/permission';
import { PERMISSION_COLOR_MAP } from '@/constants/permissions';

interface PermissionBadgeProps {
  permission: PermissionName;
}

const PermissionBadge: React.FC<PermissionBadgeProps> = ({ permission }) => {
  const colorClass = PERMISSION_COLOR_MAP[permission];
  return <span className={`tag ${colorClass} m-1`}>{permission}</span>;
};

export default PermissionBadge;
