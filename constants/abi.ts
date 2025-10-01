import { AbiItem } from 'web3-utils';

// Interface Detection
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

// ERC725Y
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

// LSP Smart Contract version
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

// Multicall
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
