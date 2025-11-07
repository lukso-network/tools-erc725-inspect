import { useReadContract } from 'wagmi';
import type { Address } from 'viem';
import { useContext } from 'react';
import { NetworkContext } from '@/contexts/NetworksContext';
import { getChainIdByNetworkName } from '@/config/wagmi';
import { getDataBatchAbi } from '@/constants/abi';

export function useGetDataBatch(
  address: Address | undefined,
  dataKeys: string[] | undefined,
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
