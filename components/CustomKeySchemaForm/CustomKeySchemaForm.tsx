import React, { useState } from 'react';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import { isValidTuple } from '@erc725/erc725.js/build/main/src/lib/decodeData';
import { getData } from '@/utils/web3';
import useWeb3 from '@/hooks/useWeb3';

// Props interface
interface CustomKeySchemaFormProps {
  address: string;
  isErc725Y: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Using an index signature to allow any props
}

const CustomKeySchemaForm = (props: CustomKeySchemaFormProps) => {
  const { address, isErc725Y } = props;
  const web3 = useWeb3();

  const [customSchemaName, setCustomSchemaName] = useState<string>('');
  const [dataKeyValue, setDataKeyValue] = useState<string>('');
  const [dataKeyError, setDataKeyError] = useState<string>('');
  const [customKeyType, setCustomKeyType] = useState<string>('');
  const [customValueType, setCustomValueType] = useState<string>('');
  const [customValueContent, setCustomValueContent] = useState<string>('');

  // New states for JSON input mode
  const [isJSONMode, setIsJSONMode] = useState<boolean>(true);
  const [jsonInput, setJsonInput] = useState<string>('');
  const [jsonError, setJsonError] = useState<string>('');

  // States for data fetching and display
  const [rawData, setRawData] = useState<string>('');
  const [decodedData, setDecodedData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>('');

  const handleDataKeyValueChange = (value: string) => {
    let inputKey = value;
    let error = '';

    if (inputKey.length > 0) {
      if (inputKey.slice(0, 2) !== '0x') {
        if (inputKey.length === 64 && /^[0-9a-fA-F]+$/.test(inputKey)) {
          inputKey = `0x${inputKey}`;
        } else {
          error =
            'Data Key must be a 66-character hex string (starting with 0x) or a 64-character hex string (0x will be auto-prefixed).';
        }
      } else if (inputKey.length !== 66) {
        error =
          'Data Key must be a 66-character hex string (starting with 0x).';
      }

      if (
        error === '' &&
        inputKey.length === 66 &&
        !/^(0x)[0-9a-fA-F]{64}$/.test(inputKey)
      ) {
        error = 'Invalid hex characters in Data Key.';
      }
    } else {
      error = 'Key Value cannot be empty.'; // Error if empty
    }

    setDataKeyValue(inputKey);
    setDataKeyError(error);
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
      handleDataKeyValueChange(parsed.key); // This will validate the key format
      setCustomKeyType(parsed.keyType);
      setCustomValueType(parsed.valueType);
      setCustomValueContent(parsed.valueContent);

      setJsonError('');
      setIsJSONMode(false); // Switch to form mode
    } catch (error) {
      setJsonError('Invalid JSON format. Please check your syntax.');
    }
  };

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
    setDataKeyValue('');
    setDataKeyError('');
    setCustomKeyType('');
    setCustomValueType('');
    setCustomValueContent('');
    setJsonInput('');
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

    const adHocSchema = customSchemaResult.schema;
    const keyFromCustomForm = adHocSchema.key;

    try {
      const dataToDecode = await getData(address, keyFromCustomForm, web3);

      if (!dataToDecode) {
        setRawData('0x');
        setDecodedData('No data found for this custom key');
        setIsLoading(false);
        return;
      }

      setRawData(dataToDecode);

      // Create temporary ERC725 instance with the custom schema
      const tempErc725 = new ERC725(
        [adHocSchema],
        address,
        web3?.currentProvider,
        {
          ipfsGateway: 'https://api.ipfs.lukso.network/ipfs/',
        },
      );

      const decodedPayload = tempErc725.decodeData([
        { keyName: adHocSchema.name, value: dataToDecode },
      ]);

      const decodedCustomValue = decodedPayload[0]?.value;

      const decodedResult =
        adHocSchema.valueContent === 'VerifiableURI' ||
        isValidTuple(adHocSchema.valueType, adHocSchema.valueContent)
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
    if (!dataKeyValue) {
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

    const adHocSchema: ERC725JSONSchema = {
      name: customSchemaName,
      key: dataKeyValue,
      keyType: customKeyType,
      valueType: customValueType,
      valueContent: customValueContent,
    };
    return { schema: adHocSchema, error: undefined };
  };

  return (
    <div className="mt-4 p-4 has-background-light">
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

      {isJSONMode ? (
        <>
          <h5 className="title is-5">Custom Key Schema - JSON Input</h5>
          <div className="field">
            <label className="label is-small">
              Paste your ERC725JSONSchema JSON here:
            </label>
            <div className="control">
              <textarea
                className={`textarea ${jsonError ? 'is-danger' : ''}`}
                rows={8}
                placeholder={`{
  "name": "MyCustomKey",
  "key": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "keyType": "Singleton",
  "valueType": "bytes",
  "valueContent": "Bytes"
}`}
                value={jsonInput}
                onChange={(e) => handleJSONInputChange(e.target.value)}
              />
            </div>
            {jsonError && (
              <p className="help is-danger is-small">{jsonError}</p>
            )}
            {!jsonError && !jsonInput && (
              <p className="help is-info is-small">
                Enter a valid ERC725JSONSchema JSON object with fields: name,
                key, keyType, valueType, valueContent
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <h5 className="title is-5">Custom Key Schema - Form View</h5>
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
            <label className="label is-small">Key Value (Data Key)</label>
            <div className="control">
              <input
                className={`input is-small ${dataKeyError ? 'is-danger' : ''}`}
                type="text"
                placeholder="0x... (e.g., 0x123...abc)"
                value={dataKeyValue}
                onChange={(e) => handleDataKeyValueChange(e.target.value)}
              />
            </div>
            {dataKeyError && (
              <p className="help is-danger is-small">{dataKeyError}</p>
            )}
            {!dataKeyError && dataKeyValue === '' && (
              <p className="help is-info is-small">
                Enter the specific ERC725Y data key (bytes32 hex string).
              </p>
            )}
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
              Refer to{' '}
              <a
                href="https://docs.lukso.tech/standards/metadata/lsp2-json-schema#data-key-types"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>LSP2 `keyType` specification</strong>
              </a>
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
              Refer to{' '}
              <a
                href="https://docs.lukso.tech/standards/metadata/lsp2-json-schema#valuetype-encoding"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>LSP2 `valueType` specification</strong>
              </a>
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
              Refer to{' '}
              <a
                href="https://docs.lukso.tech/standards/metadata/lsp2-json-schema#valuetype-encoding"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>LSP2 `valueContent` specification</strong>
              </a>
            </p>
          </div>
        </>
      )}

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
                  !dataKeyValue ||
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
                <strong>Key:</strong> <code>{dataKeyValue}</code>
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
