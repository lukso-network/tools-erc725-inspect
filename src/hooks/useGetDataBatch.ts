import { useReadContract } from 'wagmi';
import type { Address, Hex } from 'viem';
import { useContext } from 'react';
import { NetworkContext } from '@/contexts/NetworksContext';
import { getChainIdByNetworkName } from '@/config/wagmi';

// TODO: might be better to use typed ERC725Y ABIs since we also use the `getDataBatch(bytes32[])` function for digital assets
import { universalProfileAbi } from '@lukso/universalprofile-contracts/abi';

export function useGetDataBatch(
  address: Address | undefined,
  dataKeys: string[] | undefined,
) {
  const { network } = useContext(NetworkContext);
  const chainId = getChainIdByNetworkName(network.name);

  return useReadContract({
    address,
    abi: universalProfileAbi,
    functionName: 'getDataBatch',
    args: dataKeys ? [dataKeys as Hex[]] : undefined,
    chainId,
    query: {
      enabled: !!address && !!dataKeys && dataKeys.length > 0,
    },
  });
}
