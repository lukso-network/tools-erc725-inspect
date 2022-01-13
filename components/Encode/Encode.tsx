import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { useState } from 'react';
import Web3 from 'web3';

import EncodeExecute from './components/EncodeExecute';
import EncodeSetData from './components/EncodeSetData';
import EncodeTransferOwnership from './components/EncodeTransferOwnership';

import { TRANSACTION_TYPES } from '../../interfaces/transaction';

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
                label="setData"
              />
              <FormControlLabel
                value={TRANSACTION_TYPES.EXECUTE}
                control={<Radio />}
                label="execute"
              />
              <FormControlLabel
                value={TRANSACTION_TYPES.TRANSFER_OWNERSHIP}
                control={<Radio />}
                label="transferOwnership"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          {mode === TRANSACTION_TYPES.SET_DATA ? (
            <EncodeSetData web3={web3} />
          ) : null}
          {mode === TRANSACTION_TYPES.EXECUTE ? (
            <EncodeExecute web3={web3} />
          ) : null}
          {mode === TRANSACTION_TYPES.TRANSFER_OWNERSHIP ? (
            <EncodeTransferOwnership web3={web3} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Encode;
