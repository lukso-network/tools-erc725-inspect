import { useReadContract } from 'wagmi';
import { isHex, type Address } from 'viem';
import { useContext } from 'react';
import { NetworkContext } from '@/contexts/NetworksContext';
import { getChainIdByNetworkName } from '@/config/wagmi';

// TODO: might be better to use typed ERC725Y ABIs since we also use the `getData(bytes32)` function for digital assets
import { universalProfileAbi } from '@lukso/universalprofile-contracts/abi';

export function useGetData(
  address: Address | undefined,
  dataKey: string | undefined,
) {
  const { network } = useContext(NetworkContext);
  const chainId = getChainIdByNetworkName(network.name);

  return useReadContract({
    address,
    abi: universalProfileAbi,
    functionName: 'getData',
    args: isHex(dataKey) ? [dataKey] : undefined,
    chainId,
    query: {
      enabled: !!address && !!dataKey,
    },
  });
}
