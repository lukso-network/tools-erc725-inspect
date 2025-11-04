export enum NetworkName {
  LUKSO_MAINNET = 'LUKSO Mainnet',
  LUKSO_TESTNET = 'LUKSO Testnet',
  ETHEREUM_MAINNET = 'Ethereum Mainnet',
  ETHEREUM_SEPOLIA = 'Ethereum Sepolia',
  BASE_MAINNET = 'Base Mainnet',
  BASE_SEPOLIA = 'Base Sepolia',
  LOCALHOST = 'Localhost',
}

export interface INetwork {
  name: NetworkName;
  rpc: string;
  imgUrl?: string;
}
