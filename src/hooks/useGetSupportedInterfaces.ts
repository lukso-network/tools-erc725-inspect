import { useState, useEffect, useCallback, useContext } from 'react';
import type { Address } from 'viem';
import type { SupportedInterfaces } from '@/types/contract';
import { checkInterface } from '@/utils/web3';
import { NetworkContext } from '@/contexts/NetworksContext';

export function useGetSupportedInterfaces(address: Address | undefined) {
  const { network } = useContext(NetworkContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [supportedInterfaces, setSupportedInterfaces] = useState<SupportedInterfaces | undefined>(undefined);

  const fetchInterfaces = useCallback(async () => {
    if (!address || !network?.rpcUrl) {
      setSupportedInterfaces(undefined);
      return;
    }

    setIsLoading(true);
    setIsError(false);

    try {
      const interfaces = await checkInterface(address, network);
      setSupportedInterfaces(interfaces);
    } catch (error) {
      console.error('Error checking interfaces:', error);
      setIsError(true);
      setSupportedInterfaces(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [address, network?.rpcUrl]);

  useEffect(() => {
    fetchInterfaces();
  }, [fetchInterfaces]);

  return {
    supportedInterfaces,
    isLoading,
    isError,
    refetch: fetchInterfaces,
  };
}
