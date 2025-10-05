type PermissionBadgeProps = {
  permissionName: string;
  color: string;
  isOutlined: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const PermissionBadge: React.FC<PermissionBadgeProps> = ({
  permissionName,
  color,
  isOutlined,
  onClick,
}) => (
  <button
    className={`button is-small ${color} ${isOutlined ? 'is-outlined' : ''}`}
    onClick={onClick}
  >
    {permissionName}
  </button>
);

export default PermissionBadge;
