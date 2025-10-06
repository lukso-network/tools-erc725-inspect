import { INetwork, NetworkName } from '@/types/network';

// Network Connections
export const RPC_URL: Record<NetworkName, string> = {
  [NetworkName.MAINNET]: 'https://rpc.mainnet.lukso.network',
  [NetworkName.TESTNET]: 'https://rpc.testnet.lukso.network',
  [NetworkName.LOCALHOST]: 'http://localhost:8545',
};

export const EXPLORER_BASE_URL: Record<NetworkName, string> = {
  [NetworkName.MAINNET]: 'https://explorer.lukso.network',
  [NetworkName.TESTNET]: 'https://explorer.execution.testnet.lukso.network',
  [NetworkName.LOCALHOST]: 'http://localhost:3000',
};

export const CHAINS: INetwork[] = [
  {
    name: NetworkName.MAINNET,
    rpc: RPC_URL[NetworkName.MAINNET],
    imgUrl: '/lukso-signet-fuschia.svg',
  },
  {
    name: NetworkName.TESTNET,
    rpc: RPC_URL[NetworkName.TESTNET],
    imgUrl: '/lukso-signet-yellow.svg',
  },
  {
    name: NetworkName.LOCALHOST,
    rpc: RPC_URL[NetworkName.LOCALHOST],
    imgUrl: '/lukso-signet-black.svg',
  },
];
