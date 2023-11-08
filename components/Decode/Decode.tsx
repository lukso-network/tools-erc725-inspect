import React, { ReactElement, useState } from 'react';
import Web3 from 'web3';
import {
  TRANSACTION_SELECTORS,
  TRANSACTION_TYPES,
} from '../../interfaces/transaction';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './Decode.module.scss';
interface Props {
  web3: Web3;
}

const Decode: React.FC<Props> = ({ web3 }) => {
  const [abiError, setABIError] = useState({ isError: false, message: '' });
  const [selector, setSelector] = useState('');
  const [payload, setPayload] = useState('');
  const [transactionType, setTransactionType] =
    useState<TRANSACTION_TYPES | null>(null);

  const handleChange = (input: string) => {
    if (input.slice(0, 2) !== '0x') {
      setABIError({
        isError: true,
        message: 'Invalid payload. Missing `0x` prefix for hexadecimal',
      });
      return;
    }

    const selector = input.slice(2, 10);
    const payload = input.slice(10);

    setSelector(selector);
    setPayload(payload);

    if (!Object.values(TRANSACTION_SELECTORS).includes(selector)) {
      setABIError({
        isError: true,
        message: 'Unrecognised ERC725 selector',
      });
      return;
    } else {
      setABIError({ isError: false, message: '' });
    }
  };

  function ShowDecoder({
    selector,
    payload,
    web3,
  }: {
    selector: string;
    payload: string;
    web3: Web3;
  }) {
    switch (selector) {
      case TRANSACTION_SELECTORS.SET_DATA: {
        setTransactionType(TRANSACTION_TYPES.SET_DATA);
        return decodeSetData(payload, web3);
      }
      case TRANSACTION_SELECTORS.SET_DATA_BATCH: {
        setTransactionType(TRANSACTION_TYPES.SET_DATA_BATCH);
        return decodeSetData(payload, web3, true);
      }
      case TRANSACTION_SELECTORS.EXECUTE: {
        setTransactionType(TRANSACTION_TYPES.EXECUTE);
        return decodeExecute(payload, web3);
      }
      case TRANSACTION_SELECTORS.TRANSFER_OWNERSHIP: {
        setTransactionType(TRANSACTION_TYPES.TRANSFER_OWNERSHIP);
        return decodeTransferOwnership(payload, web3);
      }
    }

    return null;
  }

  return (
    <div className="container">
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <textarea
            className="textarea"
            placeholder="Paste your ABI here..."
            onChange={(e) => handleChange(e.target.value as string)}
          />
        </div>

        <div>
          {abiError.isError ? (
            <ErrorMessage
              header="Input Error"
              message={abiError.message}
            ></ErrorMessage>
          ) : (
            ''
          )}
        </div>

        <div className={styles.gridItem}>
          <span
            className={`tag is-medium m-2 ${
              transactionType === TRANSACTION_TYPES.SET_DATA ? 'is-primary' : ''
            }`}
          >
            setData
          </span>
          <span
            className={`tag is-medium m-2 ${
              transactionType === TRANSACTION_TYPES.SET_DATA_BATCH
                ? 'is-primary'
                : ''
            }`}
          >
            setDataBatch
          </span>
          <span
            className={`tag is-medium m-2 ${
              transactionType === TRANSACTION_TYPES.EXECUTE ? 'is-primary' : ''
            }`}
          >
            execute
          </span>
          <span
            className={`tag is-medium m-2 ${
              transactionType === TRANSACTION_TYPES.TRANSFER_OWNERSHIP
                ? 'is-primary'
                : ''
            }`}
          >
            transferOwnership
          </span>
        </div>

        <div className={styles.gridItem}>
          {!abiError.isError && payload.length > 0 ? (
            <ShowDecoder selector={selector} payload={payload} web3={web3} />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

const decodeTransferOwnership = (payload: string, web3: Web3) => {
  try {
    const result = web3.eth.abi.decodeParameters(['address'], payload);
    return (
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <div className="notification is-danger m-2">
            This payload will transfer ownership to {result[0]}.<br /> Be
            cautious!
          </div>
        </div>
        <div className={styles.gridItem}>
          <div>
            <label>New Owner</label>
            <input
              type="text"
              className="input m-2"
              placeholder="0x..."
              value={result[0]}
              readOnly
            />
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div className={styles.gridItem}>
        <ErrorMessage header="ABI Decoder Error!" message={error.message} />
      </div>
    );
  }
};

const decodeSetData = (payload: string, web3: Web3, isBatch = false) => {
  try {
    const result = isBatch
      ? web3.eth.abi.decodeParameters(['bytes32[]', 'bytes[]'], payload)
      : web3.eth.abi.decodeParameters(['bytes32', 'bytes'], payload);

    const keys = isBatch ? result[0] : [result[0]];
    const values = isBatch ? result[1] : [result[1]];

    return (
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>Keys</div>
        <div className={styles.gridItem}>Values</div>
        {keys.map((key: string, index: number) => (
          <React.Fragment key={index}>
            <div className={styles.gridItem}>
              <input type="text" className="input m-2" value={key} readOnly />
            </div>
            <div className={styles.gridItem}>
              <input
                type="text"
                className="input m-2"
                value={values[index]}
                readOnly
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  } catch (error: any) {
    return (
      <div className={styles.gridItem}>
        <ErrorMessage header="ABI Decoder Error!" message={error.message} />
      </div>
    );
  }
};

const decodeExecute = (payload: string, web3: Web3): ReactElement | null => {
  try {
    const result = web3.eth.abi.decodeParameters(
      ['uint256', 'address', 'uint256', 'bytes'],
      payload,
    );
    return (
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <label>Operation</label>
          <input type="text" className="input m-2" value={result[0]} readOnly />
        </div>
        <div className={styles.gridItem}>
          <label>Recipient</label>
          <input type="text" className="input m-2" value={result[1]} readOnly />
        </div>
        <div className={styles.gridItem}>
          <label>Amount</label>
          <input type="text" className="input m-2" value={result[2]} readOnly />
        </div>
        <div className={styles.gridItem}>
          <label>Data</label>
          <input
            type="text"
            className="input m-2"
            placeholder="0x..."
            value={result[3]}
            readOnly
          />
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div className={styles.gridItem}>
        <ErrorMessage header="ABI Decoder Error!" message={error.message} />
      </div>
    );
  }
};

export default Decode;
