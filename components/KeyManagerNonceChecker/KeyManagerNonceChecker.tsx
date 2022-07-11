import { useState, useContext } from 'react';

import LSP6KeyManager from '../../abis/LSP6KeyManager.json';
import { NetworkContext } from '../../contexts/NetworksContext';

const KeyManagerNonceChecker: React.FC = () => {
  const { web3 } = useContext(NetworkContext);

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
      .supportsInterface('0x6f4df48b')
      .call();

    const isKeyManagerV06 = await keyManagerInstance.methods
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
      <p>
        Retrieve the nonce of an <code>address</code> for a specific Key
        Manager.
      </p>
      <div className="columns mt-2">
        <div className="column">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Key Manager address"
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
                placeholder="Caller address"
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
