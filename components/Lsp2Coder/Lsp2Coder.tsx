import schemas from './utils/schemas';
import valueContents from './utils/valueContents';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { ERC725 } from '@erc725/erc725.js';
import errorsDict from './utils/errorsDict';
import { LSP_SPECS_URL } from '@/constants/links';

interface IVerifiableURIEncode {
  verification: {
    method: string;
    data: string;
    source: string;
  };
  url: string;
}

const Lsp2Coder: React.FC = () => {
  const [valueContent, setValueContent] = useState<string>('String');
  const [encodedValue, setEncodedValue] = useState<string>('');
  const [decodedValue, setDecodedValue] = useState<
    string | IVerifiableURIEncode
  >('');
  const [verifiableUriDecodedValue, setverifiableUriDecodedValue] =
    useState<IVerifiableURIEncode>({
      verification: {
        method: '',
        data: '',
        source: '',
      },
      url: '',
    });
  const [encodingError, setEncodingError] = useState<boolean>(false);
  const [decodingError, setDecodingError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const erc725 = useMemo(() => {
    return new ERC725(schemas);
  }, []);

  const renderEncoderFields = () => {
    if (valueContent === 'VerifiableURI') {
      return (
        <div className="field mt-2">
          <div className="label">Encoded value</div>
          <div className="control">
            <div className="columns">
              <div className="column is-half">
                <textarea
                  className="textarea is-fullwidth"
                  placeholder="hash"
                  value={verifiableUriDecodedValue.verification.data}
                  rows={6}
                  onChange={(e) => {
                    setverifiableUriDecodedValue({
                      ...verifiableUriDecodedValue,
                      verification: {
                        ...verifiableUriDecodedValue.verification,
                        data: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="column is-half">
                <textarea
                  className="textarea is-fullwidth"
                  placeholder="url"
                  value={verifiableUriDecodedValue.url}
                  rows={6}
                  onChange={(e) => {
                    setverifiableUriDecodedValue({
                      ...verifiableUriDecodedValue,
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
        <div className="field mt-2">
          <div className="label">Encoded value</div>
          <div className="control">
            <textarea
              placeholder="value"
              value={decodedValue as string}
              className="textarea is-fullwidth"
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
      <div className="field mt-2">
        <div className="label">Decoded value</div>
        <div className="control">
          <textarea
            className="textarea"
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

  const encode = useCallback(
    (val: string | IVerifiableURIEncode) => {
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
    },
    [erc725, valueContent],
  );

  useEffect(() => {
    if (
      verifiableUriDecodedValue.verification.data &&
      verifiableUriDecodedValue.url
    ) {
      encode(verifiableUriDecodedValue);
    }
  }, [verifiableUriDecodedValue, encode]);

  useEffect(() => {
    if (encodingError) {
      const message = `${decodedValue} ${errorsDict[valueContent]}`;
      setErrorMessage(message);
    }
  }, [decodedValue, encodingError, valueContent]);

  const decode = (val: string) => {
    resetErrors();
    try {
      setEncodedValue(val);
      const decoded = erc725.decodeData([
        { keyName: valueContent, value: val },
      ]);
      valueContent != 'VerifiableURI'
        ? setDecodedValue(decoded[0].value)
        : setverifiableUriDecodedValue({
            url: decoded[0].value.url,
            verification: decoded[0].value.verification,
          });
    } catch (error) {
      setDecodedValue('');
      setverifiableUriDecodedValue({
        url: '',
        verification: {
          method: 'keccak256(utf8)',
          data: '',
          source: '',
        },
      });
      setDecodingError(true);
    }
  };

  const resetValues = () => {
    setDecodedValue('');
    setEncodedValue('');
    setverifiableUriDecodedValue({
      url: '',
      verification: {
        method: 'keccak256(utf8)',
        data: '',
        source: '',
      },
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
      <h2 className="title is-2">Metadata Encoder</h2>
      <article className="message is-info">
        <div className="message-body">
          Encode or decode the values of
          <a
            href="https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#erc725y"
            className="mx-1"
            target="_blank"
            rel="noreferrer"
          >
            ERC725Y
          </a>
          data keys following the
          <a
            href={LSP_SPECS_URL.LSP2}
            className="mx-1"
            target="_blank"
            rel="noreferrer"
          >
            LSP2 ERC725YJSONSchema
          </a>
          standardization.
        </div>
      </article>
      <article className="message">
        <div className="message-body">
          It&lsquo;s using the
          <a
            href="https://docs.lukso.tech/tools/erc725js/classes/ERC725#encodedata"
            target="_blank"
            rel="noreferrer"
            className="mx-1"
          >
            encodeData
          </a>
          and
          <a
            href="https://docs.lukso.tech/tools/erc725js/classes/ERC725#decodedata"
            target="_blank"
            rel="noreferrer"
            className="mx-1"
          >
            decodeData
          </a>
          functions of the
          <a
            href="https://www.npmjs.com/package/@erc725/erc725.js"
            target="_blank"
            rel="noreferrer"
            className="mx-1"
          >
            erc725.js
          </a>
          library.
        </div>
      </article>
      <div className="field">
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
          <div>
            <div className=" is-fullwidth">
              {renderEncoderFields()}
              {encodingError && (
                <div className="my-2 has-text-danger">{errorMessage}</div>
              )}
            </div>
          </div>
          <div>
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
