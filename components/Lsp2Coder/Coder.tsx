import schemas from './utils/schemas';
import valueContents from './utils/valueContents';
import { useState } from 'react';
import { ERC725 } from '@erc725/erc725.js';
import styles from './styles/Encode.module.scss';

interface IJSONURLEncode {
  hash: string;
  url: string;
  hashFunction: string;
}

const Encode: React.FC = () => {
  const [valueContent, setValueContent] = useState<string>('');
  const [encodedValue, setEncodedValue] = useState<string>('');
  const [decodedValue, setDecodedValue] = useState<string | IJSONURLEncode>('');
  const [jsonUrlDecodedValue, setJsonUrlDecodedValue] =
    useState<IJSONURLEncode>({
      url: '',
      hash: '',
      hashFunction: 'keccak256(utf8)',
    });
  const [encodingError, setEncodingError] = useState<boolean>(false);
  const [decodingError, setDecodingError] = useState<boolean>(false);

  const erc725 = new ERC725(schemas);

  const renderEncoderFields = () => {
    if (valueContent === 'JSONURL') {
      return (
        <div className="is-flex is-flex-direction-column">
          <textarea
            className="p-1 mb-2"
            placeholder="hash"
            value={jsonUrlDecodedValue.hash}
            onChange={(e) => {
              setJsonUrlDecodedValue({
                ...jsonUrlDecodedValue,
                hash: e.target.value,
              });
              jsonUrlDecodedValue.url && encode(jsonUrlDecodedValue);
            }}
          />
          <textarea
            className="p-1"
            placeholder="url"
            value={jsonUrlDecodedValue.url}
            onChange={(e) => {
              setJsonUrlDecodedValue({
                ...jsonUrlDecodedValue,
                url: e.target.value,
              });
              jsonUrlDecodedValue.hash && encode(jsonUrlDecodedValue);
            }}
          />
        </div>
      );
    } else {
      return (
        <textarea
          placeholder="value"
          value={decodedValue as string}
          className="p-1"
          onChange={(e) => encode(e.target.value)}
        />
      );
    }
  };

  const renderDecoderField = () => {
    return (
      <textarea
        className="p-2"
        onChange={(e) => decode(e.target.value)}
        value={encodedValue}
      />
    );
  };

  const resetErrors = () => {
    setDecodingError(false);
    setEncodingError(false);
  };

  const encode = (val: string | IJSONURLEncode) => {
    resetErrors();
    try {
      setDecodedValue(val);
      const encoded = erc725.encodeData([
        { keyName: valueContent, value: val },
      ]);
      setEncodedValue(encoded.values[0]);
    } catch (error) {
      setEncodingError(true);
      setEncodedValue('');
    }
  };

  const decode = (val: string) => {
    resetErrors();
    try {
      setEncodedValue(val);
      const decoded = erc725.decodeData([
        { keyName: valueContent, value: val },
      ]);
      valueContent != 'JSONURL'
        ? setDecodedValue(decoded[0].value)
        : setJsonUrlDecodedValue({
            url: decoded[0].value.url,
            hash: decoded[0].value.hash,
            hashFunction: 'keccak256(utf8)',
          });
    } catch (error) {
      setDecodedValue('');
      setDecodingError(true);
    }
  };

  const resetValues = () => {
    setDecodedValue('');
    setEncodedValue('');
    setJsonUrlDecodedValue({
      url: '',
      hash: '',
      hashFunction: 'keccak256(utf8)',
    });
  };

  const setKeyName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valContent = e.target.value;
    setValueContent(valContent);
    resetValues();
  };

  return (
    <div className={styles.main}>
      <article className="message is-info">
        <div className="message-body">
          This tool will encode/decode values following the
          <a
            href="https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md"
            className="ml-1"
          >
            LSP2 ERC725YJSONSchema
          </a>
          .
        </div>
      </article>
      <div className="select my-2">
        <select onChange={setKeyName}>
          <option>Select valueContent</option>
          {valueContents.map((valCont) => {
            return (
              <option key={valCont} value={valCont}>
                {valCont}
              </option>
            );
          })}
        </select>
      </div>
      {valueContent && (
        <div className="is-flex">
          <div className="mr-6">
            <div className="mt-4 mb-2">Encoder</div>
            {renderEncoderFields()}
            {encodingError && (
              <div className="my-2 has-text-danger">Wrong value</div>
            )}
          </div>
          <div className="">
            <div className="mt-4 mb-2">Decoder</div>
            {renderDecoderField()}
            {decodingError && (
              <div className="my-2 has-text-danger">Wrong value</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Encode;
