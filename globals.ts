// Network Connections

import { NetworkName } from './types/network';

export const RPC_URL: Record<NetworkName, string> = {
  [NetworkName.MAINNET]: 'https://rpc.mainnet.lukso.network',
  [NetworkName.TESTNET]: 'https://rpc.testnet.lukso.network',
  [NetworkName.LOCALHOST]: 'http://localhost:8545',
};

export const EXPLORER_BASE_URL: Record<NetworkName, string> = {
  [NetworkName.MAINNET]: 'https://explorer.execution.mainnet.lukso.network',
  [NetworkName.TESTNET]: 'https://explorer.execution.testnet.lukso.network',
  [NetworkName.LOCALHOST]: 'http://localhost:3000',
};

// Data Source
export const LUKSO_IPFS_BASE_URL = 'https://api.universalprofile.cloud/ipfs';

// Docs links
export const LSP_SPECS_URL = {
  LSP2: 'https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md',
  LSP25:
    'https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-25-ExecuteRelayCall.md',
  LSP26:
    'https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-26-FollowerSystem.md',
};

// Sample Address Inputs
// TODO: refactor with enum like below as Hugo always suggested
export enum SAMPLE_ADDRESS {
  MAINNET_UP = '0x26e7Da1968cfC61FB8aB2Aad039b5A083b9De21e',
  TESTNET_UP = '0x027b6f7be4399727d4e0132c2cE027Cd3e015364',
  MAINNET_LSP7 = '0x8DA488C29FB873c9561cCF5FF44Dda6C1DedDC37',
  TESTNET_LS7 = '0x41b35F490EB6325001fC94E92C58b9d9CC61586D',
  MAINNET_LSP8 = '0x86e817172b5c07f7036bf8aa46e2db9063743a83',
  TESTNET_LSP8 = '0x00aB25152E666Fcdf541Df9F46b3847F1c7887A0',
}

export const LUKSO_UP_RECOVERY_ADDRESSES: Record<NetworkName, string[]> = {
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
  [NetworkName.LOCALHOST]: [],
};

// Mainnet AND Testnet
export const LUKSO_LSP1_DELEGATE_VERSIONS = {
  '0xA5467dfe7019bF2C7C5F7A707711B9d4cAD118c8': '0.12.1',
  '0x7870C5B8BC9572A8001C3f96f7ff59961B23500D': '0.14.0',
};

// Mainnet only
export const LSP1_GRAVE_FORWARDER =
  '0x42562196ee7AaC3E8501db777B25ffc976ed8463';

// Mainnet AND Testnet
export const GNOSIS_SAFE_IMPLEMENTATION =
  '0x3E5c63644E683549055b9Be8653de26E0B4CD36E';

export const GNOSIS_SAFE_PROXY_DEPLOYED_BYTECODE =
  '0x608060405273ffffffffffffffffffffffffffffffffffffffff600054167fa619486e0000000000000000000000000000000000000000000000000000000060003514156050578060005260206000f35b3660008037600080366000845af43d6000803e60008114156070573d6000fd5b3d6000f3fea2646970667358221220d1429297349653a4918076d650332de1a1068c5f3e07c5c82360c277770b955264736f6c63430007060033';

// Deployed at the same address on both Testnet + Mainnet
export const MULTICALL_CONTRACT_ADDRESS =
  '0xcA11bde05977b3631167028862bE2a173976CA11';
