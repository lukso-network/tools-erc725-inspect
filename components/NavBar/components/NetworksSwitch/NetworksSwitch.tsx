import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { INetwork, NetworkContext } from '../../../../contexts/NetworksContext';

import { RPC_URL_MAINNET, RPC_URL_TESTNET } from '../../../../globals';

const luksoChains: INetwork[] = [
  { name: 'MAINNET', rpc: RPC_URL_MAINNET, imgUrl: '/lukso.png' },
  { name: 'TESTNET', rpc: RPC_URL_TESTNET, imgUrl: '/lukso.png' },
];

const NetworkSwitch: React.FC = () => {
  const router = useRouter();
  const { network, setNetwork } = useContext(NetworkContext);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleNetworkChange = (chain) => {
    setNetwork(chain);
    setIsDropdownActive(false);

    if (router.pathname === '/inspector' && router.query.address) {
      const updatedUrl = `/inspector?address=${
        router.query.address
      }&network=${chain.name.toLowerCase()}`;
      router.push(updatedUrl, undefined, { shallow: true });
    }
  };

  const handleDropdownBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDropdownActive(false);
    }
  };

  return (
    <div
      className={`navbar-item has-dropdown ${
        isDropdownActive ? 'is-active' : ''
      }`}
      onClick={toggleDropdown}
      onBlur={handleDropdownBlur} // Add onBlur event handler
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
              onClick={(e) => {
                e.stopPropagation();
                handleNetworkChange(chain);
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
