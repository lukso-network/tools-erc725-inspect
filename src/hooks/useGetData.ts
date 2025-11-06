import { useReadContract } from 'wagmi';
import type { Address } from 'viem';

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
  return useReadContract({
    address,
    abi: getDataAbi,
    functionName: 'getData',
    args: dataKey ? [dataKey as `0x${string}`] : undefined,
    query: {
      enabled: !!address && !!dataKey,
    },
  });
}

