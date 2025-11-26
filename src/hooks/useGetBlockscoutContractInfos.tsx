import { NetworkContext } from '@/contexts/NetworksContext';
import { AddressDocument } from '@/generated/graphql';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { useContext, useEffect, useRef, useState } from 'react';
import { type Address, isAddress } from 'viem';
import {
  extractImplementationAddressFromMinimalProxyBytecode,
  getTransparentProxyImplementationAddress,
  isMinimalProxyBytecode,
} from '@/utils/contract-info';

export type ProxyType = 'transparent-upgradable-proxy' | 'minimal-proxy';

export type BlockscoutContractInfosResult = {
  isLoading: boolean;
  isContract: boolean;
  isProxy: ProxyType | undefined;
  implementationAddress: string | undefined;
  contractName: string | undefined;
  abi: any[] | undefined;
};

export function useGetBlockscoutContractInfos(
  address: string,
): BlockscoutContractInfosResult {
  const { network } = useContext(NetworkContext);
  const currentAddressRef = useRef<string>(address);

  const [isContract, setIsContract] = useState(false);
  const [isProxy, setIsProxy] = useState<ProxyType | undefined>(undefined);
  const [implementationAddress, setImplementationAddress] = useState<
    Address | undefined
  >(undefined);
  const [contractName, setContractName] = useState<string>();
  const [abi, setAbi] = useState([]);

  const queryBlockscoutData = async (address: Address) => {
    const apiEndpoint = network.explorerBaseUrl
      ? network.explorerBaseUrl.endsWith('/')
        ? `${network.explorerBaseUrl}api/v1/graphql`
        : `${network.explorerBaseUrl}/api/v1/graphql`
      : 'https://explorer.execution.mainnet.lukso.network/api/v1/graphql';

    const { address: blockscoutData } = await request(
      apiEndpoint,
      AddressDocument,
      {
        address,
      },
    );

    return blockscoutData;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['blockscout_data', address, network?.name],
    queryFn: async () => {
      if (
        !network ||
        network.explorerName !== 'Blockscout' ||
        !isAddress(address)
      ) {
        return null;
      }

      // Store the address for this query to check later
      const queryAddress = address;

      const blockscoutData = await queryBlockscoutData(address);

      // Only update state if address hasn't changed during async operations
      if (currentAddressRef.current !== queryAddress) {
        return blockscoutData;
      }

      const isTransparentUpgradableProxy =
        blockscoutData?.smartContract?.name === 'TransparentUpgradeableProxy';

      if (isTransparentUpgradableProxy) {
        const implementationAddress =
          await getTransparentProxyImplementationAddress(address, network);

        // Check again before setting state (address might have changed during async call)
        if (
          implementationAddress &&
          currentAddressRef.current === queryAddress
        ) {
          setIsProxy('transparent-upgradable-proxy');
          setImplementationAddress(implementationAddress);
          const blockscoutDataImplementation = await queryBlockscoutData(
            implementationAddress,
          );
          return blockscoutDataImplementation;
        }
      }

      // Detect if the contract is a minimal proxy. If it is extract implementation address from the bytecode.
      if (isMinimalProxyBytecode(blockscoutData?.contractCode)) {
        const implementationAddress =
          extractImplementationAddressFromMinimalProxyBytecode(
            blockscoutData?.contractCode,
          );

        // Check again before setting state (address might have changed during async call)
        if (
          implementationAddress &&
          isAddress(implementationAddress) &&
          currentAddressRef.current === queryAddress
        ) {
          setIsProxy('minimal-proxy');
          setImplementationAddress(implementationAddress);
          const blockscoutDataImplementation = await queryBlockscoutData(
            implementationAddress,
          );
          return blockscoutDataImplementation;
        }
      }

      return blockscoutData;
    },
  });

  // Reset state when address changes (before new query starts)
  useEffect(() => {
    currentAddressRef.current = address;
    setIsContract(false);
    setIsProxy(undefined);
    setImplementationAddress(undefined);
    setContractName(undefined);
    setAbi([]);
  }, [address]);

  useEffect(() => {
    // Only update state if this data belongs to the current address
    if (currentAddressRef.current !== address) {
      return;
    }

    if (!data) {
      // Only reset if we have no data and we're not loading (query completed with null)
      if (!isLoading) {
        setIsContract(false);
        setIsProxy(undefined);
        setImplementationAddress(undefined);
        setContractName(undefined);
        setAbi([]);
      }
      return;
    }

    if (data?.contractCode && typeof data.contractCode === 'string') {
      setIsContract(data.contractCode.length > 0);
    } else {
      setIsContract(false);
    }

    if (
      data?.smartContract?.name &&
      typeof data.smartContract.name === 'string'
    ) {
      setContractName(data.smartContract.name);
    } else {
      setContractName(undefined);
    }

    if (
      data?.smartContract?.abi &&
      typeof data.smartContract.abi === 'string'
    ) {
      setAbi(JSON.parse(data.smartContract.abi));
    } else {
      setAbi([]);
    }

    // Note: isProxy and implementationAddress are set in queryFn for proxy contracts
    // For non-proxy contracts, they remain undefined (already reset when address changed)
  }, [data, isLoading, address]);

  return {
    isLoading,
    isContract,
    isProxy,
    implementationAddress,
    contractName,
    abi,
  };
}
