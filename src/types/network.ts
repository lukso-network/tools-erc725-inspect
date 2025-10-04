export enum NetworkName {
  MAINNET = 'MAINNET',
  TESTNET = 'TESTNET',
  LOCALHOST = 'LOCALHOST',
}

export interface INetwork {
  name: NetworkName;
  rpc: string;
  imgUrl?: string;
}
