import React, { useState } from 'react';
import Web3 from 'web3';

import EncodeExecute from './components/EncodeExecute';
import EncodeSetData from './components/EncodeSetData';
import EncodeTransferOwnership from './components/EncodeTransferOwnership';
import styles from './Encode.module.scss';

import {
  TRANSACTION_PARAMETERS,
  TRANSACTION_SELECTORS,
  TRANSACTION_TYPES,
} from '../../interfaces/transaction';
import EncodedPayload from './components/EncodedPayload';

interface Props {
  web3: Web3;
}

const DEFAULT_TRANSACTION_TYPE = TRANSACTION_TYPES.SET_DATA;

const Encode: React.FC<Props> = ({ web3 }) => {
  const [mode, setMode] = useState(DEFAULT_TRANSACTION_TYPE);

  return (
    <>
      <div className="columns">
        <div className="column">
          <p className="mb-2">Transaction Type</p>
          <div className="control">
            <label className={`radio ${styles.radioLabel}`}>
              <input
                type="radio"
                className={styles.radioInput}
                value={TRANSACTION_TYPES.SET_DATA}
                checked={mode === TRANSACTION_TYPES.SET_DATA}
                onChange={() => setMode(TRANSACTION_TYPES.SET_DATA)}
              />
              setData
              <a
                href="https://docs.lukso.tech/contracts/contracts/ERC725/#setdata"
                target="_blank"
                rel="noreferrer"
                className="ml-2 has-text-info-dark"
              >
                ↗
              </a>
            </label>

            <label className={`radio ${styles.radioLabel}`}>
              <input
                type="radio"
                className={styles.radioInput}
                value={TRANSACTION_TYPES.SET_DATA_BATCH}
                checked={mode === TRANSACTION_TYPES.SET_DATA_BATCH}
                onChange={() => setMode(TRANSACTION_TYPES.SET_DATA_BATCH)}
              />
              setDataBatch
              <a
                href="https://docs.lukso.tech/contracts/contracts/ERC725/#setdatabatch"
                target="_blank"
                rel="noreferrer"
                className="ml-2 has-text-info-dark"
              >
                ↗
              </a>
            </label>

            <label className={`radio ${styles.radioLabel}`}>
              <input
                type="radio"
                className={styles.radioInput}
                value={TRANSACTION_TYPES.EXECUTE}
                checked={mode === TRANSACTION_TYPES.EXECUTE}
                onChange={() => setMode(TRANSACTION_TYPES.EXECUTE)}
              />
              execute
              <a
                href="https://docs.lukso.tech/contracts/contracts/ERC725/#execute"
                target="_blank"
                rel="noreferrer"
                className="ml-2 has-text-info-dark"
              >
                ↗
              </a>
            </label>

            <label className={`radio ${styles.radioLabel}`}>
              <input
                type="radio"
                className={styles.radioInput}
                value={TRANSACTION_TYPES.EXECUTE_BATCH}
                checked={mode === TRANSACTION_TYPES.EXECUTE_BATCH}
                onChange={() => setMode(TRANSACTION_TYPES.EXECUTE_BATCH)}
              />
              executeBatch
              <a
                href="https://docs.lukso.tech/contracts/contracts/ERC725/#executebatch"
                target="_blank"
                rel="noreferrer"
                className="ml-2 has-text-info-dark"
              >
                ↗
              </a>
            </label>

            <label className={`radio ${styles.radioLabel}`}>
              <input
                type="radio"
                className={styles.radioInput}
                value={TRANSACTION_TYPES.TRANSFER_OWNERSHIP}
                checked={mode === TRANSACTION_TYPES.TRANSFER_OWNERSHIP}
                onChange={() => setMode(TRANSACTION_TYPES.TRANSFER_OWNERSHIP)}
              />
              transferOwnership
              <a
                href="https://eips.ethereum.org/EIPS/eip-173"
                target="_blank"
                rel="noreferrer"
                className="ml-2 has-text-info-dark"
              >
                ↗
              </a>
            </label>

            <label className={`radio ${styles.radioLabel}`}>
              <input
                type="radio"
                className={styles.radioInput}
                value={TRANSACTION_TYPES.ACCEPT_OWNERSHIP}
                checked={mode === TRANSACTION_TYPES.ACCEPT_OWNERSHIP}
                onChange={() => setMode(TRANSACTION_TYPES.ACCEPT_OWNERSHIP)}
              />
              acceptOwnership
              <a
                href="https://eips.ethereum.org/EIPS/eip-173"
                target="_blank"
                rel="noreferrer"
                className="ml-2 has-text-info-dark"
              >
                ↗
              </a>
            </label>

            <label className={`radio ${styles.radioLabel}`}>
              <input
                type="radio"
                className={styles.radioInput}
                value={TRANSACTION_TYPES.RENOUNCE_OWNERSHIP}
                checked={mode === TRANSACTION_TYPES.RENOUNCE_OWNERSHIP}
                onChange={() => setMode(TRANSACTION_TYPES.RENOUNCE_OWNERSHIP)}
              />
              renounceOwnership
              <a
                href="https://eips.ethereum.org/EIPS/eip-173"
                target="_blank"
                rel="noreferrer"
                className="ml-2 has-text-info-dark"
              >
                ↗
              </a>
            </label>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          {mode === TRANSACTION_TYPES.SET_DATA ? (
            <EncodeSetData web3={web3} isBatch={false} />
          ) : null}
          {mode === TRANSACTION_TYPES.SET_DATA_BATCH ? (
            <EncodeSetData web3={web3} isBatch={true} />
          ) : null}
          {mode === TRANSACTION_TYPES.EXECUTE ? (
            <EncodeExecute web3={web3} isBatch={false} />
          ) : null}
          {mode === TRANSACTION_TYPES.EXECUTE_BATCH ? (
            <EncodeExecute web3={web3} isBatch={true} />
          ) : null}
          {mode === TRANSACTION_TYPES.TRANSFER_OWNERSHIP ? (
            <EncodeTransferOwnership web3={web3} />
          ) : null}
          {mode === TRANSACTION_TYPES.ACCEPT_OWNERSHIP ? (
            <EncodedPayload
              encodedPayload={web3.eth.abi.encodeParameter(
                'bytes4',
                `0x${TRANSACTION_SELECTORS.ACCEPT_OWNERSHIP}`,
              )}
            />
          ) : null}
          {mode === TRANSACTION_TYPES.RENOUNCE_OWNERSHIP ? (
            <EncodedPayload
              encodedPayload={web3.eth.abi.encodeParameter(
                'bytes4',
                `0x${TRANSACTION_SELECTORS.RENOUNCE_OWNERSHIP}`,
              )}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Encode;
