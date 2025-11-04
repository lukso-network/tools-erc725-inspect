import { INetwork, NetworkName } from '@/types/network';

// Network Connections
export const RPC_URL: Record<NetworkName, string> = {
  [NetworkName.LUKSO_MAINNET]: 'https://rpc.mainnet.lukso.network',
  [NetworkName.LUKSO_TESTNET]: 'https://rpc.testnet.lukso.network',
  [NetworkName.ETHEREUM_MAINNET]: 'https://ethereum.publicnode.com',
  [NetworkName.ETHEREUM_SEPOLIA]: 'https://ethereum-sepolia.publicnode.com',
  [NetworkName.BASE_MAINNET]: 'https://base.publicnode.com',
  [NetworkName.BASE_SEPOLIA]: 'https://base-sepolia-rpc.publicnode.com',
  [NetworkName.LOCALHOST]: 'http://localhost:8545',
};

export const EXPLORER_BASE_URL: Record<NetworkName, string> = {
  [NetworkName.LUKSO_MAINNET]: 'https://explorer.lukso.network',
  [NetworkName.LUKSO_TESTNET]:
    'https://explorer.execution.testnet.lukso.network',
  [NetworkName.ETHEREUM_MAINNET]: 'https://etherscan.io',
  [NetworkName.ETHEREUM_SEPOLIA]: 'https://sepolia.etherscan.io',
  [NetworkName.BASE_MAINNET]: 'https://basescan.org',
  [NetworkName.BASE_SEPOLIA]: 'https://sepolia.basescan.org',
  [NetworkName.LOCALHOST]: 'http://localhost:3000',
};

export const CHAINS: INetwork[] = [
  {
    name: NetworkName.LUKSO_MAINNET,
    rpc: RPC_URL[NetworkName.LUKSO_MAINNET],
    imgUrl: '/lukso-signet-fuschia.svg',
  },
  {
    name: NetworkName.LUKSO_TESTNET,
    rpc: RPC_URL[NetworkName.LUKSO_TESTNET],
    imgUrl: '/lukso-signet-yellow.svg',
  },
  {
    name: NetworkName.ETHEREUM_MAINNET,
    rpc: RPC_URL[NetworkName.ETHEREUM_MAINNET],
    imgUrl: '/ethereum-logo.svg',
  },
  {
    name: NetworkName.ETHEREUM_SEPOLIA,
    rpc: RPC_URL[NetworkName.ETHEREUM_SEPOLIA],
    imgUrl: '/ethereum-logo-blue.svg',
  },
  {
    name: NetworkName.BASE_MAINNET,
    rpc: RPC_URL[NetworkName.BASE_MAINNET],
    imgUrl: '/base-logo.svg',
  },
  {
    name: NetworkName.BASE_SEPOLIA,
    rpc: RPC_URL[NetworkName.BASE_SEPOLIA],
    imgUrl: '/base-logo-yellow.svg',
  },
  {
    name: NetworkName.LOCALHOST,
    rpc: RPC_URL[NetworkName.LOCALHOST],
    imgUrl: '/lukso-signet-black.svg',
  },
];
