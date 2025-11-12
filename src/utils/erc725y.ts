/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Jean Cavallera <CJ42>
 */
import { createPublicClient, http, type Address } from 'viem';

// types
import { INetwork } from '@/types/network';

// utils
import { getChainByNetworkName } from '@/config/wagmi';

// abis
// TODO: might be better to use typed ERC725Y ABIs since we also use the `getData(bytes32)` function for digital assets
import { universalProfileAbi } from '@lukso/universalprofile-contracts/abi';

export const getDataBatch = async (
  address: string,
  keys: `0x${string}`[],
  network: INetwork,
): Promise<readonly `0x${string}`[]> => {
  const publicClient = createPublicClient({
    chain: getChainByNetworkName(network.name),
    transport: http(network.rpcUrl),
  });

  let data: readonly `0x${string}`[] = [];
  try {
    data = await publicClient.readContract({
      address: address as Address,
      abi: universalProfileAbi,
      functionName: 'getDataBatch',
      args: [keys],
    });
  } catch (err: any) {
    console.log(err.message);
  }

  return data;
};

export const getData = async (
  address: string,
  key: string,
  network: INetwork,
): Promise<string | null> => {
  const publicClient = createPublicClient({
    chain: getChainByNetworkName(network.name),
    transport: http(network.rpcUrl),
  });

  let data: string | null = null;
  try {
    data = await publicClient.readContract({
      address: address as Address,
      abi: universalProfileAbi,
      functionName: 'getData',
      args: [key as `0x${string}`],
    });
  } catch (err: any) {
    console.log(err.message);
  }

  return data;
};
