import { NextPage } from 'next';
import Head from 'next/head';
import { useContext, useState } from 'react';

import Decode from '@/components/features/Decode';
import Encode from '@/components/features/Encode';
import { LSP_DOCS_URL } from '@/constants/links';
import { NetworkContext } from '@/contexts/NetworksContext';

enum TX_PARSER_MODES {
  ENCODE = 'ENCODE',
  DECODE = 'DECODE',
}

const DEFAULT_MODE = TX_PARSER_MODES.ENCODE;

const Home: NextPage = () => {
  const { network } = useContext(NetworkContext);

  const [mode, setMode] = useState(DEFAULT_MODE);

  return (
    <>
      <Head>
        <title>Transaction Encoder / Decoder - ERC725 Tools</title>
      </Head>
      <div className="container">
        <h2 className="title is-2">Transaction Encoder / Decoder</h2>
        <article className="message is-info">
          <div className="message-body">
            Encode and decode transaction calldata from the{' '}
            <a href="https://docs.lukso.tech/contracts/contracts/LSP0ERC725Account/">
              available functions and ABI
            </a>{' '}
            of an{' '}
            <a href={LSP_DOCS_URL.LSP0} target="_blank" rel="noreferrer">
              LSP0 ERC725Account
            </a>{' '}
            smart contract.
          </div>
        </article>

        <div className="columns">
          <div className="column">
            <div className="mb-2">
              <p className="mb-2">Mode</p>
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
        {mode === TX_PARSER_MODES.ENCODE && network ? <Encode /> : null}
        {mode === TX_PARSER_MODES.DECODE && network ? <Decode /> : null}
      </div>
    </>
  );
};

export default Home;
