/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Jean Cavallera <CJ42>
 */
import {
  createPublicClient,
  http,
  type Address,
  decodeAbiParameters,
  parseAbiParameters,
} from 'viem';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';
import LSP3Schema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import ERC725 from '@erc725/erc725.js';

import {
  INTERFACE_ID_LSP7,
  INTERFACE_ID_LSP7_PREVIOUS,
} from '@lukso/lsp7-contracts';
import {
  INTERFACE_ID_LSP8_PREVIOUS,
  INTERFACE_ID_LSP8,
} from '@lukso/lsp8-contracts';

import {
  GNOSIS_SAFE,
  GNOSIS_SAFE_PROXY_BYTECODE,
} from '@/constants/contracts';
import { LUKSO_IPFS_BASE_URL } from '@/constants/links';
import type { SupportedInterfaces } from '@/types/contract';
import { getDataBatchAbi } from '@/hooks/useGetDataBatch';
import { getDataAbi } from '@/hooks/useGetData';
import { INetwork } from '@/types/network';
import { getChainByNetworkName } from '@/config/wagmi';

const eip165Abi = [
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const versionAbi = [
  {
    inputs: [],
    name: 'VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const checkInterface = async (
  address: string,
  network: INetwork,
): Promise<SupportedInterfaces> => {
  // aggregate multiple supportsInterface calls in a batch Multicall for efficiency
  const supportsContractInterface = await checkSupportedInterfaces(
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
  const supportsAssetInterface = await checkSupportedInterfaces(
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

async function checkSupportedInterfaces(
  assetAddress: string,
  interfaceIds: string[],
  network: INetwork,
): Promise<boolean[]> {
  try {
    const publicClient = createPublicClient({
      chain: getChainByNetworkName(network.name),
      transport: http(network.rpcUrl),
    });
    console.log("publicClient: ", publicClient)

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

export async function checkIsGnosisSafe(
  address: string,
  network: INetwork,
): Promise<{ isSafe: boolean; version?: string }> {
  const publicClient = createPublicClient({
    chain: getChainByNetworkName(network.name),
    transport: http(network.rpcUrl),
  });

  const codeAt = await publicClient.getCode({
    address: address as Address,
  });

  if (codeAt !== GNOSIS_SAFE_PROXY_BYTECODE) {
    return { isSafe: false };
  }

  // in the Solidity code of the Gnosis Safe proxy, the address of the singleton (= implementation)
  // is always the first declared variable. This variable is set to `internal` and does not have a getter
  // to reduce deployment costs.
  //
  // example: https://explorer.execution.mainnet.lukso.network/address/0x14C2041eD166e00A8Ed2adad8c9C7389b3Dd87fb?tab=contract
  const valueAtStorageSlot0 = await publicClient.getStorageAt({
    address: address as Address,
    slot: '0x0',
  });

  if (!valueAtStorageSlot0) {
    return { isSafe: false };
  }

  const [implementationAddress] = decodeAbiParameters(
    parseAbiParameters('address'),
    valueAtStorageSlot0,
  );

  const safeImplementation = GNOSIS_SAFE.find(
    (safeVersion) => safeVersion.address === implementationAddress,
  );

  if (!safeImplementation) {
    return { isSafe: false };
  }

  return {
    isSafe: true,
    version: safeImplementation.version,
  };
}

export const getVersion = async (
  address: string,
  network: INetwork,
): Promise<string> => {
  const publicClient = createPublicClient({
    chain: getChainByNetworkName(network.name),
    transport: http(network.rpcUrl),
  });

  try {
    const result = await publicClient.readContract({
      address: address as Address,
      abi: versionAbi,
      functionName: 'VERSION',
    });
    if (result === '') {
      return 'unknown';
    }
    return result;
  } catch (error) {
    console.warn(
      'Could not fetch smart contract version for contract at address ',
      address,
    );
    return 'unknown';
  }
};

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

export const getProfileMetadataJSON = async (
  address: string,
  rpcUrl: string,
): Promise<any> => {
  const erc725js = new ERC725(LSP3Schema, address, rpcUrl, {
    ipfsGateway: LUKSO_IPFS_BASE_URL + '/',
    gas: 20_000_000, // high gas to fetch large amount of metadata
  });

  const lsp3ProfileValue = await erc725js.fetchData('LSP3Profile');

  if (!lsp3ProfileValue) return null;

  return lsp3ProfileValue;
};
