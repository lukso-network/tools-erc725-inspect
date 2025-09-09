'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import { isValidTuple } from '@erc725/erc725.js/build/main/src/lib/decodeData';
import { getData } from '@/utils/web3';
import useWeb3 from '@/hooks/useWeb3';
import { isHex } from 'web3-utils';
import dynamic from 'next/dynamic';
const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), {
  ssr: false,
});
import { json as jsonLang } from '@codemirror/lang-json';
import { githubLight } from '@uiw/codemirror-theme-github';

const SCHEMA_PLACEHOLDER = {
  name: 'MyCustomKey',
  key: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  keyType: 'Singleton',
  valueType: 'bytes',
  valueContent: 'Bytes',
};

const LSP2_DOCS_URL =
  'https://docs.lukso.tech/standards/metadata/lsp2-json-schema';

const LSP2_SPECS_URL =
  'https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md';

const FieldsDescription = () => (
  <>
    <label className="label is-small mb-5">
      Enter a valid{' '}
      <a href={LSP2_SPECS_URL} target="_blank" rel="noreferrer">
        LSP2 JSON Schema ↗️
      </a>{' '}
      with fields:
    </label>
    <ul>
      <li className="help is-info">
        <code>name</code>: a{' '}
        <a
          href={`${LSP2_SPECS_URL}#data-key-name`}
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
          href={`${LSP2_SPECS_URL}#data-key-hash`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>bytes32 hex string ↗️</strong>
        </a>
      </li>
      <li className="help is-info">
        <code>keyType</code>: refer to{' '}
        <a
          href={`${LSP2_DOCS_URL}#data-key-types`}
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
          href="https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#value-content"
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
  // Don't recreate on every render
  const codeEditorJsonExtension = useMemo(() => jsonLang(), []);

  const codeEditorExtensions = useMemo(
    () => [codeEditorJsonExtension],
    [codeEditorJsonExtension],
  );

  return (
    <>
      <div className="field mx-2">
        <label className="label is-small">
          Paste your ERC725JSONSchema JSON here:
        </label>
        <div className="control is-flex is-flex is-justify-content-space-between is-align-items-center">
          <CodeMirror
            value={jsonInput}
            theme={githubLight}
            basicSetup={{ lineNumbers: false }}
            extensions={codeEditorExtensions} // JSON syntax highlighting
            onChange={(val) => handleJSONInputChange(val)}
            width="800px" // TODO: change width to be dynamic
          />
        </div>
        {jsonError && <p className="help is-danger is-small">{jsonError}</p>}
      </div>
    </>
  );
};

// Props interface
interface CustomKeySchemaFormProps {
  address: string;
  isErc725Y: boolean;
  [key: string]: any; // Using an index signature to allow any props
}

const CustomKeySchemaForm = ({
  address,
  isErc725Y,
}: CustomKeySchemaFormProps) => {
  const web3 = useWeb3();

  // States for custom schema fields
  const [customSchemaName, setCustomSchemaName] = useState<string>('');
  const [customDataKey, setCustomDataKey] = useState<string>('');
  const [customKeyType, setCustomKeyType] = useState<string>('');
  const [customValueType, setCustomValueType] = useState<string>('');
  const [customValueContent, setCustomValueContent] = useState<string>('');

  const [dataKeyError, setDataKeyError] = useState<string>('');

  // New states for JSON input mode
  const [isJSONMode, setIsJSONMode] = useState<boolean>(true);
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(SCHEMA_PLACEHOLDER, null, 2),
  );
  const [jsonError, setJsonError] = useState<string>('');

  // States for data fetching and display
  const [rawData, setRawData] = useState<string>('');
  const [decodedData, setDecodedData] = useState<string>('');

  // States for loading and error handling
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>('');

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

      // Validate and populate fields
      setCustomSchemaName(parsed.name);
      handleDataKeyChange(parsed.key); // This will validate the key format
      setCustomKeyType(parsed.keyType);
      setCustomValueType(parsed.valueType);
      setCustomValueContent(parsed.valueContent);

      setJsonError('');

      // setIsJSONMode(false); // Switch to form mode
    } catch (error) {
      setJsonError('Invalid JSON format. Please check your syntax.');
    }
  };

  // Never rewrite the text on each keypress (keep what the user typed)
  const handleJSONInputChange = (value: string) => {
    setJsonInput(value);
    if (value.trim()) {
      parseAndPopulateFromJSON(value);
    } else {
      setJsonError('');
    }
  };

  const resetForm = () => {
    setCustomSchemaName('');
    setCustomDataKey('');
    setDataKeyError('');
    setCustomKeyType('');
    setCustomValueType('');
    setCustomValueContent('');
    setJsonInput(JSON.stringify(SCHEMA_PLACEHOLDER, null, 2));
    setJsonError('');
    setIsJSONMode(true);
    setRawData('');
    setDecodedData('');
    setFetchError('');
  };

  const handleGetData = async () => {
    if (!web3 || !address || !isErc725Y) return;

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
    const { key, valueType, valueContent } = customSchema;

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
          ipfsGateway: 'https://api.ipfs.lukso.network/ipfs/',
        },
      );

      const decodedPayload = erc725js.decodeData([
        { keyName: customSchema.name, value: dataToDecode },
      ]);

      const decodedCustomValue = decodedPayload[0]?.value;

      const displayAsJSON =
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

  // Individual components

  const ManualInput = () => (
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

  return (
    <div className="p-4 has-background-light">
      {/* Header */}
      <div className="is-flex is-justify-content-space-between is-align-items-center">
        <h5 className="title is-5">
          LSP2 Schema - {isJSONMode ? 'JSON Input' : 'Form Input'}
        </h5>
        <div className="field is-grouped is-grouped-right mb-4">
          <div className="control">
            <button
              className="button is-small is-light mr-2"
              type="button"
              onClick={() => setIsJSONMode(!isJSONMode)}
            >
              {isJSONMode ? 'Switch to Manual Form' : 'Switch to JSON Input'}
            </button>
          </div>
          <div className="control">
            <button
              className="button is-small is-light"
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
            <ManualInput />
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
              !isErc725Y ||
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
        {!isErc725Y && (
          <p className="help is-warning">Contract does not support ERC725Y</p>
        )}
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
                  {customValueContent.toLowerCase()}
                </span>
              </li>
              <li>
                <strong>Decoded value: </strong>
                <pre style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                  {decodedData}
                </pre>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

CustomKeySchemaForm.displayName = 'CustomKeySchemaForm';

export default CustomKeySchemaForm;
