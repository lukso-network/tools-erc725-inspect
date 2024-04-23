import { createContext, useState, useCallback, useEffect } from 'react';
import { RPC_URL } from '../globals';
import { NetworkName } from '../types/network';
import { useRouter } from 'next/router';
export interface INetwork {
  name: NetworkName;
  rpc: string;
  imgUrl?: string;
}

const luksoChains: INetwork[] = [
  {
    name: NetworkName.MAINNET,
    rpc: RPC_URL[NetworkName.MAINNET],
    imgUrl: '/lukso.png',
  },
  {
    name: NetworkName.TESTNET,
    rpc: RPC_URL[NetworkName.TESTNET],
    imgUrl: '/lukso.png',
  },
  {
    name: NetworkName.LOCALHOST,
    rpc: RPC_URL[NetworkName.LOCALHOST],
    imgUrl: '/lukso.png',
  },
];

export interface INetworksContext {
  network: INetwork;
  setNetwork: (network: INetwork) => void;
}

export const NetworkContext = createContext<INetworksContext>({
  network: { name: NetworkName.MAINNET, rpc: '' },
  setNetwork: () => null,
});

const NetworksProvider = ({ children }) => {
  const router = useRouter();

  // Get network from URL or switch to default chain
  const getNetworkFromUrlOrDefault = useCallback(() => {
    let networkParam = router.query.network;
    if (Array.isArray(networkParam)) {
      networkParam = networkParam[0];
    }
    return (
      luksoChains.find(
        (network) => network.name.toLowerCase() === networkParam?.toLowerCase(),
      ) || luksoChains[0]
    );
  }, [router.query.network]);

  // Initialize state based on network
  const [network, setNetwork] = useState(getNetworkFromUrlOrDefault);

  const updateUrlWithNetwork = useCallback(
    (networkName) => {
      if (typeof window !== 'undefined') {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('network', networkName);
        const updatedUrl = `${router.pathname}?${queryParams.toString()}`;
        router.replace(updatedUrl, undefined, { shallow: true });
      }
    },
    [router],
  );

  useEffect(() => {
    if (!router.isReady) return;

    const initializedNetwork = getNetworkFromUrlOrDefault();
    setNetwork(initializedNetwork);

    // Update the URL with the network parameter if missing
    if (!router.query.network) {
      updateUrlWithNetwork(initializedNetwork.name.toLowerCase());
    }
  }, [
    router.isReady,
    router.query.network,
    getNetworkFromUrlOrDefault,
    updateUrlWithNetwork,
  ]);

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworksProvider;
