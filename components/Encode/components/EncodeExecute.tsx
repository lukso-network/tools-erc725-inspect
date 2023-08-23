import {
  Grid,
  MenuItem,
  InputLabel,
  Select,
  TextField,
  Button,
} from '@mui/material';
import { useState } from 'react';
import Web3 from 'web3';
import EncodedPayload from './EncodedPayload';
import ERC725Account from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';
import ErrorMessage from '../../ErrorMessage';

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
      <Grid container justifyContent="center" spacing={2}>
        <Grid item md={12}>
          <InputLabel id="demo-simple-select-label">Operation</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={operation}
            onChange={(event) => setOperation(event.target.value)}
          >
            <MenuItem value={'0'}>CALL</MenuItem>
            <MenuItem value={'1'}>CREATE</MenuItem>
            <MenuItem value={'2'}>CREATE2</MenuItem>
            <MenuItem value={'3'}>STATICCALL</MenuItem>
            <MenuItem value={'4'}>DELEGATECALL</MenuItem>
          </Select>
        </Grid>
        <Grid item md={12}>
          <TextField
            label="Recipient"
            value={recipient}
            fullWidth
            onChange={(event) => {
              const input = event.target.value;
              setRecipient(input);
            }}
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            label="Amount"
            value={amount}
            fullWidth
            onChange={(event) => {
              const input = event.target.value;
              setAmount(input);
            }}
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            label="Data"
            value={data}
            fullWidth
            onChange={(event) => {
              const input = event.target.value;
              setData(input);
            }}
          />
        </Grid>
      </Grid>
      <div
        style={{ height: 300, width: '100%', marginBottom: 10, marginTop: 10 }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={encodeABI}
        >
          Encode ABI
        </Button>
        {encodedPayload ? (
          <EncodedPayload encodedPayload={encodedPayload} />
        ) : null}
        {encodingError.isError ? (
          <ErrorMessage
            header="ABI Encoding Error!"
            message={encodingError.message}
          />
        ) : null}
      </div>
    </>
  );
};

export default EncodeExecute;
