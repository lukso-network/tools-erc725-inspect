import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { NetworkContext } from '@/contexts/NetworksContext';
import { INetwork } from '@/types/network';
import { CHAINS } from '@/constants/networks';
import clsx from 'clsx';

const NetworkSwitch: React.FC = () => {
  const router = useRouter();
  const { network, setNetwork } = useContext(NetworkContext);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleNetworkChange = (chain: INetwork) => {
    setNetwork(chain);
    setIsDropdownActive(false);

    // Build the new URL with existing parameters
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('network', chain.name.toLowerCase());
    const updatedUrl = `${router.pathname}?${urlParams.toString()}`;
    router.push(updatedUrl, undefined, { shallow: true });
  };

  const handleDropdownBlur = (
    event: React.FocusEvent<HTMLDivElement, Element>,
  ) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsDropdownActive(false);
    }
  };

  return (
    <div
      className={clsx(
        `navbar-item has-dropdown ${isDropdownActive && 'is-active'}`,
      )}
      onClick={toggleDropdown}
      onBlur={handleDropdownBlur} // Add onBlur event handler
    >
      <a className="navbar-link is-flex">
        {network.imgUrl && (
          <img
            src={network.imgUrl}
            alt={network.name}
            className="mr-2"
            style={{ height: '1.5em' }}
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
        {CHAINS.map((chain) => {
          if (chain.rpcUrl === network.rpcUrl) {
            return null;
          }

          return (
            <a
              className="navbar-item"
              onClick={(e) => {
                e.stopPropagation();
                handleNetworkChange(chain);
              }}
              key={chain.name}
            >
              <img
                className="mr-2"
                src={chain.imgUrl}
                alt={chain.name}
                style={{ height: '1.5em' }}
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
