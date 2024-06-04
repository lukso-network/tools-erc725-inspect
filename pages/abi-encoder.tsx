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
        <h2 className="title is-2">ABI Encoder</h2>
        <article className="message is-info">
          <div className="message-body">
            Encode and decode transaction data of
            <a
              className="mx-1"
              href="https://docs.lukso.tech/standards/smart-contracts/lsp0-erc725-account"
              target="_blank"
              rel="noreferrer"
            >
              LSP0 ERC725Account
            </a>
            smart contracts based on its
            <a
              className="ml-1"
              target="_blank"
              rel="noreferrer"
              href="https://docs.lukso.tech/contracts/contracts/LSP0ERC725Account/#parameters-2"
            >
              execution parameters
            </a>
            .
          </div>
        </article>
        <article className="message">
          <div className="message-body">
            It&lsquo;s using the
            <a
              href="https://docs.web3js.org/api/web3-eth-abi/function/decodeParameters/"
              target="_blank"
              rel="noreferrer"
              className="mx-1"
            >
              decodeParameters
            </a>
            function of the
            <a
              href="https://www.npmjs.com/package/web3"
              target="_blank"
              rel="noreferrer"
              className="mx-1"
            >
              web3
            </a>
            library.
          </div>
        </article>
        <div className="columns">
          <div className="column">
            <div className="mb-2">
              <h2 className="mb-2">Mode</h2>
              <div className="control">
                <label className="radio radioLabel">
                  <input
                    type="radio"
                    className="radioInput"
                    value={TX_PARSER_MODES.ENCODE}
                    checked={mode === TX_PARSER_MODES.ENCODE}
                    onChange={() => setMode(TX_PARSER_MODES.ENCODE)}
                  />
                  Encode
                </label>
                <label className="radio radioLabel">
                  <input
                    type="radio"
                    className="radioInput"
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
