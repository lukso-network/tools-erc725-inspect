import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { useState } from 'react';
import Web3 from 'web3';
import { TRANSACTION_TYPES } from '../../interfaces/transaction';
import EncodeExecute from './components/EncodeExecute';
import EncodeSetData from './components/EncodeSetData';
import EncodeTransferOwnership from './components/EncodeTransferOwnership';

interface Props {
  web3: Web3;
}

const DEFAULT_TRANSACTION_TYPE = TRANSACTION_TYPES.SET_DATA;

const Encode: React.FC<Props> = ({ web3 }) => {
  const [mode, setMode] = useState(DEFAULT_TRANSACTION_TYPE);

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Transaction Type</FormLabel>
        <RadioGroup
          row
          aria-label="mode"
          name="row-radio-buttons-group"
          defaultValue={DEFAULT_TRANSACTION_TYPE}
          onChange={(e) => setMode(e.target.value as TRANSACTION_TYPES)}
        >
          <FormControlLabel
            value={TRANSACTION_TYPES.SET_DATA}
            control={<Radio />}
            label="Set Data"
          />
          <FormControlLabel
            value={TRANSACTION_TYPES.EXECUTE}
            control={<Radio />}
            label="Execute"
          />
          <FormControlLabel
            value={TRANSACTION_TYPES.TRANSFER_OWNERSHIP}
            control={<Radio />}
            label="Transfer Ownership"
          />
        </RadioGroup>
      </FormControl>

      <Container>
        {mode === TRANSACTION_TYPES.SET_DATA ? (
          <EncodeSetData web3={web3} />
        ) : null}
        {mode === TRANSACTION_TYPES.EXECUTE ? (
          <EncodeExecute web3={web3} />
        ) : null}
        {mode === TRANSACTION_TYPES.TRANSFER_OWNERSHIP ? (
          <EncodeTransferOwnership web3={web3} />
        ) : null}
      </Container>
    </>
  );
};

export default Encode;
