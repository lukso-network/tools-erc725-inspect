import React, { ReactElement, useState } from 'react';
import { TRANSACTION_TYPES } from '@/types/transaction';
import { TRANSACTION_SELECTORS } from '@/constants/selectors';
import { decodeAbiParameters, type Hex } from 'viem';

import ErrorMessage from '@/components/ui/ErrorMessage';
import styles from './Decode.module.scss';

interface MethodProps {
  text: string;
  link: string;
  focus: boolean;
}

const Method: React.FC<MethodProps> = ({ focus, link, text }) => (
  <span className={`tag is-medium mb-2 mr-2 ${focus ? 'is-primary' : ''}`}>
    {text}
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="ml-2 has-text-info-dark"
    >
      ↗
    </a>
  </span>
);

const Decode: React.FC = () => {
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
  }: {
    selector: string;
    payload: string;
  }) {
    switch (selector) {
      case TRANSACTION_SELECTORS.SET_DATA: {
        setTransactionType(TRANSACTION_TYPES.SET_DATA);
        return decodeSetData(payload);
      }
      case TRANSACTION_SELECTORS.SET_DATA_BATCH: {
        setTransactionType(TRANSACTION_TYPES.SET_DATA_BATCH);
        return decodeSetData(payload, true);
      }
      case TRANSACTION_SELECTORS.EXECUTE: {
        setTransactionType(TRANSACTION_TYPES.EXECUTE);
        return decodeExecute(payload);
      }
      case TRANSACTION_SELECTORS.EXECUTE_BATCH: {
        setTransactionType(TRANSACTION_TYPES.EXECUTE_BATCH);
      }
      case TRANSACTION_SELECTORS.TRANSFER_OWNERSHIP: {
        setTransactionType(TRANSACTION_TYPES.TRANSFER_OWNERSHIP);
        return decodeTransferOwnership(payload);
      }
      case TRANSACTION_SELECTORS.ACCEPT_OWNERSHIP: {
        setTransactionType(TRANSACTION_TYPES.ACCEPT_OWNERSHIP);
        return decodeAcceptOwnership();
      }
      case TRANSACTION_SELECTORS.RENOUNCE_OWNERSHIP: {
        setTransactionType(TRANSACTION_TYPES.RENOUNCE_OWNERSHIP);
        return decodeRenounceOwnership();
      }
    }

    return null;
  }

  return (
    <div className="container">
      <div className="mb-2">
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

      <div className="mb-2">
        <Method
          text="setData"
          focus={transactionType == TRANSACTION_TYPES.SET_DATA}
          link="https://docs.lukso.tech/contracts/contracts/ERC725/#setdata"
        />
        <Method
          text="setDataBatch"
          focus={transactionType == TRANSACTION_TYPES.SET_DATA_BATCH}
          link="https://docs.lukso.tech/contracts/contracts/ERC725/#setdatabatch"
        />
        <Method
          text="execute"
          focus={transactionType == TRANSACTION_TYPES.EXECUTE}
          link="https://docs.lukso.tech/contracts/contracts/ERC725/#execute"
        />
        <Method
          text="executeBatch"
          focus={transactionType == TRANSACTION_TYPES.EXECUTE}
          link="https://docs.lukso.tech/contracts/contracts/ERC725/#execute"
        />
        <Method
          text="transferOwnership"
          focus={transactionType == TRANSACTION_TYPES.TRANSFER_OWNERSHIP}
          link="https://eips.ethereum.org/EIPS/eip-173"
        />
        <Method
          text="acceptOwnership"
          focus={transactionType == TRANSACTION_TYPES.ACCEPT_OWNERSHIP}
          link="#"
        />
        <Method
          text="renounceOwnership"
          focus={transactionType == TRANSACTION_TYPES.RENOUNCE_OWNERSHIP}
          link="#"
        />
      </div>

      <div className="mb-2">
        {!abiError.isError && payload.length > 0 ? (
          <ShowDecoder selector={selector} payload={payload} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

const decodeTransferOwnership = (payload: string) => {
  try {
    const result = decodeAbiParameters([{ type: 'address' }], `0x${payload}`);
    const newOwner = result[0];
    return (
      <div>
        <div className="mb-2">
          <div className="notification is-danger m-2">
            This payload will transfer ownership to {newOwner}.<br /> Be
            cautious!
          </div>
        </div>
        <div className="mb-2">
          <div className={styles.inputContainer}>
            <label className={styles.inputDescription}>New Owner</label>
            <input
              type="text"
              className="input m-2"
              placeholder="0x..."
              value={newOwner}
              readOnly
            />
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="mb-2">
        <ErrorMessage header="ABI Decoder Error!" message={error.message} />
      </div>
    );
  }
};

const decodeAcceptOwnership = () => {
  return (
    <div className="mb-2">
      <div className="notification is-danger m-2">
        This payload is for the function <code>acceptOwnership()</code>. The
        caller address will become the contract <code>owner()</code>
      </div>
    </div>
  );
};

const decodeRenounceOwnership = () => {
  return (
    <div className="mb-2">
      <div className="notification is-danger m-2">
        This payload is for the function <code>renouceOwnership()</code>.
      </div>
    </div>
  );
};

const decodeSetData = (payload: string, isBatch = false) => {
  try {
    const result = isBatch
      ? decodeAbiParameters(
          [{ type: 'bytes32[]' }, { type: 'bytes[]' }],
          `0x${payload}`,
        )
      : decodeAbiParameters(
          [{ type: 'bytes32' }, { type: 'bytes' }],
          `0x${payload}`,
        );


    const keys = (isBatch ? result[0] : [result[0]]) as readonly Hex[];
    const values = (isBatch ? result[1] : [result[1]]) as readonly Hex[];

    return (
      <div>
        <div className="mb-2">Keys</div>
        <div className="mb-2">Values</div>
        {keys.map((key, index) => (
          <React.Fragment key={index}>
            <div className="mb-2">
              <input type="text" className="input m-2" value={key} readOnly />
            </div>
            <div className="mb-2">
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
      <div className="mb-2">
        <ErrorMessage header="ABI Decoder Error!" message={error.message} />
      </div>
    );
  }
};

const decodeExecute = (payload: string): ReactElement | null => {
  try {
    const result = decodeAbiParameters(
      [
        { type: 'uint256' },
        { type: 'address' },
        { type: 'uint256' },
        { type: 'bytes' },
      ],
      `0x${payload}`,
    );
    return (
      <div>
        <div className="mb-2">
          <label className={styles.inputDescription}>Operation</label>
          <input
            type="text"
            className="input m-2"
            value={result[0].toString()}
            readOnly
          />
        </div>
        <div className={`mb-2 ${styles.inputContainer}`}>
          <label className={styles.inputDescription}>Recipient</label>
          <input type="text" className="input m-2" value={result[1]} readOnly />
        </div>
        <div className={`mb-2 ${styles.inputContainer}`}>
          <label className={styles.inputDescription}>Amount</label>
          <input
            type="text"
            className="input m-2"
            value={result[2].toString()}
            readOnly
          />
        </div>
        <div className={`mb-2 ${styles.inputContainer}`}>
          <label className={styles.inputDescription}>Data</label>
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
      <div className="mb-2">
        <ErrorMessage header="ABI Decoder Error!" message={error.message} />
      </div>
    );
  }
};

export default Decode;
