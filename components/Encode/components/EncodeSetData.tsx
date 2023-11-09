import { useState } from 'react';
import Web3 from 'web3';
import EncodedPayload from './EncodedPayload';
import ERC725Account from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';
import ErrorMessage from '../../ErrorMessage';
import { AbiItem } from 'web3-utils';
import styles from './EncodeSetData.module.scss';

interface Props {
  web3: Web3;
  isBatch: boolean;
}

const EncodeSetData: React.FC<Props> = ({ web3, isBatch }) => {
  const [encodedPayload, setEncodedPayload] = useState('');
  const [keyValuePairs, setKeyValuePairs] = useState<
    { key: string; value: string }[]
  >([{ key: '', value: '' }]);
  const [encodingError, setEncodingError] = useState({
    isError: false,
    message: '',
  });

  const createInputs = (keyValuePairs: { key: string; value: string }[]) => {
    return keyValuePairs.map(
      (keyValuePair: { key: string; value: string }, index) => {
        return (
          <div
            className={`columns is-vcentered ${styles.keyValueBox}`}
            key={index}
          >
            {isBatch ? (
              <div className="column is-1">
                <button
                  className={`delete is-large ${styles.closeButton}`}
                  onClick={removeKeyValue.bind(this, index)}
                >
                  Remove
                </button>
              </div>
            ) : (
              ''
            )}
            <div className="column">
              <div className={styles.inputContainer}>
                <label className={styles.inputDescription}>Key</label>
                <input
                  type="text"
                  id="key"
                  className="input mb-2 is-fullwidth"
                  value={keyValuePair.key}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.inputDescription}>Value</label>
                <input
                  type="text"
                  id="value"
                  className="input mb-2 is-fullwidth"
                  value={keyValuePair.value}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
            </div>
          </div>
        );
      },
    );
  };

  const addKeyValue = () => {
    setKeyValuePairs([...keyValuePairs, { key: '', value: '' }]);
  };

  const removeKeyValue = (index: number) => {
    const values = [...keyValuePairs];
    values.splice(index, 1);
    setKeyValuePairs(values);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newKeyValuePairs = [...keyValuePairs];

    const id: string = event.target.id;

    if (!(id in newKeyValuePairs[0])) {
      return;
    }

    newKeyValuePairs[index][id] = event.target.value;

    setKeyValuePairs(newKeyValuePairs);
  };

  const encodeABI = () => {
    const erc725Account = new web3.eth.Contract(ERC725Account.abi as AbiItem[]);

    const keys = keyValuePairs.map((keyValuePair) => {
      return keyValuePair.key;
    });

    const values = keyValuePairs.map((keyValuePair) => {
      return keyValuePair.value;
    });

    try {
      setEncodedPayload(
        isBatch
          ? erc725Account.methods.setDataBatch(keys, values).encodeABI()
          : erc725Account.methods.setData(keys[0], values[0]).encodeABI(),
      );

      setEncodingError({ isError: false, message: '' });
    } catch (error: any) {
      setEncodingError({ isError: true, message: error.message });
    }
  };

  return (
    <>
      {createInputs(keyValuePairs)}
      {isBatch ? (
        <div className="columns">
          <div className="column">
            <button
              className={`button is-link ${styles.buttonWidth}`}
              onClick={addKeyValue}
            >
              Add Key
            </button>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="columns">
        <div className="column">
          <button
            className={`button is-primary ${styles.buttonWidth}`}
            onClick={encodeABI}
          >
            Encode ABI
          </button>

          {encodedPayload && !encodingError.isError ? (
            <EncodedPayload encodedPayload={encodedPayload} />
          ) : null}
          {encodingError.isError ? (
            <ErrorMessage
              header="ABI Encoding Error"
              message={encodingError.message}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default EncodeSetData;
