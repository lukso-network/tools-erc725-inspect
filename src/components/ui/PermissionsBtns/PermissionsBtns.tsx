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
}) => (
  <div className="buttons">
    {permissions.map((permission: string) => (
      <button
        key={permission}
        className={`button ${color} ${!decodedPermissions[permission] && 'is-outlined'
          }`}
        onClick={(e) => {
          e.preventDefault();
          handlePermissionClick(permission);
        }}
      >
        {permission}
      </button>
    ))}
  </div>
);

export default PermissionBtn;
