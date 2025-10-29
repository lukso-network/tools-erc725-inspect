'use client';

import { useState, useEffect } from 'react';
import { ERC725, ERC725JSONSchema, encodeKeyName } from '@erc725/erc725.js';
import { isValidTuple, type ERC725JSONSchemaKeyType } from '@erc725/erc725.js';
import { isHex } from 'web3-utils';

import useWeb3 from '@/hooks/useWeb3';
import { getData } from '@/utils/web3';

import CodeEditor from '@/components/ui/CodeEditor';

import { LSP_SPECS_URL } from '@/constants/links';

const SCHEMA_PLACEHOLDER = {
  name: 'MyCustomKey',
  key: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  keyType: 'Singleton',
  valueType: 'bytes',
  valueContent: 'Bytes',
};

const LSP2_DOCS_URL =
  'https://docs.lukso.tech/standards/metadata/lsp2-json-schema';

const FieldsDescription = () => (
  <>
    <label className="label is-small mb-5">
      Enter a valid{' '}
      <a href={LSP_SPECS_URL.LSP2} target="_blank" rel="noreferrer">
        LSP2 JSON Schema ↗️
      </a>{' '}
      with fields:
    </label>
    <ul>
      <li className="help is-info">
        <code>name</code>: a{' '}
        <a
          href={`${LSP_SPECS_URL.LSP2}#data-key-name`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>unique name ↗️</strong>
        </a>{' '}
        for this custom schema definition
      </li>
      <li className="help is-info">
        <code>key</code>: Enter the specific ERC725Y data key as{' '}
        <a
          href={`${LSP_SPECS_URL.LSP2}#data-key-hash`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>bytes32 hex string ↗️</strong>
        </a>
      </li>
      <li className="help is-info">
        <code>keyType</code>: refer to{' '}
        <a
          href={`${LSP_SPECS_URL.LSP2}#data-key-types`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>
            LSP2 <code>keyType</code> specification ↗️
          </strong>
        </a>
      </li>
      <li className="help is-info">
        <code>valueType</code>: refer to{' '}
        <a
          href={`${LSP2_DOCS_URL}#valuetype-encoding`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>
            LSP2 <code>valueType</code> specification ↗️
          </strong>
        </a>
      </li>
      <li className="help is-info">
        <code>valueContent</code>: refer to{' '}
        <a
          href={`${LSP_SPECS_URL.LSP2}#value-content`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>
            LSP2 <code>valueContent</code> specification ↗️
          </strong>
        </a>
      </li>
    </ul>
  </>
);

type JSONInputProps = {
  jsonInput: string;
  jsonError: string;
  handleJSONInputChange: (value: string) => void;
};

const JSONInput = ({
  jsonInput,
  jsonError,
  handleJSONInputChange,
}: JSONInputProps) => {
  return (
    <>
      <div className="field mx-2">
        <label className="label is-small">
          Paste your ERC725JSONSchema JSON here:
        </label>
        <div className="control"></div>
        <CodeEditor
          sourceCode={jsonInput}
          handleChange={handleJSONInputChange}
        />
        {jsonError && <p className="help is-danger is-small">{jsonError}</p>}
      </div>
    </>
  );
};

type ManualInputProps = {
  // All states and handlers are passed down from parent component
  customSchemaName: string;
  setCustomSchemaName: (value: string) => void;
  customDataKey: string;
  handleDataKeyChange: (value: string) => void;
  dataKeyError: string;
  customKeyType: string;
  setCustomKeyType: (value: string) => void;
  customValueType: string;
  setCustomValueType: (value: string) => void;
  customValueContent: string;
  setCustomValueContent: (value: string) => void;
};

const ManualInput = ({
  customSchemaName,
  setCustomSchemaName,
  customDataKey,
  handleDataKeyChange,
  dataKeyError,
  customKeyType,
  setCustomKeyType,
  customValueType,
  setCustomValueType,
  customValueContent,
  setCustomValueContent,
}: ManualInputProps) => (
  <>
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
    </div>

    <div className="field">
      <label className="label is-small">Data Key (Hex)</label>
      <div className="control">
        <input
          className={`input is-small ${dataKeyError ? 'is-danger' : ''}`}
          type="text"
          placeholder="0x... (e.g., 0x123...abc)"
          value={customDataKey}
          onChange={(e) => handleDataKeyChange(e.target.value)}
        />
      </div>
      {dataKeyError && (
        <p className="help is-danger is-small">{dataKeyError}</p>
      )}
    </div>

    <div className="field">
      <label className="label is-small">Data Key Type</label>
      <div className="control">
        <select
          className="input is-small"
          value={customKeyType}
          onChange={(e) => setCustomKeyType(e.target.value)}
        >
          <option value="">Select Key Type</option>
          <option value="Singleton">Singleton</option>
          <option value="Array">Array</option>
          <option value="Mapping">Mapping</option>
          <option value="MappingWithGrouping">MappingWithGrouping</option>
        </select>
      </div>
    </div>
    <div className="field">
      <label className="label is-small">Value Type</label>
      <div className="control">
        <input
          className="input is-small"
          type="select"
          value={customValueType}
          onChange={(e) => setCustomValueType(e.target.value)}
        />
      </div>
    </div>

    <div className="field">
      <label className="label is-small">Value Content</label>
      <div className="control">
        <select
          className="input is-small"
          value={customValueContent}
          onChange={(e) => setCustomValueContent(e.target.value)}
        >
          <option value="">Select Value Content</option>

          <optgroup label="Basic Types">
            <option value="Address">Address</option>
            <option value="Boolean">Boolean</option>
            <option value="Number">Number</option>
            <option value="String">String</option>
          </optgroup>

          <optgroup label="Complex Types">
            <option value="Keccak256">Keccak256</option>
            <option value="BitArray">BitArray</option>
          </optgroup>

          <optgroup label="File & Media">
            <option value="Markdown">Markdown</option>
            <option value="URL">URL</option>
            <option value="VerifiableURI">VerifiableURI</option>
          </optgroup>

          <optgroup label="Dynamic & Fixed Bytes">
            <option value="Bytes">Bytes</option>
            {/* Bytes1 to Bytes32 */}
            {Array.from({ length: 32 }, (_, i) => (
              <option key={i + 1} value={`Bytes${i + 1}`}>
                Bytes{i + 1}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
    </div>
  </>
);

// Props interface
interface CustomKeySchemaFormProps {
  address: string;
  [key: string]: any; // Using an index signature to allow any props
}

const CustomKeySchemaForm = ({ address }: CustomKeySchemaFormProps) => {
  const web3 = useWeb3();

  const {
    name: sampleName,
    key: sampleKey,
    keyType: sampleKeyType,
    valueType: sampleValueType,
    valueContent: sampleValueContent,
  } = SCHEMA_PLACEHOLDER;

  // Function to automatically generate data key hash based on schema name and key type
  const generateDataKeyHash = (name: string, keyType: string): string => {
    if (!name || !keyType) return '';

    try {
      return encodeKeyName(name);
    } catch (error) {
      console.error('Error generating data key hash:', error);
      return '';
    }
  };

  // States for custom schema fields
  const [customSchemaName, setCustomSchemaName] = useState<string>(sampleName);
  const [customDataKey, setCustomDataKey] = useState<string>(sampleKey);
  const [customKeyType, setCustomKeyType] = useState<string>(sampleKeyType);
  const [customValueType, setCustomValueType] =
    useState<string>(sampleValueType);
  const [customValueContent, setCustomValueContent] =
    useState<string>(sampleValueContent);

  const [dataKeyError, setDataKeyError] = useState<string>('');

  // New states for JSON input mode
  const [isJSONMode, setIsJSONMode] = useState<boolean>(true);
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(SCHEMA_PLACEHOLDER, null, 4),
  );
  const [jsonError, setJsonError] = useState<string>('');

  // States for data fetching and display
  const [rawData, setRawData] = useState<string>('');
  const [decodedData, setDecodedData] = useState<string>('');

  // States for loading and error handling
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>('');

  // Auto-generate data key hash whenever schema name or key type changes
  useEffect(() => {
    if (customSchemaName && customKeyType) {
      const generatedKey = generateDataKeyHash(customSchemaName, customKeyType);
      if (generatedKey && generatedKey !== customDataKey) {
        setCustomDataKey(generatedKey);
        // Clear any existing data key errors since we're auto-generating
        setDataKeyError('');
      }
    }
  }, [customSchemaName, customKeyType]);

  // Sync manual form changes to JSON input (Manual → JSON)
  useEffect(() => {
    if (isJSONMode) return; // Only sync when user is in Manual mode

    const updatedSchema = {
      name: customSchemaName,
      key: customDataKey,
      keyType: customKeyType,
      valueType: customValueType,
      valueContent: customValueContent,
    };

    const newJsonString = JSON.stringify(updatedSchema, null, 4);
    setJsonInput(newJsonString);
  }, [
    customSchemaName,
    customDataKey,
    customKeyType,
    customValueType,
    customValueContent,
    isJSONMode,
  ]);

  const handleDataKeyChange = (dataKey: string) => {
    const setError = isJSONMode ? setJsonError : setDataKeyError;

    if (dataKey.length == 0) {
      setError('Key Value cannot be empty.'); // Error if empty
    }

    // CHECK if dataKey is a valid hex string
    if (!isHex(dataKey)) {
      setError('Data Key must be a valid hex string.');
    }

    // CHECK if dataKey is 32 bytes long
    if (dataKey.length !== 66) {
      setError(
        'Data Key must be a 32 bytes long hex string (with or without 0x prefix).',
      );
    }

    if (!dataKey.startsWith('0x')) dataKey = `0x${dataKey}`;

    setCustomDataKey(dataKey);
  };

  const parseAndPopulateFromJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);

      // Validate required fields
      const requiredFields = [
        'name',
        'key',
        'keyType',
        'valueType',
        'valueContent',
      ];
      const missingFields = requiredFields.filter((field) => !parsed[field]);

      if (missingFields.length > 0) {
        setJsonError(`Missing required fields: ${missingFields.join(', ')}`);
        return;
      }

      // Populate fields
      setCustomSchemaName(parsed.name);
      setCustomKeyType(parsed.keyType);
      setCustomValueType(parsed.valueType);
      setCustomValueContent(parsed.valueContent);

      // Handle the key field - use provided key or auto-generate if missing
      if (parsed.key) {
        handleDataKeyChange(parsed.key); // This will validate the key format
      } else {
        // Key will be auto-generated by the useEffect when name and keyType are set
        const generatedKey = generateDataKeyHash(parsed.name, parsed.keyType);
        if (generatedKey) {
          setCustomDataKey(generatedKey);
          setDataKeyError('');
        }
      }

      setJsonError('');
    } catch (error) {
      setJsonError('Invalid JSON format. Please check your syntax.');
    }
  };

  // Never rewrite the text on each keypress (keep what the user typed)
  const handleJSONInputChange = (value: string) => {
    setJsonInput(value);
    if (value.trim() && isJSONMode) {
      // Only parse JSON when user is actively in JSON mode to prevent loops
      parseAndPopulateFromJSON(value);
    } else if (!isJSONMode) {
      // Clear JSON errors when not in JSON mode
      setJsonError('');
    } else {
      // Clear errors when JSON is empty
      setJsonError('');
    }
  };

  const resetForm = () => {
    setCustomSchemaName(sampleName);
    setCustomDataKey(sampleKey);
    setCustomKeyType(sampleKeyType);
    setCustomValueType(sampleValueType);
    setCustomValueContent(sampleValueContent);

    setDataKeyError('');

    setJsonInput(JSON.stringify(SCHEMA_PLACEHOLDER, null, 2));
    setJsonError('');
    setIsJSONMode(true);
    setRawData('');
    setDecodedData('');
    setFetchError('');
  };

  const handleGetData = async () => {
    if (!web3 || !address) return;

    const customSchemaResult = getCompleteCustomSchema();

    if (customSchemaResult.error || !customSchemaResult.schema) {
      setFetchError(
        customSchemaResult.error || 'Failed to generate custom schema.',
      );
      setRawData('');
      setDecodedData('');
      return;
    }

    setIsLoading(true);
    setFetchError('');

    const customSchema = customSchemaResult.schema;
    const { key, keyType, valueType, valueContent } = customSchema;

    try {
      const dataToDecode = await getData(address, key, web3);

      if (!dataToDecode) {
        setRawData('0x');
        setDecodedData('No data found for this custom key');
        setIsLoading(false);
        return;
      }

      setRawData(dataToDecode);

      // Create ERC725 instance with the custom schema
      const erc725js = new ERC725(
        [customSchema],
        address,
        web3?.currentProvider,
        {
          ipfsGateway: 'https://api.universalprofile.cloud/ipfs/',
        },
      );

      const fetchedResult = await erc725js.fetchData([customSchema.name]);

      const decodedCustomValue = fetchedResult[0]?.value;

      const displayAsJSON =
        keyType === 'Array' ||
        valueContent === 'VerifiableURI' ||
        isValidTuple(valueType, valueContent);

      const decodedResult = displayAsJSON
        ? JSON.stringify(decodedCustomValue, null, 4)
        : decodedCustomValue;

      setDecodedData(String(decodedResult));
    } catch (error) {
      console.error('Error decoding custom key:', error);
      setFetchError(`Error decoding custom key: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getCompleteCustomSchema = () => {
    // Validate Data Key Value first
    if (!customDataKey) {
      return {
        schema: null,
        error: 'Key Value must be provided.',
      };
    }
    if (dataKeyError) {
      return {
        schema: null,
        error: dataKeyError,
      };
    }
    // Validate other schema details
    if (
      !customSchemaName ||
      !customKeyType ||
      !customValueType ||
      !customValueContent
    ) {
      return {
        schema: null,
        error:
          'All custom schema fields (Schema Name, Key Value, Key Type, Value Type, Value Content) must be provided and valid.',
      };
    }

    const customSchema: ERC725JSONSchema = {
      name: customSchemaName,
      key: customDataKey,
      keyType: customKeyType,
      valueType: customValueType,
      valueContent: customValueContent,
    };
    return { schema: customSchema, error: undefined };
  };

  return (
    <>
      <h3 className="title is-3 mt-6">Custom Key Reading</h3>

      <div className="mb-4 p-4 has-background-light">
        <div className="is-flex is-justify-content-space-between is-align-items-center">
          <h5 className="title is-5 home-link">
            <a href={LSP_SPECS_URL.LSP2} target="_blank" rel="noreferrer">
              LSP2 Schema - {isJSONMode ? 'JSON Input' : 'Form Input'}
            </a>
          </h5>
          <div className="field is-grouped is-grouped-right mb-4">
            <div className="buttons">
              <button
                className="button is-info is-small mr-2"
                type="button"
                onClick={() => setIsJSONMode(!isJSONMode)}
              >
                {isJSONMode ? 'Switch to Manual Form' : 'Switch to JSON Input'}
              </button>

              <button
                className="button is-info is-small"
                type="button"
                onClick={resetForm}
              >
                Reset Form
              </button>
            </div>
          </div>
        </div>

        <div className="columns is-variable is-align-items-flex-start">
          <div className="column is-two-thirds">
            {isJSONMode ? (
              <JSONInput
                jsonInput={jsonInput}
                jsonError={jsonError}
                handleJSONInputChange={handleJSONInputChange}
              />
            ) : (
              <ManualInput
                customSchemaName={customSchemaName}
                setCustomSchemaName={setCustomSchemaName}
                customDataKey={customDataKey}
                handleDataKeyChange={handleDataKeyChange}
                dataKeyError={dataKeyError}
                customKeyType={customKeyType}
                setCustomKeyType={setCustomKeyType}
                customValueType={customValueType}
                setCustomValueType={setCustomValueType}
                customValueContent={customValueContent}
                setCustomValueContent={setCustomValueContent}
              />
            )}
          </div>
          <div className="column is-one-third">
            <FieldsDescription />
          </div>
        </div>

        {/* Get Data Button */}
        <div className="field mt-4">
          <div className="control">
            <button
              className={`button is-primary ${isLoading ? 'is-loading' : ''}`}
              type="button"
              onClick={handleGetData}
              disabled={
                !address ||
                isLoading ||
                (!isJSONMode &&
                  (!customSchemaName ||
                    !customDataKey ||
                    !customKeyType ||
                    !customValueType ||
                    !customValueContent ||
                    dataKeyError !== '')) ||
                (isJSONMode && (!jsonInput || jsonError !== ''))
              }
            >
              Get Data
            </button>
          </div>
        </div>

        {/* Error Display */}
        {fetchError && (
          <div className="notification is-danger mt-4">{fetchError}</div>
        )}

        {/* Data Display */}
        {rawData && !fetchError && (
          <div className="column is-full mt-4 dataKeyBox">
            <div className="content">
              <div className="title is-4">
                Custom Key Data
                <span className="tag is-small mb-2 mx-2 is-info">
                  {customKeyType}
                </span>
              </div>
              <ul>
                <li>
                  <strong>Schema Name:</strong> <code>{customSchemaName}</code>
                </li>
                <li>
                  <strong>Key:</strong> <code>{customDataKey}</code>
                </li>
                <li>
                  <strong>Raw value: </strong>
                  <span className="tag is-small mx-2 is-link is-light">
                    {customValueType}
                  </span>
                  <code>{rawData}</code>
                </li>
                <li>
                  <strong>Value Content: </strong>
                  <span className="tag is-small is-link is-light">
                    {customValueContent}
                  </span>
                </li>
                <li>
                  <strong>Decoded value: </strong>
                  <pre
                    style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}
                  >
                    {decodedData}
                  </pre>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

CustomKeySchemaForm.displayName = 'CustomKeySchemaForm';

export default CustomKeySchemaForm;
