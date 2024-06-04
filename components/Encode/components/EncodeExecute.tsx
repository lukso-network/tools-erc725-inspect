import React, { SetStateAction, useState } from 'react';
import Web3 from 'web3';
import EncodedPayload from './EncodedPayload';
import ERC725Account from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';
import ErrorMessage from '../../ErrorMessage';
import styles from './EncodeExecute.module.scss';

import { OPERATION_TYPES } from '@lukso/lsp-smart-contracts';

interface Props {
  web3: Web3;
  isBatch: boolean;
}

interface ExecuteParams {
  operationType: number;
  target: string;
  value: string;
  data: string;
}

const interactionPlaceholder = {
  operationType: 0,
  target: '0xcafecafecafecafecafecafecafecafecafecafe',
  value: '0',
  data: '0x',
};

const ExecuteField: React.FC<ExecuteParams> = (
  { operationType, target, value, data },
  setParams?: SetStateAction<ExecuteParams>,
) => (
  <div className="column">
    <div className="mb-2">
      <div className={styles.inputContainer}>
        <label className={styles.inputDescription}>Operation</label>
        <br></br>
        <div className="select mb-2">
          <select value={operationType}>
            {Object.entries(OPERATION_TYPES).map(
              ([operationName, operationNumber]) => {
                return (
                  <option key={operationNumber} value={operationNumber}>
                    {operationName}
                  </option>
                );
              },
            )}
          </select>
        </div>
      </div>
    </div>
    <div className="mb-2">
      <div className={styles.inputContainer}>
        <label className={styles.inputDescription}>Recipient</label>
        <input
          type="text"
          className="input mb-2 is-fullwidth"
          value={target}
          onChange={(event) => {
            const input = event.target.value;
          }}
        />
      </div>
    </div>
    <div className="mb-2">
      <div className={styles.inputContainer}>
        <label className={styles.inputDescription}>Amount</label>
        <input
          type="text"
          className="input mb-2 is-fullwidth"
          value={value}
          onChange={(event) => {
            const input = event.target.value;
          }}
        />
      </div>
    </div>
    <div className="mb-2">
      <div className={styles.inputContainer}>
        <label className={styles.inputDescription}>Data</label>
        <input
          type="text"
          className="input mb-2 is-fullwidth"
          value={data}
          onChange={(event) => {
            const input = event.target.value;
          }}
        />
      </div>
    </div>
  </div>
);

const EncodeExecute: React.FC<Props> = ({ web3, isBatch }) => {
  const [encodedPayload, setEncodedPayload] = useState('');

  const [executeParams, setExecuteParams] = useState<ExecuteParams[]>([
    interactionPlaceholder,
  ]);

  const [encodingError, setEncodingError] = useState({
    isError: false,
    message: '',
  });

  const addInteraction = () => {
    setExecuteParams([...executeParams, interactionPlaceholder]);
  };

  const removeInteraction = (index: number) => {
    const values = [...executeParams];
    values.splice(index, 1);
    setExecuteParams(values);
  };

  const encodeABI = () => {
    const erc725Account = new web3.eth.Contract(ERC725Account.abi as any);

    try {
      setEncodedPayload(
        erc725Account.methods
          .executeBatch(
            executeParams.map((param) => {
              return (
                param.operationType,
                param.target,
                web3.utils.toWei(param.value),
                param.data
              );
            }),
          )
          .encodeABI(),
      );

      setEncodingError({ message: '', isError: false });
    } catch (error: any) {
      setEncodedPayload('');
      setEncodingError({ message: error.message, isError: true });
    }
  };

  return (
    <div>
      {isBatch ? (
        <div className="executeBatch-inputs">
          {executeParams.map(
            ({ operationType, target, value, data }, index) => (
              <div
                key={index}
                className={`is-flex is-align-items-center is-vcentered ${styles.executeCard}`}
              >
                <div className="column is-1">
                  <button
                    className={`delete is-large ${styles.closeButton}`}
                    onClick={removeInteraction.bind(this, index)}
                  >
                    Remove
                  </button>
                </div>
                <ExecuteField
                  key={index}
                  operationType={operationType}
                  target={target}
                  value={value}
                  data={data}
                />
              </div>
            ),
          )}

          <div>
            <div className="my-4 mr-4">
              <button
                className={`button is-info ${styles.buttonWidth}`}
                onClick={addInteraction}
              >
                Add new interaction
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.executeCard}>
          <ExecuteField
            operationType={executeParams[0] && executeParams[0].operationType}
            target={executeParams[0] && executeParams[0].target}
            value={executeParams[0] && executeParams[0].value}
            data={executeParams[0] && executeParams[0].data}
          />
        </div>
      )}

      <div className="actions">
        <div
          style={{
            height: 300,
            width: '100%',
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <button className="button is-primary" onClick={encodeABI}>
            Encode ABI
          </button>

          {encodedPayload ? (
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
    </div>
  );
};

export default EncodeExecute;
