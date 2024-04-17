import { AbiItem } from 'web3-utils';

// ABI for Interface Detection
export const eip165ABI: AbiItem[] = [
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
];

export const getDataABI: AbiItem[] = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'dataKey',
        type: 'bytes32',
      },
    ],
    name: 'getData',
    outputs: [
      {
        internalType: 'bytes',
        name: 'dataValue',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const getDataBatchABI = [
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'dataKeys',
        type: 'bytes32[]',
      },
    ],
    name: 'getDataBatch',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'dataValues',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const VersionABI: AbiItem[] = [
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
];

export const aggregateABI: AbiItem[] = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall3.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes[]',
        name: 'returnData',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
];

// Deployed at the same address on both Testnet + Mainnet
export const MULTICALL_CONTRACT_ADDRESS =
  '0xcA11bde05977b3631167028862bE2a173976CA11';

// Sample Address Inputs
export enum SAMPLE_ADDRESS {
  MAINNET_UP = '0x0F4180da178ed1C71398a57ca8Cb177F69591f1f',
  TESTNET_UP = '0x027b6f7be4399727d4e0132c2cE027Cd3e015364',
  MAINNET_LSP7 = '0x8DA488C29FB873c9561cCF5FF44Dda6C1DedDC37',
  TESTNET_LS7 = '0x41b35F490EB6325001fC94E92C58b9d9CC61586D',
}
