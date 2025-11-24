/* eslint-disable react/no-unescaped-entities */

import { useState, useContext } from 'react';
import { isAddress, getAddress } from 'viem';
import { useReadContract } from 'wagmi';

import { ilsp25ExecuteRelayCallAbi } from '@lukso/lsp25-contracts/abi';
import { LSP_SPECS_URL } from '@/constants/links';
import { NetworkContext } from '@/contexts/NetworksContext';
import { getChainIdByNetworkName } from '@/config/wagmi';

const KeyManagerNonceChecker: React.FC = () => {
  const { network } = useContext(NetworkContext);
  const chainId = getChainIdByNetworkName(network.name);

  const [keyManagerAddress, setKeyManagerAddress] = useState('');
  const [callerAddress, setCallerAddress] = useState('');
  const [channelId, setChannelId] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  const isValidKeyManager = isAddress(keyManagerAddress);
  const isValidCaller = isAddress(callerAddress);

  const {
    data: nonce,
    isError,
    isSuccess,
    refetch,
  } = useReadContract({
    address: isValidKeyManager ? getAddress(keyManagerAddress) : undefined,
    abi: ilsp25ExecuteRelayCallAbi,
    functionName: 'getNonce',
    args: [
      isValidCaller ? getAddress(callerAddress) : '0x0',
      BigInt(channelId),
    ],
    chainId,
    query: {
      enabled: false, // Manual fetching on button click
    },
  });

  const getNonceFromKeyManager = async () => {
    if (!isValidKeyManager || !isValidCaller) {
      return;
    }
    setShouldFetch(true);
    await refetch();
  };

  return (
    <div className="container mt-5">
      <h2 className="title is-2">Nonce</h2>
      <article className="message is-info">
        <div className="message-body">
          Retrieve the nonce of a{' '}
          <a
            href="https://docs.lukso.tech/standards/accounts/lsp0-erc725account"
            target="_blank"
            rel="noreferrer"
            className="ml-1"
          >
            LSP0 ERC725Account
          </a>
          's{' '}
          <a
            href="https://docs.lukso.tech/standards/access-control/lsp6-key-manager#introduction"
            target="_blank"
            rel="noreferrer"
          >
            controller address
          </a>{' '}
          for a specific{' '}
          <a
            href="https://docs.lukso.tech/standards/access-control/lsp6-key-manager"
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
            href={`${LSP_SPECS_URL.LSP25}#getnonce`}
            target="_blank"
            rel="noreferrer"
          >
            getNonce
          </a>{' '}
          function of the{' '}
          <a href={LSP_SPECS_URL.LSP25} target="_blank" rel="noreferrer">
            LSP25 ExecuteRelayCall
          </a>{' '}
          standardization that every{' '}
          <a
            href="https://docs.lukso.tech/standards/access-control/lsp6-key-manager"
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
        style={{ display: isError && shouldFetch ? 'block' : 'none' }}
      >
        address <code>{keyManagerAddress}</code> is not a KeyManager
      </div>
      <div
        className="notification is-success is-light"
        style={{ display: isSuccess && shouldFetch ? 'block' : 'none' }}
      >
        Nonce = <code>{nonce?.toString()}</code>
      </div>
    </div>
  );
};

export default KeyManagerNonceChecker;
