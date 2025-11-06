import { useReadContract } from 'wagmi';
import type { Address } from 'viem';

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
  return useReadContract({
    address,
    abi: getDataBatchAbi,
    functionName: 'getDataBatch',
    args: dataKeys ? [dataKeys as `0x${string}`[]] : undefined,
    query: {
      enabled: !!address && !!dataKeys && dataKeys.length > 0,
    },
  });
}

