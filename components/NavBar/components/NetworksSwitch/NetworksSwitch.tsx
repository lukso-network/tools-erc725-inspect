import React, { useContext, useState } from 'react';
import { INetwork, NetworkContext } from '../../../../contexts/NetworksContext';

import { RPC_URL_MAINNET, RPC_URL_TESTNET } from '../../../../globals';

const luksoChains: INetwork[] = [
  { name: 'MAINNET', rpc: RPC_URL_MAINNET, imgUrl: '/lukso.png' },
  { name: 'TESTNET', rpc: RPC_URL_TESTNET, imgUrl: '/lukso.png' },
];

const NetworkSwitch: React.FC = () => {
  const { network, setNetwork } = useContext(NetworkContext);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  return (
    <div
      className={`navbar-item has-dropdown ${
        isDropdownActive ? 'is-active' : ''
      } is-hoverable`}
      onClick={() => setIsDropdownActive(!isDropdownActive)}
    >
      <a className="navbar-link is-flex" style={{ alignItems: 'center' }}>
        {network.imgUrl && (
          <img
            src={network.imgUrl}
            alt={network.name}
            className="mr-2"
            style={{ height: '1em' }}
          />
        )}
        <span style={{ flexGrow: 1 }}>{network.name}</span>
        <span className="icon is-small is-hidden-touch">
          <i
            className={`fas fa-chevron-down ${
              isDropdownActive ? 'is-active' : ''
            }`}
          ></i>
        </span>
      </a>
      <div
        className={`navbar-dropdown ${
          isDropdownActive ? 'is-block' : 'is-hidden-touch'
        }`}
      >
        {luksoChains.map((chain) => {
          if (chain.rpc === network.rpc) {
            return null;
          }

          return (
            <a
              className="navbar-item"
              onClick={() => {
                setNetwork(chain);
                setIsDropdownActive(false);
              }}
              key={chain.rpc}
            >
              <img
                className="mr-2"
                src={chain.imgUrl}
                alt={chain.name}
                style={{ height: '1em' }}
              />
              <span>{chain.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default NetworkSwitch;
