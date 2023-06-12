import { createContext, useState } from 'react';
import { RPC_URL_TESTNET } from '../globals';
export interface INetwork {
  name: string;
  rpc: string;
  imgUrl?: string;
}

export interface INetworksContext {
  network: INetwork;
  setNetwork: (network: INetwork) => void;
}

export const NetworkContext = createContext<INetworksContext>({
  network: { name: '', rpc: '' },
  setNetwork: () => null,
});

const NetworksProvider = ({ children }: { children: React.ReactNode }) => {
  const [network, setNetwork] = useState<INetwork>({
    // Default Network
    name: 'TESTNET',
    rpc: RPC_URL_TESTNET,
    imgUrl: '/lukso.png',
  });

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworksProvider;
