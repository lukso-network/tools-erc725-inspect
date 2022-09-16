import {
  Alert,
  Grid,
  Chip,
  Container,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import React, { ReactElement, useState } from 'react';
import Web3 from 'web3';
import {
  TRANSACTION_SELECTORS,
  TRANSACTION_TYPES,
} from '../../interfaces/transaction';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

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
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12}>
            <TextareaAutosize
              minRows={8}
              maxRows={8}
              placeholder="Paste your abi here..."
              onChange={(e) => handleChange(e.target.value as string)}
              style={{ width: 500 }}
            />
          </Grid>

          <Grid md={12} sm={12}>
            {abiError.isError ? (
              <Alert severity="error">{abiError.message}</Alert>
            ) : (
              ''
            )}
          </Grid>

          <Grid item>
            <Chip
              label="Set Data"
              color={
                transactionType === TRANSACTION_TYPES.SET_DATA
                  ? 'primary'
                  : 'default'
              }
            />
            <Chip
              label="Execute"
              color={
                transactionType === TRANSACTION_TYPES.EXECUTE
                  ? 'primary'
                  : 'default'
              }
            />
            <Chip
              label="Transfer Ownership"
              color={
                transactionType === TRANSACTION_TYPES.TRANSFER_OWNERSHIP
                  ? 'primary'
                  : 'default'
              }
            />
          </Grid>

          <Grid item md={12}>
            {!abiError.isError && payload.length > 0 ? (
              <ShowDecoder selector={selector} payload={payload} web3={web3} />
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const decodeTransferOwnership = (payload: string, web3: Web3) => {
  try {
    const result = web3.eth.abi.decodeParameters(['address'], payload);
    return (
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Alert severity="warning">
            <b>Warning! </b>
            This payload will transfer ownership to {result[0]}.<br /> Be
            cautious!
          </Alert>
        </Grid>
        <Grid item md={12}>
          <TextField
            label="new owner"
            defaultValue="0x..."
            value={result[0]}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
    );
  } catch (error: any) {
    return (
      <Grid item md={12}>
        <ErrorMessage header="ABI Decoder Error!" message={error.message} />
      </Grid>
    );
  }
};

const decodeSetData = (payload: string, web3: Web3) => {
  try {
    const result = web3.eth.abi.decodeParameters(
      ['bytes32[]', 'bytes[]'],
      payload,
    );

    return (
      <Grid container spacing={2}>
        <Grid item md={6}>
          Keys
        </Grid>
        <Grid item md={6}>
          Values
        </Grid>
        {result[0].map((key: string, index: number) => (
          <>
            <Grid item md={6}>
              <TextField
                value={key}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                value={result[1][index]}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </>
        ))}
      </Grid>
    );
  } catch (error: any) {
    return (
      <Grid item md={12}>
        <ErrorMessage header="ABI Decoder Error!" message={error.message} />
      </Grid>
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
      <Grid container spacing={2}>
        <Grid item md={12}>
          <TextField
            label="Operation"
            value={result[0]}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            label="Recipient"
            value={result[1]}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            label="Amount"
            value={result[2]}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            label="Data"
            value={result[3] ? result[3] : '0x'}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
    );
  } catch (error: any) {
    return (
      <Grid item md={12}>
        <ErrorMessage header="ABI Decoder Error!" message={error.message} />
      </Grid>
    );
  }
};

export default Decode;
