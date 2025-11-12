// Interface Detection
export const eip165Abi = [
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

// ERC725Y
export const getDataAbi = [
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
] as const;

export const getDataBatchAbi = [
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
] as const;

// ERC725 Ownership
export const ownerAbi = [
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// LSP Smart Contract version
export const versionAbi = [
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
