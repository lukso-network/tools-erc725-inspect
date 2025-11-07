import { useReadContract } from 'wagmi';
import type { Address } from 'viem';
import { useContext } from 'react';
import { NetworkContext } from '@/contexts/NetworksContext';
import { getChainIdByNetworkName } from '@/config/wagmi';

export const ownerAbi = [
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export function useGetOwner(address: Address | undefined) {
  const { network } = useContext(NetworkContext);
  const chainId = getChainIdByNetworkName(network.name);

  return useReadContract({
    address,
    abi: ownerAbi,
    functionName: 'owner',
    chainId,
    query: {
      enabled: !!address,
    },
  });
}

