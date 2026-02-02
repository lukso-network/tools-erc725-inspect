import { createContext, useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { INetwork } from '@/types/network';
import { CHAINS } from '@/constants/networks';

const DEFAULT_NETWORK = CHAINS[0];

export interface INetworksContext {
  network: INetwork;
  setNetwork: (network: INetwork) => void;
}

export const NetworkContext = createContext<INetworksContext>({
  network: DEFAULT_NETWORK,
  setNetwork: () => null,
});

const NetworksProvider = ({ children }) => {
  const router = useRouter();
  const hasInitialized = useRef(false);

  // Initialize state based on network
  const [network, setNetwork] = useState<INetwork>(DEFAULT_NETWORK);

  // Use a ref to track current network for comparison without triggering effect re-runs
  const networkRef = useRef(network);
  networkRef.current = network;

  // Get network from URL or switch to default chain
  const getNetworkFromUrlOrDefault = useCallback(() => {
    const networkParam = router.query.network;
    if (typeof networkParam !== 'string') {
      // Fallback to default network
      return DEFAULT_NETWORK;
    }
    return (
      CHAINS.find(
        (network) => network.name.toLowerCase() === networkParam?.toLowerCase(),
      ) || DEFAULT_NETWORK
    );
  }, [router.query.network]);

  const updateUrlWithNetwork = useCallback(
    (networkName) => {
      if (typeof window !== 'undefined') {
        const queryParams = new URLSearchParams(window.location.search);
        const currentNetworkParam = queryParams.get('network');

        // Only update if the network parameter is actually different
        if (currentNetworkParam?.toLowerCase() !== networkName.toLowerCase()) {
          queryParams.set('network', networkName);
          const updatedUrl = `${router.pathname}?${queryParams.toString()}`;
          router.replace(updatedUrl, undefined, { shallow: true });
        }
      }
    },
    [router],
  );

  // Initialize network from URL or localStorage on mount
  useEffect(() => {
    if (!router.isReady) return;

    // Only initialize once
    if (hasInitialized.current) return;

    const networkFromUrl = getNetworkFromUrlOrDefault();
    setNetwork(networkFromUrl);
    hasInitialized.current = true;

    const networkParam = router.query.network;
    if (networkParam === undefined) {
      // Update the URL with the network parameter if missing
      updateUrlWithNetwork(networkFromUrl.name.toLowerCase());
    }
  }, [
    router.isReady,
    router.query.network,
    getNetworkFromUrlOrDefault,
    updateUrlWithNetwork,
  ]);

  // Sync network when URL changes (but not during initial load)
  // Using networkRef instead of network.name in dependencies to prevent race conditions
  // This effect should only run when the URL actually changes, not when state changes
  useEffect(() => {
    if (!router.isReady || !hasInitialized.current) return;

    const networkFromUrl = getNetworkFromUrlOrDefault();
    if (networkFromUrl.name !== networkRef.current.name) {
      setNetwork(networkFromUrl);
    }
  }, [router.isReady, router.query.network, getNetworkFromUrlOrDefault]);

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
