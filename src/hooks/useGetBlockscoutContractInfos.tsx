import { NetworkContext } from '@/contexts/NetworksContext';
import { AddressDocument } from '@/generated/graphql';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { useContext, useEffect, useState } from 'react';
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

  const [isContract, setIsContract] = useState(false);
  const [isProxy, setIsProxy] = useState<ProxyType | undefined>(undefined);
  const [implementationAddress, setImplementationAddress] = useState<
    Address | undefined
  >(undefined);
  const [contractName, setContractName] = useState<string>();
  const [abi, setAbi] = useState([]);

  const queryBlockscoutData = async (address: Address) => {
    const { address: blockscoutData } = await request(
      network.explorerBaseUrl
        ? network.explorerBaseUrl.endsWith('/')
          ? `${network.explorerBaseUrl}api/v1/graphql`
          : `${network.explorerBaseUrl}/api/v1/graphql`
        : 'https://explorer.execution.mainnet.lukso.network/api/v1/graphql',
      AddressDocument,
      {
        address,
      },
    );

    return blockscoutData;
  };

  const { data, isFetched, isLoading } = useQuery({
    queryKey: ['blockscout_data', address, network?.name],
    queryFn: async () => {
      if (!network || !isAddress(address)) return null;

      const blockscoutData = await queryBlockscoutData(address);
      console.log('blockscoutData', blockscoutData);

      const isTransparentUpgradableProxy =
        blockscoutData?.smartContract?.name === 'TransparentUpgradeableProxy';

      if (isTransparentUpgradableProxy) {
        console.log('transparent upgradable proxy detected');
        const implementationAddress =
          await getTransparentProxyImplementationAddress(address, network);
        console.log('implementationAddress', implementationAddress);

        if (implementationAddress) {
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

        if (implementationAddress && isAddress(implementationAddress)) {
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

  useEffect(() => {
    console.log('data', data);
    if (data?.contractCode && typeof data.contractCode === 'string') {
      setIsContract(data.contractCode.length > 0);
    }
    if (
      data?.smartContract?.name &&
      typeof data.smartContract.name === 'string'
    ) {
      setContractName(data.smartContract.name);
    }
    if (
      data?.smartContract?.abi &&
      typeof data.smartContract.abi === 'string'
    ) {
      setAbi(JSON.parse(data.smartContract.abi));
    }
  }, [data, isLoading, isFetched]);

  return {
    isLoading,
    isContract,
    isProxy,
    implementationAddress,
    contractName,
    abi,
  };
}
