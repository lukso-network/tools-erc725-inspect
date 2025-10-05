import PermissionBadge from '../PermissionBadge/PermissionBadge';

type Props = {
  permissions: string[];
  color: string;
  decodedPermissions: Record<string, boolean>;
  handlePermissionClick: (permission: string) => void;
};

const PermissionBtn: React.FC<Props> = ({
  permissions,
  color,
  decodedPermissions,
  handlePermissionClick,
}) => {
  return (
    <div className="buttons">
      {permissions.map((permission: string) => (
        <PermissionBadge
          key={permission}
          color={color}
          permissionName={permission}
          isOutlined={!decodedPermissions[permission] ? true : false}
          onClick={(e) => {
            e.preventDefault();
            handlePermissionClick(permission);
          }}
        />
      ))}
    </div>
  );
};

export default PermissionBtn;
