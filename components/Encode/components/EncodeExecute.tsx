import { useState } from 'react';
import Web3 from 'web3';
import EncodedPayload from './EncodedPayload';
import ERC725Account from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';
import ErrorMessage from '../../ErrorMessage';
import styles from './EncodeExecute.module.scss';

interface Props {
  web3: Web3;
}

const EncodeExecute: React.FC<Props> = ({ web3 }) => {
  const [encodedPayload, setEncodedPayload] = useState('');
  const [operation, setOperation] = useState('0');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState('');
  const [encodingError, setEncodingError] = useState({
    isError: false,
    message: '',
  });

  const encodeABI = () => {
    const erc725Account = new web3.eth.Contract(ERC725Account.abi as any);

    try {
      const weiAmount = web3.utils.toWei(amount);

      setEncodedPayload(
        erc725Account.methods
          .execute(operation, recipient, weiAmount, data)
          .encodeABI(),
      );

      setEncodingError({ message: '', isError: false });
    } catch (error: any) {
      setEncodedPayload('');
      setEncodingError({ message: error.message, isError: true });
    }
  };

  return (
    <>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <label>Operation</label>
          <br></br>
          <div className="select">
            <select
              value={operation}
              onChange={(event) => setOperation(event.target.value)}
            >
              <option value="0">CALL</option>
              <option value="1">CREATE</option>
              <option value="2">CREATE2</option>
              <option value="3">STATICCALL</option>
              <option value="4">DELEGATECALL</option>
            </select>
          </div>
        </div>
        <div className={styles.gridItem}>
          <div>
            <label>Recipient</label>
            <input
              type="text"
              className="input mb-2 is-fullwidth"
              value={recipient}
              onChange={(event) => {
                const input = event.target.value;
                setRecipient(input);
              }}
            />
          </div>
        </div>
        <div className={styles.gridItem}>
          <div>
            <label>Amount</label>
            <input
              type="text"
              className="input mb-2 is-fullwidth"
              value={amount}
              onChange={(event) => {
                const input = event.target.value;
                setAmount(input);
              }}
            />
          </div>
        </div>
        <div className={styles.gridItem}>
          <div>
            <label>Data</label>
            <input
              type="text"
              className="input mb-2 is-fullwidth"
              value={data}
              onChange={(event) => {
                const input = event.target.value;
                setData(input);
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{ height: 300, width: '100%', marginBottom: 10, marginTop: 10 }}
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
    </>
  );
};

export default EncodeExecute;
