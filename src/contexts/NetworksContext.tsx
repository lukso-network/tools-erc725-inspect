import { createContext, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { INetwork, NetworkName } from '@/types/network';
import { CHAINS } from '@/constants/networks';

export interface INetworksContext {
  network: INetwork;
  setNetwork: (network: INetwork) => void;
}

export const NetworkContext = createContext<INetworksContext>({
  network: { name: NetworkName.LUKSO_MAINNET, rpc: '' },
  setNetwork: () => null,
});

const NetworksProvider = ({ children }) => {
  const router = useRouter();

  const getNetworkFromLocalStorage = (): INetwork => {
    if (typeof window !== 'undefined') {
      const storedNetworkName = localStorage.getItem('erc725InspectNetwork');
      if (storedNetworkName) {
        return (
          CHAINS.find(
            (network) =>
              network.name.toLowerCase() === storedNetworkName.toLowerCase(),
          ) || CHAINS[0]
        );
      }
    }
    // Return default if nothing is in local storage
    return CHAINS[0];
  };

  // Get network from URL or switch to default chain
  const getNetworkFromUrlOrDefault = useCallback(() => {
    const networkParam = router.query.network;
    if (typeof networkParam !== 'string') {
      // Fallback to local storage or default network
      return getNetworkFromLocalStorage();
    }
    return (
      CHAINS.find(
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
