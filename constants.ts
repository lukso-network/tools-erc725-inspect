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
  MAINNET_UP = '0x0F4180da178ed1C71398a57ca8Cb177F69591f1f',
  TESTNET_UP = '0x027b6f7be4399727d4e0132c2cE027Cd3e015364',
  MAINNET_LSP7 = '0x8DA488C29FB873c9561cCF5FF44Dda6C1DedDC37',
  TESTNET_LS7 = '0x41b35F490EB6325001fC94E92C58b9d9CC61586D',
}
