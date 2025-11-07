/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
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
  eip165ABI,
  getDataBatchABI,
  getDataABI,
  VersionABI,
  aggregateABI,
} from '@/constants/abi';
import {
  GNOSIS_SAFE,
  GNOSIS_SAFE_PROXY_BYTECODE,
  MULTICALL_CONTRACT_ADDRESS,
} from '@/constants/contracts';
import { LUKSO_IPFS_BASE_URL } from '@/constants/links';
import type { SupportedInterfaces } from '@/types/contract';

export const checkInterface = async (
  address: string,
  web3: Web3,
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
    web3,
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
    web3,
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
  web3: Web3,
): Promise<boolean[]> {
  const eip165Instance = new web3.eth.Contract(eip165ABI);

  const supportsInterfaceCalls: [string, string][] = interfaceIds.map(
    (interfaceId) => {
      const result: [string, string] = [
        assetAddress,
        eip165Instance.methods.supportsInterface(interfaceId).encodeABI(),
      ];
      return result;
    },
  );
  const response = await aggregateCalls(supportsInterfaceCalls, web3);

  return response.map((entry) => {
    try {
      return web3.eth.abi.decodeParameter('bool', entry) as unknown as boolean;
    } catch (decodingError) {
      console.warn(
        'Could not decode `supportsInterface` return data from aggregate call as `boolean`: ',
        decodingError,
      );
      return false;
    }
  });
}

export const aggregateCalls = async (
  calls: [string, string][],
  web3: Web3,
): Promise<string[]> => {
  try {
    const multiCallContract = new web3.eth.Contract(
      aggregateABI,
      MULTICALL_CONTRACT_ADDRESS,
    );

    const result = await multiCallContract.methods.aggregate(calls).call();
    return result.returnData;
  } catch (error) {
    console.warn('could not aggregate results: ', error);
    return ['', ''];
  }
};

export async function checkIsGnosisSafe(
  address: string,
  web3: Web3,
): Promise<{ isSafe: boolean; version?: string }> {
  const codeAt = await web3.eth.getCode(address);

  if (codeAt != GNOSIS_SAFE_PROXY_BYTECODE) {
    return { isSafe: false };
  }

  // in the Solidity code of the Gnosis Safe proxy, the address of the singleton (= implementation)
  // is always the first declared variable. This variable is set to `internal` and does not have a getter
  // to reduce deployment costs.
  //
  // example: https://explorer.execution.mainnet.lukso.network/address/0x14C2041eD166e00A8Ed2adad8c9C7389b3Dd87fb?tab=contract
  const valueAtStorageSlot0 = await web3.eth.getStorageAt(address, 0);

  const implementationAddress = web3.eth.abi.decodeParameter(
    'address',
    valueAtStorageSlot0,
  ) as unknown as string;

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
  web3: Web3,
): Promise<string> => {
  const Contract = new web3.eth.Contract(VersionABI, address);

  try {
    const result = await Contract.methods.VERSION().call();
    if (result == '') {
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
  keys: string[],
  web3: Web3,
) => {
  const Contract = new web3.eth.Contract(getDataBatchABI as AbiItem[], address);

  let data: string[] = [];
  try {
    data = await Contract.methods.getDataBatch(keys).call();
  } catch (err: any) {
    console.log(err.message);
  }

  return data;
};

export const getData = async (
  address: string,
  key: string,
  web3: Web3,
): Promise<string | null> => {
  const Contract = new web3.eth.Contract(getDataABI, address);

  let data: string | null = null;
  try {
    data = await Contract.methods.getData(key).call();
  } catch (err: any) {
    console.log(err.message);
  }

  return data;
};

export const getProfileMetadataJSON = async (
  address: string,
  web3: Web3,
): Promise<any> => {
  const erc725js = new ERC725(LSP3Schema, address, web3.currentProvider, {
    ipfsGateway: LUKSO_IPFS_BASE_URL + '/',
    gas: 20_000_000, // high gas to fetch large amount of metadata
  });

  const lsp3ProfileValue = await erc725js.fetchData('LSP3Profile');

  if (!lsp3ProfileValue) return null;

  return lsp3ProfileValue;
};
