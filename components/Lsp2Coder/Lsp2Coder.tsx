import schemas from './utils/schemas';
import valueContents from './utils/valueContents';
import { useEffect, useState } from 'react';
import { ERC725 } from '@erc725/erc725.js';
import errorsDict from './utils/errorsDict';

interface IJSONURLEncode {
  hash: string;
  url: string;
  hashFunction: string;
}

const Lsp2Coder: React.FC = () => {
  const [valueContent, setValueContent] = useState<string>('String');
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
  const [errorMessage, setErrorMessage] = useState<string>('');

  const erc725 = new ERC725(schemas);

  const renderEncoderFields = () => {
    if (valueContent === 'JSONURL') {
      return (
        <div className="field">
          <div className="label">Encoded value</div>
          <div className="control">
            <div className="columns">
              <div className="column is-half">
                <textarea
                  className="p-1 textarea"
                  placeholder="hash"
                  value={jsonUrlDecodedValue.hash}
                  rows={6}
                  onChange={(e) => {
                    setJsonUrlDecodedValue({
                      ...jsonUrlDecodedValue,
                      hash: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="column is half">
                <textarea
                  className="p-1 textarea"
                  placeholder="url"
                  value={jsonUrlDecodedValue.url}
                  rows={6}
                  onChange={(e) => {
                    setJsonUrlDecodedValue({
                      ...jsonUrlDecodedValue,
                      url: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="field">
          <div className="label">Encoded value</div>
          <div className="control">
            <textarea
              placeholder="value"
              value={decodedValue as string}
              className="p-1 textarea is-fullwidth"
              onChange={(e) => encode(e.target.value)}
              rows={6}
            />
          </div>
        </div>
      );
    }
  };

  const renderDecoderField = () => {
    return (
      <div className="field">
        <div className="label">Decoded value</div>
        <div className="control">
          <textarea
            className="p-1 textarea"
            rows={6}
            onChange={(e) => decode(e.target.value)}
            value={encodedValue}
          />
        </div>
      </div>
    );
  };

  const resetErrors = () => {
    setDecodingError(false);
    setEncodingError(false);
  };

  useEffect(() => {
    if (jsonUrlDecodedValue.hash && jsonUrlDecodedValue.url) {
      encode(jsonUrlDecodedValue);
    }
  }, [jsonUrlDecodedValue]);

  useEffect(() => {
    if (encodingError) {
      const message = `${decodedValue} ${errorsDict[valueContent]}`;
      setErrorMessage(message);
    }
  }, [decodedValue, encodingError]);

  const encode = (val: string | IJSONURLEncode) => {
    resetErrors();
    try {
      setDecodedValue(val);
      const encoded = erc725.encodeData([
        { keyName: valueContent, value: val },
      ]);
      encoded.values[0] === '0x'
        ? setEncodedValue('')
        : setEncodedValue(encoded.values[0]);
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
      setJsonUrlDecodedValue({
        url: '',
        hash: '',
        hashFunction: 'keccak256(utf8)',
      });
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
    resetErrors();
  };

  return (
    <div className="container">
      <h2 className="title is-2 mx-3">LSP2 Encoder</h2>
      <article className="message is-info mx-3">
        <div className="message-body">
          This tool will encode or decode the values of
          <a
            href="https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#erc725y"
            className="ml-1 mr-1"
            target="_blank"
            rel="noreferrer"
          >
            ERC725Y
          </a>
          data keys following the
          <a
            href="https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md"
            className="ml-1 mr-1"
            target="_blank"
            rel="noreferrer"
          >
            LSP2 ERC725YJSONSchema
          </a>
          standardization.
        </div>
      </article>
      <article className="message mx-3">
        <div className="message-body">
          Its using the
          <a
            href="https://docs.lukso.tech/tools/erc725js/classes/ERC725#encodedata"
            target="_blank"
            rel="noreferrer"
            className="ml-1 mr-1"
          >
            encodeData
          </a>
          and
          <a
            href="https://docs.lukso.tech/tools/erc725js/classes/ERC725#decodedata"
            target="_blank"
            rel="noreferrer"
            className="ml-1 mr-1"
          >
            decodeData
          </a>
          functions of the
          <a
            href="https://www.npmjs.com/package/@erc725/erc725.js"
            target="_blank"
            rel="noreferrer"
            className="ml-1 mr-1"
          >
            erc725.js
          </a>
          library.
        </div>
      </article>
      <div className="field px-3">
        <div className="label">Select valueContent</div>
        <div className="control">
          <div className="select mb-2">
            <select onChange={setKeyName} value={valueContent}>
              {valueContents.map((valCont) => {
                return <option key={valCont}>{valCont}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
      {valueContent && (
        <div className="is-two-thirds-desktop is-half-widescreen ">
          <div className="column">
            <div className=" is-fullwidth">
              {renderEncoderFields()}
              {encodingError && (
                <div className="my-2 has-text-danger">{errorMessage}</div>
              )}
            </div>
          </div>
          <div className="column">
            {renderDecoderField()}
            {decodingError && (
              <div className="my-2 has-text-danger">Could not decode</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lsp2Coder;
