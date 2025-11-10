/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The address (40 (hex) characters / 160 bits / 20 bytes) is derived from the public key (128 (hex) characters /
   * 512 bits / 64 bytes) which is derived from the private key (64 (hex) characters / 256 bits / 32 bytes).
   *
   * The address is actually the last 40 characters of the keccak-256 hash of the public key with `0x` appended.
   */
  AddressHash: { input: any; output: any; }
  /**
   * An unpadded hexadecimal number with 0 or more digits. Each pair of digits
   * maps directly to a byte in the underlying binary representation. When
   * interpreted as a number, it should be treated as big-endian.
   */
  Data: { input: any; output: any; }
  /**
   * The `DateTime` scalar type represents a date and time in the UTC
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string, including UTC timezone ("Z"). The parsed date and time string will
   * be converted to UTC if there is an offset.
   */
  DateTime: { input: any; output: any; }
  /**
   * The `Decimal` scalar type represents signed double-precision fractional
   * values parsed by the `Decimal` library. The Decimal appears in a JSON
   * response as a string to preserve precision.
   */
  Decimal: { input: any; output: any; }
  /** A 32-byte [KECCAK-256](https://en.wikipedia.org/wiki/SHA-3) hash. */
  FullHash: { input: any; output: any; }
  /**
   * The `JSON` scalar type represents arbitrary JSON string data, represented as UTF-8
   * character sequences. The JSON type is most often used to represent a free-form
   * human-readable JSON string.
   */
  Json: { input: any; output: any; }
  /** The nonce (16 (hex) characters / 128 bits / 8 bytes) is derived from the Proof-of-Work. */
  NonceHash: { input: any; output: any; }
  /**
   * The smallest fractional unit of Ether. Using wei instead of ether allows code to do integer match instead of using
   * floats.
   *
   * See [Ethereum Homestead Documentation](http://ethdocs.org/en/latest/ether.html) for examples of various denominations of wei.
   *
   * Etymology of "wei" comes from [Wei Dai (戴維)](https://en.wikipedia.org/wiki/Wei_Dai), a
   * [cypherpunk](https://en.wikipedia.org/wiki/Cypherpunk) who came up with b-money, which outlined modern
   * cryptocurrencies.
   */
  Wei: { input: any; output: any; }
};

/** A stored representation of a Web3 address. */
export type Address = {
  __typename?: 'Address';
  contractCode?: Maybe<Scalars['Data']['output']>;
  fetchedCoinBalance?: Maybe<Scalars['Wei']['output']>;
  fetchedCoinBalanceBlockNumber?: Maybe<Scalars['Int']['output']>;
  gasUsed?: Maybe<Scalars['Int']['output']>;
  hash?: Maybe<Scalars['AddressHash']['output']>;
  nonce?: Maybe<Scalars['Int']['output']>;
  smartContract?: Maybe<SmartContract>;
  tokenTransfers?: Maybe<TokenTransferConnection>;
  tokenTransfersCount?: Maybe<Scalars['Int']['output']>;
  transactions?: Maybe<TransactionConnection>;
  transactionsCount?: Maybe<Scalars['Int']['output']>;
};


/** A stored representation of a Web3 address. */
export type AddresstokenTransfersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A stored representation of a Web3 address. */
export type AddresstransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SortOrder>;
};

/**
 * A package of data that contains zero or more transactions, the hash of the previous block ("parent"), and optionally
 * other data. Because each block (except for the initial "genesis block") points to the previous block, the data
 * structure that they form is called a "blockchain".
 */
export type Block = {
  __typename?: 'Block';
  baseFeePerGas?: Maybe<Scalars['Wei']['output']>;
  consensus?: Maybe<Scalars['Boolean']['output']>;
  difficulty?: Maybe<Scalars['Decimal']['output']>;
  gasLimit?: Maybe<Scalars['Decimal']['output']>;
  gasUsed?: Maybe<Scalars['Decimal']['output']>;
  hash?: Maybe<Scalars['FullHash']['output']>;
  isEmpty?: Maybe<Scalars['Boolean']['output']>;
  minerHash?: Maybe<Scalars['AddressHash']['output']>;
  nonce?: Maybe<Scalars['NonceHash']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  parentHash?: Maybe<Scalars['FullHash']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  totalDifficulty?: Maybe<Scalars['Decimal']['output']>;
};

export enum CallType {
  CALL = 'CALL',
  CALLCODE = 'CALLCODE',
  DELEGATECALL = 'DELEGATECALL',
  STATICCALL = 'STATICCALL'
}

/** Represents a CELO or usd token transfer between addresses. */
export type CeloTransfer = Node & {
  __typename?: 'CeloTransfer';
  blockNumber?: Maybe<Scalars['Int']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  fromAccountHash?: Maybe<Scalars['AddressHash']['output']>;
  fromAddressHash?: Maybe<Scalars['AddressHash']['output']>;
  gasPrice?: Maybe<Scalars['Wei']['output']>;
  gasUsed?: Maybe<Scalars['Decimal']['output']>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  input?: Maybe<Scalars['String']['output']>;
  logIndex?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  toAccountHash?: Maybe<Scalars['AddressHash']['output']>;
  toAddressHash?: Maybe<Scalars['AddressHash']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  tokenAddress?: Maybe<Scalars['String']['output']>;
  tokenId?: Maybe<Scalars['Decimal']['output']>;
  tokenType?: Maybe<Scalars['String']['output']>;
  transactionHash?: Maybe<Scalars['FullHash']['output']>;
  value?: Maybe<Scalars['Decimal']['output']>;
};

export type CeloTransferConnection = {
  __typename?: 'CeloTransferConnection';
  edges?: Maybe<Array<Maybe<CeloTransferEdge>>>;
  pageInfo: PageInfo;
};

export type CeloTransferEdge = {
  __typename?: 'CeloTransferEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<CeloTransfer>;
};

/** Models internal transactions. */
export type InternalTransaction = Node & {
  __typename?: 'InternalTransaction';
  blockHash?: Maybe<Scalars['FullHash']['output']>;
  blockIndex?: Maybe<Scalars['Int']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  callType?: Maybe<CallType>;
  createdContractAddressHash?: Maybe<Scalars['AddressHash']['output']>;
  createdContractCode?: Maybe<Scalars['Data']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  fromAddressHash?: Maybe<Scalars['AddressHash']['output']>;
  gas?: Maybe<Scalars['Decimal']['output']>;
  gasUsed?: Maybe<Scalars['Decimal']['output']>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  init?: Maybe<Scalars['Data']['output']>;
  input?: Maybe<Scalars['Data']['output']>;
  output?: Maybe<Scalars['Data']['output']>;
  toAddressHash?: Maybe<Scalars['AddressHash']['output']>;
  traceAddress?: Maybe<Scalars['Json']['output']>;
  transactionHash?: Maybe<Scalars['FullHash']['output']>;
  transactionIndex?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Type>;
  value?: Maybe<Scalars['Wei']['output']>;
};

export type InternalTransactionConnection = {
  __typename?: 'InternalTransactionConnection';
  edges?: Maybe<Array<Maybe<InternalTransactionEdge>>>;
  pageInfo: PageInfo;
};

export type InternalTransactionEdge = {
  __typename?: 'InternalTransactionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<InternalTransaction>;
};

export enum Language {
  SOLIDITY = 'SOLIDITY',
  VYPER = 'VYPER',
  YUL = 'YUL'
}

export type Node = {
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  /** Gets an address by hash. */
  address?: Maybe<Address>;
  /** Gets addresses by address hash. */
  addresses?: Maybe<Array<Maybe<Address>>>;
  /** Gets a block by number. */
  block?: Maybe<Block>;
  node?: Maybe<Node>;
  tokenTransferTxs?: Maybe<TransferTransactionConnection>;
  /** Gets token transfers by token contract address hash. */
  tokenTransfers?: Maybe<TokenTransferConnection>;
  /** Gets a transaction by hash. */
  transaction?: Maybe<Transaction>;
};


export type RootQueryTypeaddressArgs = {
  hash: Scalars['AddressHash']['input'];
};


export type RootQueryTypeaddressesArgs = {
  hashes: Array<Scalars['AddressHash']['input']>;
};


export type RootQueryTypeblockArgs = {
  number: Scalars['Int']['input'];
};


export type RootQueryTypenodeArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryTypetokenTransferTxsArgs = {
  addressHash?: InputMaybe<Scalars['AddressHash']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type RootQueryTypetokenTransfersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  tokenContractAddressHash: Scalars['AddressHash']['input'];
};


export type RootQueryTypetransactionArgs = {
  hash: Scalars['FullHash']['input'];
};

export type RootSubscriptionType = {
  __typename?: 'RootSubscriptionType';
  tokenTransfers?: Maybe<Array<Maybe<TokenTransfer>>>;
};


export type RootSubscriptionTypetokenTransfersArgs = {
  tokenContractAddressHash: Scalars['AddressHash']['input'];
};

/**
 * The representation of a verified Smart Contract.
 *
 * "A contract in the sense of Solidity is a collection of code (its functions)
 * and data (its state) that resides at a specific address on the Ethereum
 * blockchain."
 * http://solidity.readthedocs.io/en/v0.4.24/introduction-to-smart-contracts.html
 */
export type SmartContract = {
  __typename?: 'SmartContract';
  abi?: Maybe<Scalars['Json']['output']>;
  addressHash?: Maybe<Scalars['AddressHash']['output']>;
  compilerSettings?: Maybe<Scalars['Json']['output']>;
  compilerVersion?: Maybe<Scalars['String']['output']>;
  constructorArguments?: Maybe<Scalars['String']['output']>;
  contractSourceCode?: Maybe<Scalars['String']['output']>;
  evmVersion?: Maybe<Scalars['String']['output']>;
  externalLibraries?: Maybe<Scalars['Json']['output']>;
  filePath?: Maybe<Scalars['String']['output']>;
  isChangedBytecode?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Language>;
  name?: Maybe<Scalars['String']['output']>;
  optimization?: Maybe<Scalars['Boolean']['output']>;
  optimizationRuns?: Maybe<Scalars['Int']['output']>;
  partiallyVerified?: Maybe<Scalars['Boolean']['output']>;
  verifiedViaEthBytecodeDb?: Maybe<Scalars['Boolean']['output']>;
  verifiedViaSourcify?: Maybe<Scalars['Boolean']['output']>;
};

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum Status {
  ERROR = 'ERROR',
  OK = 'OK'
}

/** Represents a token. */
export type Token = {
  __typename?: 'Token';
  circulatingMarketCap?: Maybe<Scalars['Decimal']['output']>;
  contractAddressHash?: Maybe<Scalars['AddressHash']['output']>;
  decimals?: Maybe<Scalars['Decimal']['output']>;
  holderCount?: Maybe<Scalars['Int']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  totalSupply?: Maybe<Scalars['Decimal']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  volume24h?: Maybe<Scalars['Decimal']['output']>;
};

/** Represents a token transfer between addresses. */
export type TokenTransfer = Node & {
  __typename?: 'TokenTransfer';
  amount?: Maybe<Scalars['Decimal']['output']>;
  amounts?: Maybe<Array<Maybe<Scalars['Decimal']['output']>>>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  fromAddressHash?: Maybe<Scalars['AddressHash']['output']>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  logIndex?: Maybe<Scalars['Int']['output']>;
  toAddressHash?: Maybe<Scalars['AddressHash']['output']>;
  token?: Maybe<Token>;
  tokenContractAddressHash?: Maybe<Scalars['AddressHash']['output']>;
  tokenIds?: Maybe<Array<Maybe<Scalars['Decimal']['output']>>>;
  transaction?: Maybe<Transaction>;
  transactionHash?: Maybe<Scalars['FullHash']['output']>;
};

export type TokenTransferConnection = {
  __typename?: 'TokenTransferConnection';
  edges?: Maybe<Array<Maybe<TokenTransferEdge>>>;
  pageInfo: PageInfo;
};

export type TokenTransferEdge = {
  __typename?: 'TokenTransferEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<TokenTransfer>;
};

/** Models a Web3 transaction. */
export type Transaction = Node & {
  __typename?: 'Transaction';
  block?: Maybe<Block>;
  blockHash?: Maybe<Scalars['FullHash']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  createdContractAddressHash?: Maybe<Scalars['AddressHash']['output']>;
  cumulativeGasUsed?: Maybe<Scalars['Decimal']['output']>;
  earliestProcessingStart?: Maybe<Scalars['DateTime']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  fromAddressHash?: Maybe<Scalars['AddressHash']['output']>;
  gas?: Maybe<Scalars['Decimal']['output']>;
  gasPrice?: Maybe<Scalars['Wei']['output']>;
  gasUsed?: Maybe<Scalars['Decimal']['output']>;
  hasErrorInInternalTransactions?: Maybe<Scalars['Boolean']['output']>;
  hash?: Maybe<Scalars['FullHash']['output']>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  input?: Maybe<Scalars['String']['output']>;
  internalTransactions?: Maybe<InternalTransactionConnection>;
  maxFeePerGas?: Maybe<Scalars['Wei']['output']>;
  maxPriorityFeePerGas?: Maybe<Scalars['Wei']['output']>;
  nonce?: Maybe<Scalars['NonceHash']['output']>;
  r?: Maybe<Scalars['Decimal']['output']>;
  revertReason?: Maybe<Scalars['String']['output']>;
  s?: Maybe<Scalars['Decimal']['output']>;
  status?: Maybe<Status>;
  toAddressHash?: Maybe<Scalars['AddressHash']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
  v?: Maybe<Scalars['Decimal']['output']>;
  value?: Maybe<Scalars['Wei']['output']>;
};


/** Models a Web3 transaction. */
export type TransactioninternalTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type TransactionConnection = {
  __typename?: 'TransactionConnection';
  edges?: Maybe<Array<Maybe<TransactionEdge>>>;
  pageInfo: PageInfo;
};

export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<Transaction>;
};

/** Represents a CELO token transfer between addresses. */
export type TransferTransaction = Node & {
  __typename?: 'TransferTransaction';
  addressHash?: Maybe<Scalars['AddressHash']['output']>;
  blockNumber?: Maybe<Scalars['Int']['output']>;
  feeCurrency?: Maybe<Scalars['AddressHash']['output']>;
  feeToken?: Maybe<Scalars['String']['output']>;
  gasPrice?: Maybe<Scalars['Wei']['output']>;
  gasUsed?: Maybe<Scalars['Decimal']['output']>;
  gatewayFee?: Maybe<Scalars['AddressHash']['output']>;
  gatewayFeeRecipient?: Maybe<Scalars['AddressHash']['output']>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  input?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  tokenTransfer?: Maybe<CeloTransferConnection>;
  transactionHash?: Maybe<Scalars['FullHash']['output']>;
};


/** Represents a CELO token transfer between addresses. */
export type TransferTransactiontokenTransferArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  count?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type TransferTransactionConnection = {
  __typename?: 'TransferTransactionConnection';
  edges?: Maybe<Array<Maybe<TransferTransactionEdge>>>;
  pageInfo: PageInfo;
};

export type TransferTransactionEdge = {
  __typename?: 'TransferTransactionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<TransferTransaction>;
};

export enum Type {
  CALL = 'CALL',
  CREATE = 'CREATE',
  REWARD = 'REWARD',
  SELFDESTRUCT = 'SELFDESTRUCT'
}

export type AddressQueryVariables = Exact<{
  address: Scalars['AddressHash']['input'];
}>;


export type AddressQuery = { __typename?: 'RootQueryType', address?: { __typename?: 'Address', contractCode?: any | null, balance?: any | null, smartContract?: { __typename?: 'SmartContract', name?: string | null, abi?: any | null } | null } | null };


export const AddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Address"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddressHash"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hash"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"balance"},"name":{"kind":"Name","value":"fetchedCoinBalance"}},{"kind":"Field","name":{"kind":"Name","value":"contractCode"}},{"kind":"Field","name":{"kind":"Name","value":"smartContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"abi"}}]}}]}}]}}]} as unknown as DocumentNode<AddressQuery, AddressQueryVariables>;