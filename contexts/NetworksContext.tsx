import { createContext, useEffect, useState } from 'react';
import Web3 from 'web3';

export interface INetwork {
  name: string;
  rpc: string;
  imgUrl?: string;
}

export interface INetworksContext {
  network: INetwork;
  setNetwork: (network: INetwork) => void;
  web3: Web3;
}

export const NetworkContext = createContext<INetworksContext>({
  network: { name: '', rpc: '' },
  setNetwork: () => null,
  web3: new Web3(),
});

const NetworksProvider = ({ children }: { children: React.ReactNode }) => {
  const [network, setNetwork] = useState<INetwork>({
    name: 'L16',
    rpc: 'https://rpc.l16.lukso.network',
    imgUrl: '/lukso.png',
  });
  const [web3, setWeb3] = useState<Web3>(new Web3());

  useEffect(() => {
    setWeb3(new Web3(network.rpc));
    if (process.env.NODE_ENV === 'development') {
      window.web3 = web3;
    }
  }, [network]);

  return (
    <NetworkContext.Provider value={{ network, setNetwork, web3 }}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworksProvider;
