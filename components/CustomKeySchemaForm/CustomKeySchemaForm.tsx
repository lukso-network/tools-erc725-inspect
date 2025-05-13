import React from 'react';

interface CustomKeySchemaFormProps {
  customSchemaName: string;
  setCustomSchemaName: (value: string) => void;
  customKeyType: string;
  setCustomKeyType: (value: string) => void;
  customValueType: string;
  setCustomValueType: (value: string) => void;
  customValueContent: string;
  setCustomValueContent: (value: string) => void;
}

const CustomKeySchemaForm: React.FC<CustomKeySchemaFormProps> = ({
  customSchemaName,
  setCustomSchemaName,
  customKeyType,
  setCustomKeyType,
  customValueType,
  setCustomValueType,
  customValueContent,
  setCustomValueContent,
}) => {
  return (
    <div className="mt-4 p-4 has-background-light">
      <h5 className="title is-5">Custom Key Schema</h5>
      <div className="field">
        <label className="label is-small">Schema Name</label>
        <div className="control">
          <input
            className="input is-small"
            type="text"
            placeholder="e.g., MyCustomProfileData"
            value={customSchemaName}
            onChange={(e) => setCustomSchemaName(e.target.value)}
          />
        </div>
        <p className="help is-info is-small">
          A unique name for this custom schema definition.
        </p>
      </div>
      <div className="field">
        <label className="label is-small">Key Type</label>
        <div className="control">
          <input
            className="input is-small"
            type="text"
            placeholder="e.g., Singleton, Mapping, Array"
            value={customKeyType}
            onChange={(e) => setCustomKeyType(e.target.value)}
          />
        </div>
        <p className="help is-info is-small">
          Refer to LSP2 `keyType` specification.
        </p>
      </div>
      <div className="field">
        <label className="label is-small">Value Type</label>
        <div className="control">
          <input
            className="input is-small"
            type="text"
            placeholder="e.g., bytes, string, address[], etc."
            value={customValueType}
            onChange={(e) => setCustomValueType(e.target.value)}
          />
        </div>
        <p className="help is-info is-small">
          Refer to LSP2 `valueType` specification.
        </p>
      </div>
      <div className="field">
        <label className="label is-small">Value Content</label>
        <div className="control">
          <input
            className="input is-small"
            type="text"
            placeholder="e.g., HexString, VerifiableURI, AddressArray"
            value={customValueContent}
            onChange={(e) => setCustomValueContent(e.target.value)}
          />
        </div>
        <p className="help is-info is-small">
          Refer to LSP2 `valueContent` specification.
        </p>
      </div>
    </div>
  );
};

export default CustomKeySchemaForm; 