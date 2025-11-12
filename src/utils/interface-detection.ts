import { Address, createPublicClient, http } from 'viem';
import type { SupportedInterfaces } from '@/types/contract';
import { INetwork } from '@/types/network';

// utils
import { getChainByNetworkName } from '@/config/wagmi';

// constants
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';
import {
  INTERFACE_ID_LSP7,
  INTERFACE_ID_LSP7_PREVIOUS,
} from '@lukso/lsp7-contracts';
import {
  INTERFACE_ID_LSP8_PREVIOUS,
  INTERFACE_ID_LSP8,
} from '@lukso/lsp8-contracts';
import { eip165Abi } from '@/constants/abi';

export const getAllSupportedInterfaces = async (
  address: string,
  network: INetwork,
): Promise<SupportedInterfaces> => {
  // aggregate multiple supportsInterface calls in a batch Multicall for efficiency
  const supportsContractInterface = await checkSupportsInterfaces(
    address,
    [
      // Account Standards
      INTERFACE_IDS.ERC725X,
      INTERFACE_IDS.ERC725Y,
      INTERFACE_IDS.ERC1271,
      INTERFACE_IDS.LSP0ERC725Account,
      INTERFACE_IDS.LSP1UniversalReceiver,
      INTERFACE_IDS.LSP17Extendable,
      INTERFACE_IDS.LSP25ExecuteRelayCall,
      // Access Control Standards
      INTERFACE_IDS.LSP6KeyManager,
      INTERFACE_IDS.LSP14Ownable2Step,
      INTERFACE_IDS.LSP20CallVerification,
      INTERFACE_IDS.LSP20CallVerifier,
      // Asset Standards (non-LSP7/8)
      INTERFACE_IDS.ERC20,
      INTERFACE_IDS.ERC721,
      // Other Standards
      INTERFACE_IDS.LSP1UniversalReceiverDelegate,
      INTERFACE_IDS.LSP9Vault,
      INTERFACE_IDS.LSP17Extension,
      INTERFACE_IDS.LSP26FollowerSystem,
    ],
    network,
  );

  // digital assets need to be checked against multiple interface IDs
  const supportsAssetInterface = await checkSupportsInterfaces(
    address,
    [
      INTERFACE_ID_LSP7_PREVIOUS['v0.12.0'],
      INTERFACE_ID_LSP7_PREVIOUS['v0.14.0'],
      INTERFACE_ID_LSP7,
      INTERFACE_ID_LSP8_PREVIOUS['v0.12.0'],
      INTERFACE_ID_LSP8_PREVIOUS['v0.14.0'],
      INTERFACE_ID_LSP8,
    ],
    network,
  );

  return {
    // Account Standards
    isErc725X: supportsContractInterface[0],
    isErc725Y: supportsContractInterface[1],
    isErc1271: supportsContractInterface[2],
    isLsp0Erc725Account: supportsContractInterface[3],
    isLsp1UniversalReceiver: supportsContractInterface[4],
    isLsp17Extendable: supportsContractInterface[5],
    isLsp25ExecuteRelayCall: supportsContractInterface[6],
    // Access Control Standards
    isLsp6KeyManager: supportsContractInterface[7],
    isLsp14OwnableTwoSteps: supportsContractInterface[8],
    isLsp20CallVerification: supportsContractInterface[9],
    isLsp20CallVerifier: supportsContractInterface[10],
    // Asset Standards
    isLsp7DigitalAsset:
      supportsAssetInterface[0] ||
      supportsAssetInterface[1] ||
      supportsAssetInterface[2],
    isLsp8IdentifiableDigitalAsset:
      supportsAssetInterface[3] ||
      supportsAssetInterface[4] ||
      supportsAssetInterface[5],
    isErc20: supportsContractInterface[11],
    isErc721: supportsContractInterface[12],
    // Other Standards
    isLsp1Delegate: supportsContractInterface[13],
    isLsp9Vault: supportsContractInterface[14],
    isLsp17Extension: supportsContractInterface[15],
    isLsp26FollowerSystem: supportsContractInterface[16],
  };
};

async function checkSupportsInterfaces(
  assetAddress: string,
  interfaceIds: string[],
  network: INetwork,
): Promise<boolean[]> {
  try {
    const publicClient = createPublicClient({
      chain: getChainByNetworkName(network.name),
      transport: http(network.rpcUrl),
    });

    // Use viem's multicall which automatically uses the chain's multicall contract
    const results = await publicClient.multicall({
      contracts: interfaceIds.map((interfaceId) => ({
        address: assetAddress as Address,
        abi: eip165Abi,
        functionName: 'supportsInterface',
        args: [interfaceId as `0x${string}`],
      })),
      allowFailure: true, // Allow individual calls to fail without breaking the entire batch
    });

    return results.map((result) => {
      if (result.status === 'success') {
        return result.result as boolean;
      }
      return false;
    });
  } catch (error) {
    console.warn('Could not check supported interfaces: ', error);
    return interfaceIds.map(() => false);
  }
}
