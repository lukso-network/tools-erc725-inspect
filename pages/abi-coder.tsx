import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import Decode from '../components/Decode';
import Encode from '../components/Encode';
import useWeb3 from '../hooks/useWeb3';

enum TX_PARSER_MODES {
  ENCODE = 'ENCODE',
  DECODE = 'DECODE',
}

const DEFAULT_MODE = TX_PARSER_MODES.ENCODE;

const Home: NextPage = () => {
  const web3 = useWeb3();

  const [mode, setMode] = useState(DEFAULT_MODE);

  return (
    <>
      <Head>
        <title>ABI Coder - ERC725 Tools</title>
      </Head>
      <div className="container">
        <article className="message is-info">
          <div className="message-body">
            This tool lets you encode and decode{' '}
            <a href="https://docs.lukso.tech/standards/smart-contracts/lsp0-erc725-account">
              LSP0 ERC725 Account
            </a>{' '}
            transactions.
          </div>
        </article>
        <div className="columns">
          <div className="column">
            <FormControl component="fieldset">
              <FormLabel component="legend">Mode</FormLabel>
              <RadioGroup
                row
                aria-label="mode"
                name="row-radio-buttons-group"
                defaultValue={DEFAULT_MODE}
                onChange={(e) => setMode(e.target.value as TX_PARSER_MODES)}
              >
                <FormControlLabel
                  value={TX_PARSER_MODES.ENCODE}
                  control={<Radio />}
                  label="Encode"
                />
                <FormControlLabel
                  value={TX_PARSER_MODES.DECODE}
                  control={<Radio />}
                  label="Decode"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="container">
        {mode === TX_PARSER_MODES.ENCODE && web3 ? (
          <Encode web3={web3} />
        ) : null}
        {mode === TX_PARSER_MODES.DECODE && web3 ? (
          <Decode web3={web3} />
        ) : null}
      </div>
    </>
  );
};

export default Home;
