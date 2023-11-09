import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import Decode from '../components/Decode';
import Encode from '../components/Encode';
import useWeb3 from '../hooks/useWeb3';
import styles from './abi-endoder.module.scss';

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
            <div className="mb-2">
              <p className="mb-2">Mode</p>
              <div className="control">
                <label className={`radio ${styles.radioLabel}`}>
                  <input
                    type="radio"
                    className={styles.radioInput}
                    value={TX_PARSER_MODES.ENCODE}
                    checked={mode === TX_PARSER_MODES.ENCODE}
                    onChange={() => setMode(TX_PARSER_MODES.ENCODE)}
                  />
                  Encode
                </label>
                <label className={`radio ${styles.radioLabel}`}>
                  <input
                    type="radio"
                    className={styles.radioInput}
                    value={TX_PARSER_MODES.DECODE}
                    checked={mode === TX_PARSER_MODES.DECODE}
                    onChange={() => setMode(TX_PARSER_MODES.DECODE)}
                  />
                  Decode
                </label>
              </div>
            </div>
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
