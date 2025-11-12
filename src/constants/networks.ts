import { INetwork, NetworkName } from '@/types/network';

export const CHAINS: INetwork[] = [
  {
    name: NetworkName.LUKSO_MAINNET,
    rpcUrl: 'https://rpc.mainnet.lukso.network',
    explorerName: 'Blockscout',
    explorerBaseUrl: 'https://explorer.execution.mainnet.lukso.network',
    imgUrl: '/lukso-signet-fuschia.svg',
  },
  {
    name: NetworkName.LUKSO_TESTNET,
    rpcUrl: 'https://rpc.testnet.lukso.network',
    explorerName: 'Blockscout',
    explorerBaseUrl: 'https://explorer.execution.testnet.lukso.network',
    imgUrl: '/lukso-signet-yellow.svg',
  },
  {
    name: NetworkName.ETHEREUM_MAINNET,
    rpcUrl: 'https://ethereum.publicnode.com',
    explorerName: 'Etherscan',
    explorerBaseUrl: 'https://etherscan.io',
    imgUrl: '/ethereum-logo.svg',
  },
  {
    name: NetworkName.ETHEREUM_SEPOLIA,
    rpcUrl: 'https://ethereum-sepolia.publicnode.com',
    explorerName: 'Etherscan',
    explorerBaseUrl: 'https://sepolia.etherscan.io',
    imgUrl: '/ethereum-logo-blue.svg',
  },
  {
    name: NetworkName.BASE_MAINNET,
    rpcUrl: 'https://base.publicnode.com',
    explorerName: 'Basescan',
    explorerBaseUrl: 'https://basescan.org',
    imgUrl: '/base-logo.svg',
  },
  {
    name: NetworkName.BASE_SEPOLIA,
    rpcUrl: 'https://base-sepolia-rpc.publicnode.com',
    explorerName: 'Basescan',
    explorerBaseUrl: 'https://sepolia.basescan.org',
    imgUrl: '/base-logo-yellow.svg',
  },
  {
    name: NetworkName.LOCALHOST,
    rpcUrl: 'http://localhost:8545',
    explorerBaseUrl: 'http://localhost:3000',
    imgUrl: '/lukso-signet-black.svg',
  },
];
