import { useState } from 'react';
import EncodedPayload from './EncodedPayload';
import ERC725Account from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';
import ErrorMessage from '@/components/ui/ErrorMessage';
import styles from './EncodeExecute.module.scss';
import { AbiItem, encodeFunctionData, parseEther } from 'viem';

const EncodeExecute: React.FC = () => {
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
    try {
      const weiAmount = parseEther(amount);

      const encodedCalldata = encodeFunctionData({
        abi: ERC725Account.abi as AbiItem[],
        functionName: 'execute',
        args: [operation, recipient, weiAmount, data],
      });

      setEncodedPayload(encodedCalldata);
      setEncodingError({ message: '', isError: false });
    } catch (error: any) {
      setEncodedPayload('');
      setEncodingError({ message: error.message, isError: true });
    }
  };

  return (
    <>
      <div>
        <div className="mb-2">
          <div className={styles.inputContainer}>
            <label className={styles.inputDescription}>Operation</label>
            <br></br>
            <div className="select mb-2">
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
        </div>
        <div className="mb-2">
          <div className={styles.inputContainer}>
            <label className={styles.inputDescription}>Recipient</label>
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
        <div className="mb-2">
          <div className={styles.inputContainer}>
            <label className={styles.inputDescription}>Amount</label>
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
        <div className="mb-2">
          <div className={styles.inputContainer}>
            <label className={styles.inputDescription}>Data</label>
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
