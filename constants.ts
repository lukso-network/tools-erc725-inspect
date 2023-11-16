// ABI for Interface Detection
export const eip165ABI = [
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

// Sample Address Inputs
export enum SAMPLE_ADDRESS {
  MAINNET_UP = '0x29d7c7E4571a83B3eF5C867f75c81D736a9D58aa',
  TESTNET_UP = '0x027b6f7be4399727d4e0132c2cE027Cd3e015364',
  MAINNET_LSP7 = '0x',
  TESTNET_LS7 = '0xD02629cdA51b46408348CE94D1D28200524FFC33',
}
