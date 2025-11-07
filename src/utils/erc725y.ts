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
import { getDataAbi, getDataBatchAbi } from '@/constants/abi';

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
      abi: getDataBatchAbi,
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
      abi: getDataAbi,
      functionName: 'getData',
      args: [key as `0x${string}`],
    });
  } catch (err: any) {
    console.log(err.message);
  }

  return data;
};
