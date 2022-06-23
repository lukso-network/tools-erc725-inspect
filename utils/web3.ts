/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import Web3 from 'web3';

import { ERC725Y_INTERFACE_IDS } from '@erc725/erc725.js/build/main/src/lib/constants';

const ERC725X_INTERFACE_ID = '0x44c028fe';

export const getDataMultiple = async (
  address: string,
  keys: string[],
  web3: Web3,
) => {
  const Contract = new web3.eth.Contract(
    [
      {
        type: 'function',
        stateMutability: 'view',
        outputs: [
          {
            type: 'bytes[]',
            name: '',
            internalType: 'bytes[]',
          },
        ],
        name: 'getDataMultiple',
        inputs: [
          {
            type: 'bytes32[]',
            name: '_keys',
            internalType: 'bytes32[]',
          },
        ],
      },
    ],
    address,
  );

  let dataMultiple: string[] = [];
  try {
    dataMultiple = await Contract.methods.getDataMultiple(keys).call();
  } catch (err: any) {
    console.log(err.message);

    console.log('getDataMultiple not working, fetching with getData');
    dataMultiple = await Promise.all(
      keys.map((key) => getDataLegacy(address, web3, key)),
    );
  }

  return dataMultiple;
};

/**
 * For contracts deployed with version bellow: 0.1.3
 * @lukso/universalprofile-smart-contracts
 */
export const getDataLegacy = async (
  address: string,
  web3: Web3,
  key: string,
) => {
  const Contract = new web3.eth.Contract(
    [
      {
        type: 'function',
        stateMutability: 'view',
        outputs: [
          {
            type: 'bytes',
            name: '_value',
            internalType: 'bytes',
          },
        ],
        name: 'getData',
        inputs: [
          {
            type: 'bytes32',
            name: '_key',
            internalType: 'bytes32',
          },
        ],
      },
    ],
    address,
  );

  let data;
  try {
    data = await Contract.methods.getData(key).call();
  } catch (err: any) {
    console.log(err.message);
  }

  return data;
};

/**
 * For contracts deployed with version above: 0.1.3
 * @lukso/lsp-smart-contracts
 */
export const getData = async (address: string, keys: string[], web3: Web3) => {
  const Contract = new web3.eth.Contract(
    [
      {
        stateMutability: 'view',
        type: 'function',
        inputs: [
          {
            internalType: 'bytes32[]',
            name: '_keys',
            type: 'bytes32[]',
          },
        ],
        name: 'getData',
        outputs: [
          {
            internalType: 'bytes[]',
            name: 'values',
            type: 'bytes[]',
          },
        ],
      },
    ],
    address,
  );

  let data: string[] = [];
  try {
    data = await Contract.methods.getData(keys).call();
  } catch (err: any) {
    console.log(err.message);
  }

  return data;
};

export const checkInterface = async (address: string, web3: Web3) => {
  const Contract = new web3.eth.Contract(
    [
      {
        type: 'function',
        stateMutability: 'view',
        outputs: [
          {
            type: 'bool',
            name: '',
            internalType: 'bool',
          },
        ],
        name: 'supportsInterface',
        inputs: [
          {
            type: 'bytes4',
            name: 'interfaceId',
            internalType: 'bytes4',
          },
        ],
      },
    ],
    address,
  );

  let isErc725X = false;
  try {
    isErc725X = await Contract.methods
      .supportsInterface(ERC725X_INTERFACE_ID)
      .call();
  } catch (err: any) {
    console.log(err.message);
  }

  let isErc725Y = false;
  try {
    isErc725Y = await Contract.methods
      .supportsInterface(ERC725Y_INTERFACE_IDS['3.0'])
      .call();
  } catch (err: any) {
    console.log(err.message);
  }

  let isErc725Y_v2 = false;
  try {
    isErc725Y_v2 = await Contract.methods
      .supportsInterface(ERC725Y_INTERFACE_IDS['2.0'])
      .call();
  } catch (err: any) {
    console.log(err.message);
  }

  let isErc725YLegacy = false;
  if (!isErc725Y) {
    try {
      isErc725YLegacy = await Contract.methods
        .supportsInterface(ERC725Y_INTERFACE_IDS.legacy)
        .call();
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return {
    isErc725X,
    isErc725Y,
    isErc725Y_v2,
    isErc725YLegacy,
  };
};

export const getAllDataKeys = async (
  address: string,
  web3: Web3,
): Promise<string[]> => {
  const Contract = new web3.eth.Contract(
    [
      {
        type: 'function',
        stateMutability: 'view',
        outputs: [
          {
            type: 'bytes32[]',
            name: '',
            internalType: 'bytes32[]',
          },
        ],
        name: 'allDataKeys',
        inputs: [],
      },
    ],
    address,
  );

  let allDataKeys = [];
  try {
    allDataKeys = await Contract.methods.allDataKeys().call();
  } catch (err: any) {
    console.log(err.message);
  }

  return allDataKeys;
};
