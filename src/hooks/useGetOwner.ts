import { useReadContract } from 'wagmi';
import type { Address } from 'viem';

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
  return useReadContract({
    address,
    abi: ownerAbi,
    functionName: 'owner',
    query: {
      enabled: !!address,
    },
  });
}

