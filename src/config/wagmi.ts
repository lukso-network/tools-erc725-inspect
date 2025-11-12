import { createConfig, http } from 'wagmi';
import {
  lukso,
  luksoTestnet,
  mainnet,
  sepolia,
  base,
  baseSepolia,
} from 'viem/chains';
import { defineChain } from 'viem';
import { NetworkName } from '@/types/network';

// Define localhost chain
export const localhost = defineChain({
  id: 31337,
  name: 'Localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:8545'],
    },
  },
});

// Map of network names to viem chains
export const chainsByNetworkName = {
  [NetworkName.LUKSO_MAINNET]: lukso,
  [NetworkName.LUKSO_TESTNET]: luksoTestnet,
  [NetworkName.ETHEREUM_MAINNET]: mainnet,
  [NetworkName.ETHEREUM_SEPOLIA]: sepolia,
  [NetworkName.BASE_MAINNET]: base,
  [NetworkName.BASE_SEPOLIA]: baseSepolia,
  [NetworkName.LOCALHOST]: localhost,
};

// Create wagmi config
export const config = createConfig({
  chains: [lukso, luksoTestnet, mainnet, sepolia, base, baseSepolia, localhost],
  transports: {
    [lukso.id]: http(),
    [luksoTestnet.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [localhost.id]: http(),
  },
});

// Helper function to get chain by network name
export function getChainByNetworkName(networkName: NetworkName) {
  return chainsByNetworkName[networkName];
}

// Helper function to get chain ID by network name
export function getChainIdByNetworkName(networkName: NetworkName): number {
  const chain = chainsByNetworkName[networkName];
  return chain?.id ?? lukso.id; // default to LUKSO mainnet
}
