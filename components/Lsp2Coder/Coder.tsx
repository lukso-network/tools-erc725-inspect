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
  const [errorMessage, setErrorMessage] = useState<string>('');

  const erc725 = new ERC725(schemas);

  const renderEncoderFields = () => {
    if (valueContent === 'JSONURL') {
      return (
        <div className="">
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
      );
    } else {
      return (
        <textarea
          placeholder="value"
          value={decodedValue as string}
          className="p-1  textarea is-fullwidth"
          onChange={(e) => encode(e.target.value)}
          rows={6}
        />
      );
    }
  };

  const renderDecoderField = () => {
    return (
      <textarea
        className="p-1 textarea"
        rows={6}
        onChange={(e) => decode(e.target.value)}
        value={encodedValue}
      />
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
    <div>
      <article className="message is-info mx-3">
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
      <div className="select my-2 px-3">
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
        <div className="is-two-thirds-desktop is-half-widescreen ">
          <div className="column">
            <div className=" is-fullwidth">
              <div className="mt-4 mb-2 ">Encoder</div>
              {renderEncoderFields()}
              {encodingError && (
                <div className="my-2 has-text-danger">{errorMessage}</div>
              )}
            </div>
          </div>
          <div className="column">
            <div className="mt-4 mb-2 ">Decoder</div>
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

export default Encode;
