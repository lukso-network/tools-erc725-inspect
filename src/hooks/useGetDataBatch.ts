import { useReadContract } from 'wagmi';
import type { Address } from 'viem';
import { useContext } from 'react';
import { NetworkContext } from '@/contexts/NetworksContext';
import { getChainIdByNetworkName } from '@/config/wagmi';

export const getDataBatchAbi = [
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'dataKeys',
        type: 'bytes32[]',
      },
    ],
    name: 'getDataBatch',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'dataValues',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export function useGetDataBatch(
  address: Address | undefined,
  dataKeys: string[] | undefined
) {
  const { network } = useContext(NetworkContext);
  const chainId = getChainIdByNetworkName(network.name);

  return useReadContract({
    address,
    abi: getDataBatchAbi,
    functionName: 'getDataBatch',
    args: dataKeys ? [dataKeys as `0x${string}`[]] : undefined,
    chainId,
    query: {
      enabled: !!address && !!dataKeys && dataKeys.length > 0,
    },
  });
}

