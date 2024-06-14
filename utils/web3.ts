/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import Web3 from 'web3';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';
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
  MULTICALL_CONTRACT_ADDRESS,
  aggregateABI,
} from '../constants';
import { AbiItem } from 'web3-utils';

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

export const checkInterface = async (address: string, web3: Web3) => {
  // aggregate multiple supportsInterface calls in a batch Multicall for efficiency
  const supportsContractInterface = await checkSupportedInterfaces(
    address,
    [
      INTERFACE_IDS.ERC725X,
      INTERFACE_IDS.ERC725Y,
      INTERFACE_IDS.ERC1271,
      INTERFACE_IDS.LSP0ERC725Account,
      INTERFACE_IDS.LSP1UniversalReceiver,
      INTERFACE_IDS.LSP6KeyManager,
      INTERFACE_IDS.LSP9Vault,
      INTERFACE_IDS.ERC721,
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
    isErc725X: supportsContractInterface[0],
    isErc725Y: supportsContractInterface[1],
    isErc1271: supportsContractInterface[2],
    isLsp0Erc725Account: supportsContractInterface[3],
    isLsp1UniversalReceiver: supportsContractInterface[4],
    isLsp6KeyManager: supportsContractInterface[5],
    isLsp7DigitalAsset:
      supportsAssetInterface[0] ||
      supportsAssetInterface[1] ||
      supportsAssetInterface[2],
    isLsp8IdentifiableDigitalAsset:
      supportsAssetInterface[3] ||
      supportsAssetInterface[4] ||
      supportsAssetInterface[5],
    isLsp9Vault: supportsContractInterface[6],
    isERC721: supportsContractInterface[7],
  };
};

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
