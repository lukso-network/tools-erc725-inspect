import { PERMISSION_COLOR_MAP, type PermissionName } from '@/types/permission';

interface PermissionTagProps {
  permission: PermissionName;
}

const PermissionTag: React.FC<PermissionTagProps> = ({ permission }) => {
  console.log(permission);
  const colorClass = PERMISSION_COLOR_MAP[permission] || 'is-primary';
  console.log(colorClass);

  return <span className={`tag ${colorClass} m-1`}>{permission}</span>;
};

export default PermissionTag;
