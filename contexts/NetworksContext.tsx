import { createContext, useState } from 'react';
import { RPC_URL } from '../globals';
import { NetworkName } from '../types/network';
export interface INetwork {
  name: NetworkName;
  rpc: string;
  imgUrl?: string;
}

export interface INetworksContext {
  network: INetwork;
  setNetwork: (network: INetwork) => void;
}

export const NetworkContext = createContext<INetworksContext>({
  network: { name: NetworkName.MAINNET, rpc: '' },
  setNetwork: () => null,
});

const NetworksProvider = ({ children }: { children: React.ReactNode }) => {
  const [network, setNetwork] = useState<INetwork>({
    // Default Network
    name: NetworkName.MAINNET,
    rpc: RPC_URL[NetworkName.MAINNET],
    imgUrl: '/lukso.png',
  });

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworksProvider;
