import { createContext, useState, useCallback, useEffect } from 'react';
import { RPC_URL } from '@/globals';
import { NetworkName } from '@/types/network';
import { useRouter } from 'next/router';
export interface INetwork {
  name: NetworkName;
  rpc: string;
  imgUrl?: string;
}

const chains: INetwork[] = [
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

  const getNetworkFromLocalStorage = (): INetwork => {
    if (typeof window !== 'undefined') {
      const storedNetworkName = localStorage.getItem('erc725InspectNetwork');
      if (storedNetworkName) {
        return (
          chains.find(
            (network) =>
              network.name.toLowerCase() === storedNetworkName.toLowerCase(),
          ) || chains[0]
        );
      }
    }
    // Return default if nothing is in local storage
    return chains[0];
  };

  // Get network from URL or switch to default chain
  const getNetworkFromUrlOrDefault = useCallback(() => {
    const networkParam = router.query.network;
    if (typeof networkParam !== 'string') {
      // Fallback to local storage or default network
      return getNetworkFromLocalStorage();
    }
    return (
      chains.find(
        (network) => network.name.toLowerCase() === networkParam?.toLowerCase(),
      ) || getNetworkFromLocalStorage()
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
    const networkFromUrl = getNetworkFromUrlOrDefault();
    if (networkFromUrl.name !== network.name) {
      setNetwork(networkFromUrl);
    }

    const networkParam = router.query.network;

    if (networkParam === undefined) {
      // Update the URL with the network parameter if missing
      updateUrlWithNetwork(network.name.toLowerCase());
    }
  }, [
    router.query.network,
    network.name,
    getNetworkFromUrlOrDefault,
    updateUrlWithNetwork,
  ]);

  useEffect(() => {
    // Save to local storage whenever the network changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('erc725InspectNetwork', network.name);
    }
  }, [network]);

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworksProvider;
