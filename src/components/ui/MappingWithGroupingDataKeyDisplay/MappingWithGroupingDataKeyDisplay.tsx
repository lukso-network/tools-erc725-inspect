type Props = {
  dataKey: string;
  colourSecondWord?: string;
};

const MappingWithGroupingDataKeyDisplay: React.FC<Props> = ({
  dataKey,
  colourSecondWord = 'has-text-primary',
}) => {
  // Extract the four parts of the permission data key
  const firstWordPrefix = dataKey.slice(0, 14); // First 6 bytes: e.g: AddressPermissions:[...]:<...> prefix
  const secondWordPrefix = dataKey.slice(14, 22); // Next 4 bytes: e.g: [...]:Permissions:<...> prefix
  const separator = dataKey.slice(22, 26); // Next 2 bytes: 0000 separator
  const dynamicKeyPart = dataKey.slice(26); // Last 20 bytes: controller address

  return (
    <code className="">
      <span
        className="has-text-weight-bold"
        title="AddressPermissions prefix (6 bytes)"
      >
        {firstWordPrefix}
      </span>
      <span
        className={`has-text-weight-bold ${colourSecondWord}`}
        title="Permissions prefix (4 bytes)"
      >
        {secondWordPrefix}
      </span>
      <span
        className="has-text-weight-bold has-text-grey"
        title="Separator (2 bytes - should be 0000)"
      >
        {separator}
      </span>
      <span title="Controller address (20 bytes)">{dynamicKeyPart}</span>
    </code>
  );
};

export default MappingWithGroupingDataKeyDisplay;
