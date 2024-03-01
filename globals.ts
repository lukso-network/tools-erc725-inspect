// Network Connections

import { NetworkName } from './types/network';

export const RPC_URL: Record<NetworkName, string> = {
  [NetworkName.MAINNET]: 'https://rpc.lukso.gateway.fm',
  [NetworkName.TESTNET]: 'https://rpc.testnet.lukso.gateway.fm',
};

export const EXPLORER_BASE_URL: Record<NetworkName, string> = {
  [NetworkName.MAINNET]: 'https://explorer.execution.mainnet.lukso.network',
  [NetworkName.TESTNET]: 'https://explorer.execution.testnet.lukso.network',
};

// Data Source
export const LUKSO_IPFS_BASE_URL = 'https://api.universalprofile.cloud/ipfs';

export const UP_RECOVERY_ADDRESSES: Record<NetworkName, string[]> = {
  [NetworkName.MAINNET]: [
    '0xD6ebB3C5C1836f5377d134c303f4EBb053562f6f',
    '0x2e90C2ff7E9bbD9381c8e4eA030666f9c6090727',
    '0x9F44982B472431bEdeFC1DC92149Ca2ea09820aa',
    '0x348EA31074263385a87e2B83f5aB58a7678205F7',
    '0x22e4F54586676158B7D5251e457383E499903617',
    '0x5827b91d84050d3A8e159C27E16B0d7426F66aEB',
    '0x4a252E46A640FB2C45f0E74BAC9448F68fe66d63',
    '0xeB7A7B91B5B7188c098Cb64DD01F59C9D876566d',
    '0xBE8EA52CA32c51024E8B11C2719d9Edb94B21D16',
    '0x242387F645a327af3f1E34F3A9A9032BeEe69fb0',
  ],
  [NetworkName.TESTNET]: [
    '0xb13B12848dbE8dDf87027Fa2c26aBeF0118a5EB7',
    '0x08019bf6606367d4D5f74082634d3eA0692adf93',
  ],
};

// Mainnet AND Testnet
export const LSP1_DELEGATE_ADDRESS = [
  '0xA5467dfe7019bF2C7C5F7A707711B9d4cAD118c8', // 0.12.1
  '0x7870C5B8BC9572A8001C3f96f7ff59961B23500D', // 0.14.0
];
