/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import Web3 from 'web3';
import { ERC725YDataKeys, INTERFACE_IDS } from '@lukso/lsp-smart-contracts';
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
} from '@/constants';
import { AbiItem } from 'web3-utils';
import {
  GNOSIS_SAFE_IMPLEMENTATION,
  GNOSIS_SAFE_PROXY_DEPLOYED_BYTECODE,
} from '@/globals';
import LSP7Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';

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
  const supportsContractInterface = await getSupportedInterfaces(
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
  const supportsAssetInterface = await getSupportedInterfaces(
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

async function getSupportedInterfaces(
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

export async function getAssetInfosAndBalance(
  assetAddress: string,
  userAddress: string,
  isLSP7: boolean,
  web3: Web3,
): Promise<string[] | undefined[]> {
  const tokenContract = new web3.eth.Contract(
    LSP7Artifact.abi as AbiItem[],
    assetAddress,
  );

  const viewCalls: [string, string][] = [
    [
      assetAddress,
      tokenContract.methods
        .getData(ERC725YDataKeys.LSP4.LSP4TokenName)
        .encodeABI(),
    ],
    [
      assetAddress,
      tokenContract.methods
        .getData(ERC725YDataKeys.LSP4.LSP4TokenSymbol)
        .encodeABI(),
    ],
    [
      assetAddress,
      tokenContract.methods
        .getData(ERC725YDataKeys.LSP4.LSP4TokenType)
        .encodeABI(),
    ],
    [assetAddress, tokenContract.methods.balanceOf(userAddress).encodeABI()],
  ];

  if (isLSP7) {
    viewCalls.push([
      assetAddress,
      tokenContract.methods.decimals().encodeABI(),
    ]);
  }

  try {
    const response = await aggregateCalls(viewCalls, web3);

    // decode from an abi-encoded `bytes` type to the raw bytes value to be then converted to:
    // - utf8 (for token name + symbol)
    // - uint256 (for token type)
    const decodedBytesName = web3.eth.abi.decodeParameter(
      'bytes',
      response[0],
    ) as unknown as string;
    const decodedBytesSymbol = web3.eth.abi.decodeParameter(
      'bytes',
      response[1],
    ) as unknown as string;
    const decodedBytesTokenType = web3.eth.abi.decodeParameter(
      'bytes',
      response[2],
    ) as unknown as string;

    const decodedStringName = web3.utils.toUtf8(decodedBytesName);
    const decodedStringSymbol = web3.utils.toUtf8(decodedBytesSymbol);
    const tokenTypeString = `${web3.eth.abi.decodeParameter(
      'uint256',
      decodedBytesTokenType,
    )}`;

    // format balance according to the decimals place
    let tokenBalance = web3.eth.abi.decodeParameter(
      'uint256',
      response[3],
    ) as unknown as string;

    if (isLSP7) {
      const decimals = web3.eth.abi.decodeParameter('uint8', response[4]);
      const unit =
        (decimals as unknown as string) == '18' ? 'ether' : 'noether';
      tokenBalance = web3.utils.fromWei(tokenBalance, unit);
    }

    return [
      decodedStringName,
      decodedStringSymbol,
      tokenTypeString,
      tokenBalance,
    ];
  } catch (error) {
    console.error(
      'could not aggregate calls and decode to read asset data: ',
      error,
    );

    // return new Array(4).fill(undefined);
    return [undefined, undefined, undefined, undefined];
  }
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

export async function checkIsGnosisSafe(
  address: string,
  web3: Web3,
): Promise<boolean> {
  const codeAt = await web3.eth.getCode(address);

  if (codeAt != GNOSIS_SAFE_PROXY_DEPLOYED_BYTECODE) {
    return false;
  }

  // in the Solidity code of the Gnosis Safe proxy, the address of the singleton (= implementation)
  // is always the first declared variable. This variable is set to `internal` and does not have a getter
  // to reduce deployment costs.
  //
  // example: https://explorer.execution.mainnet.lukso.network/address/0x14C2041eD166e00A8Ed2adad8c9C7389b3Dd87fb?tab=contract
  const valueAtStorageSlot0 = await web3.eth.getStorageAt(address, 0);

  const { implementationAddress } = web3.eth.abi.decodeParameter(
    'address',
    valueAtStorageSlot0,
  );

  return implementationAddress == GNOSIS_SAFE_IMPLEMENTATION;
}
