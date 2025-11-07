import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useChainId, useSwitchChain } from 'wagmi';

import { getChainByNetworkName } from '@/config/wagmi';

import { INetwork } from '@/types/network';
import { CHAINS } from '@/constants/networks';

const DEFAULT_NETWORK = CHAINS[0];

export function useNetworkSync() {
  const router = useRouter();
  const currentChainId = useChainId();
  const { switchChain } = useSwitchChain();

  const getNetworkFromLocalStorage = (): INetwork => {
    if (typeof window !== 'undefined') {
      const storedNetworkName = localStorage.getItem('erc725InspectNetwork');
      if (storedNetworkName) {
        return (
          CHAINS.find(
            (network) =>
              network.name.toLowerCase() === storedNetworkName.toLowerCase(),
          ) || DEFAULT_NETWORK
        );
      }
    }
    return DEFAULT_NETWORK;
  };

  const getNetworkFromUrlOrDefault = useCallback(() => {
    const networkParam = router.query.network;
    if (typeof networkParam !== 'string') {
      return getNetworkFromLocalStorage();
    }
    return (
      CHAINS.find(
        (network) => network.name.toLowerCase() === networkParam?.toLowerCase(),
      ) || getNetworkFromLocalStorage()
    );
  }, [router.query.network]);

  const [network, setNetworkState] = useState<INetwork>(DEFAULT_NETWORK);

  const updateUrlWithNetwork = useCallback(
    (networkName: string) => {
      if (typeof window !== 'undefined') {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('network', networkName);
        const updatedUrl = `${router.pathname}?${queryParams.toString()}`;
        router.replace(updatedUrl, undefined, { shallow: true });
      }
    },
    [router],
  );

  const setNetwork = useCallback(
    (newNetwork: INetwork) => {
      setNetworkState(newNetwork);

      // Sync with wagmi
      const chain = getChainByNetworkName(newNetwork.name);
      if (chain && switchChain) {
        try {
          switchChain({ chainId: chain.id });
        } catch (error) {
          console.warn('Failed to switch chain:', error);
        }
      }

      // Update URL
      updateUrlWithNetwork(newNetwork.name.toLowerCase());

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('erc725InspectNetwork', newNetwork.name);
      }
    },
    [switchChain, updateUrlWithNetwork],
  );

  // Initialize from URL on mount
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const networkFromUrl = getNetworkFromUrlOrDefault();
    if (networkFromUrl.name !== network.name) {
      setNetworkState(networkFromUrl);

      // Sync with wagmi
      const chain = getChainByNetworkName(networkFromUrl.name);
      if (chain && switchChain && currentChainId !== chain.id) {
        try {
          switchChain({ chainId: chain.id });
        } catch (error) {
          console.warn('Failed to switch chain on mount:', error);
        }
      }
    }

    const networkParam = router.query.network;
    if (networkParam === undefined) {
      updateUrlWithNetwork(networkFromUrl.name.toLowerCase());
    }
  }, [router.isReady, router.query.network]);

  // Save to localStorage whenever network changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('erc725InspectNetwork', network.name);
    }
  }, [network]);

  return { network, setNetwork };
}
