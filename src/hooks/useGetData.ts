import { useReadContract } from 'wagmi';
import type { Address } from 'viem';
import { useContext } from 'react';
import { NetworkContext } from '@/contexts/NetworksContext';
import { getChainIdByNetworkName } from '@/config/wagmi';

export const getDataAbi = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'dataKey',
        type: 'bytes32',
      },
    ],
    name: 'getData',
    outputs: [
      {
        internalType: 'bytes',
        name: 'dataValue',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export function useGetData(address: Address | undefined, dataKey: string | undefined) {
  const { network } = useContext(NetworkContext);
  const chainId = getChainIdByNetworkName(network.name);

  return useReadContract({
    address,
    abi: getDataAbi,
    functionName: 'getData',
    args: dataKey ? [dataKey as `0x${string}`] : undefined,
    chainId,
    query: {
      enabled: !!address && !!dataKey,
    },
  });
}

