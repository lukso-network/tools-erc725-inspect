/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';

import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import useWeb3 from '../../hooks/useWeb3';

const KeyManagerNonceChecker: React.FC = () => {
  const web3 = useWeb3();

  const [keyManagerAddress, setKeyManagerAddress] = useState('');
  const [callerAddress, setCallerAddress] = useState('');
  const [channelId, setChannelId] = useState('');
  const [nonce, setNonce] = useState('');

  const [showNonce, setShowNonce] = useState(false);
  const [error, showError] = useState(false);

  const getNonceFromKeyManager = async () => {
    if (!web3) return;

    const keyManagerInstance = new web3.eth.Contract(
      LSP6KeyManager.abi as any,
      web3.utils.toChecksumAddress(keyManagerAddress),
    );

    const isKeyManagerV05 = await keyManagerInstance.methods
      // Caution: Fixed Interface ID
      .supportsInterface('0x6f4df48b')
      .call();

    const isKeyManagerV06 = await keyManagerInstance.methods
      // Caution: Fixed Interface ID
      .supportsInterface('0xc403d48f')
      .call();

    if (isKeyManagerV05 || isKeyManagerV06) {
      const result: any = await keyManagerInstance.methods
        .getNonce(callerAddress, channelId)
        .call();

      setNonce(result);
      setShowNonce(true);
      showError(false);
    } else {
      setShowNonce(false);
      showError(true);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="title is-2">Nonce</h2>
      <article className="message is-info">
        <div className="message-body">
          Retrieve the nonce of a{' '}
          <a
            href="https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account"
            target="_blank"
            rel="noreferrer"
            className="ml-1"
          >
            LSP0 ERC725Account
          </a>
          's{' '}
          <a
            href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager#introduction"
            target="_blank"
            rel="noreferrer"
          >
            controller address
          </a>{' '}
          for a specific{' '}
          <a
            href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager"
            target="_blank"
            rel="noreferrer"
          >
            LSP6 KeyManager
          </a>{' '}
          smart contract.
        </div>
      </article>

      <article className="message">
        <div className="message-body">
          It's calling the{' '}
          <a
            href="https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-25-ExecuteRelayCall.md#getnonce"
            target="_blank"
            rel="noreferrer"
          >
            getNonce
          </a>{' '}
          function of the{' '}
          <a
            href="https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-25-ExecuteRelayCall.md"
            target="_blank"
            rel="noreferrer"
          >
            LSP25 ExecuteRelayCall
          </a>{' '}
          standardization that every{' '}
          <a
            href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager"
            target="_blank"
            rel="noreferrer"
          >
            LSP6 KeyManager
          </a>{' '}
          inherits.
        </div>
      </article>

      <div className="columns mt-2">
        <div className="column">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Key Manager Address"
                onChange={(e) => {
                  setKeyManagerAddress(e.target.value);
                }}
              />
              <span className="icon is-small is-left">🔐</span>
            </p>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Controller Address"
                onChange={(e) => setCallerAddress(e.target.value)}
              />
              <span className="icon is-small is-left">➡️ </span>
            </p>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Channel ID"
                onChange={(e) => setChannelId(e.target.value)}
              />
              <span className="icon is-small is-left">🚪</span>
            </p>
          </div>
        </div>
        <div className="column">
          <button
            className="button is-success"
            onClick={async () => {
              await getNonceFromKeyManager();
            }}
          >
            Get Nonce
          </button>
        </div>
      </div>
      <div
        className="notification is-danger is-light"
        style={{ display: error ? 'block' : 'none' }}
      >
        address <code>{keyManagerAddress}</code> is not a KeyManager
      </div>
      <div
        className="notification is-success is-light"
        style={{ display: showNonce ? 'block' : 'none' }}
      >
        Nonce = <code>{nonce}</code>
      </div>
    </div>
  );
};

export default KeyManagerNonceChecker;
