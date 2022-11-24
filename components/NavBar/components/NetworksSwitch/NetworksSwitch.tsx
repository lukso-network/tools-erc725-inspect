import React, { useContext } from 'react';
import { INetwork, NetworkContext } from '../../../../contexts/NetworksContext';

const luksoChains: INetwork[] = [
  { name: 'L16', rpc: 'https://rpc.l16.lukso.network', imgUrl: '/lukso.png' },
  { name: 'L14', rpc: 'https://rpc.l14.lukso.network', imgUrl: '/lukso.png' },
];

const NetworkSwitch: React.FC = () => {
  const { network, setNetwork } = useContext(NetworkContext);

  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <div>
        <a className="navbar-link">
          {network.imgUrl ? (
            <img src={network.imgUrl} alt={network.name} className="mr-1" />
          ) : null}
          <span>{network.name}</span>
        </a>
      </div>
      <div className="navbar-dropdown">
        {luksoChains.map((chain) => {
          if (chain.rpc === network.rpc) {
            return null;
          }

          return (
            <a
              className="navbar-item"
              onClick={() => setNetwork(chain)}
              key={chain.rpc}
            >
              <img src={chain.imgUrl} alt={chain.name} className="mr-1" />
              <span>{chain.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default NetworkSwitch;
