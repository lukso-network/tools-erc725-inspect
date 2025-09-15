import { AbiItem } from 'web3-utils';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

// ABI for Interface Detection
export const eip165ABI: AbiItem[] = [
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

export const getDataABI: AbiItem[] = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'dataKey',
        type: 'bytes32',
      },
    ],
    name: 'getData',
    outputs: [
      {
        internalType: 'bytes',
        name: 'dataValue',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const getDataBatchABI = [
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'dataKeys',
        type: 'bytes32[]',
      },
    ],
    name: 'getDataBatch',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'dataValues',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const VersionABI: AbiItem[] = [
  {
    inputs: [],
    name: 'VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const aggregateABI: AbiItem[] = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall3.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes[]',
        name: 'returnData',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
];

// Deployed at the same address on both Testnet + Mainnet
export const MULTICALL_CONTRACT_ADDRESS =
  '0xcA11bde05977b3631167028862bE2a173976CA11';

// Sample Address Inputs
export enum SAMPLE_ADDRESS {
  MAINNET_UP = '0x0F4180da178ed1C71398a57ca8Cb177F69591f1f',
  TESTNET_UP = '0x027b6f7be4399727d4e0132c2cE027Cd3e015364',
  MAINNET_LSP7 = '0x8DA488C29FB873c9561cCF5FF44Dda6C1DedDC37',
  TESTNET_LS7 = '0x41b35F490EB6325001fC94E92C58b9d9CC61586D',
}

export const ACCOUNT_INTERFACE_IDS = {
  ERC725X: {
    interfaceId: INTERFACE_IDS.ERC725X,
    docsUrl:
      'https://docs.lukso.tech/standards/accounts/lsp0-erc725account#erc725x---generic-executor',
  },
  ERC725Y: {
    interfaceId: INTERFACE_IDS.ERC725Y,
    docsUrl:
      'https://docs.lukso.tech/standards/accounts/lsp0-erc725account#erc725y---generic-key-value-store',
  },
  ERC1271: {
    interfaceId: INTERFACE_IDS.ERC1271,
    docsUrl: 'https://eips.ethereum.org/EIPS/eip-1271',
  },
  LSP0ERC725Account: {
    interfaceId: INTERFACE_IDS.LSP0ERC725Account,
    docsUrl: 'https://docs.lukso.tech/standards/accounts/lsp0-erc725account',
  },
  LSP1UniversalReceiver: {
    interfaceId: INTERFACE_IDS.LSP1UniversalReceiver,
    docsUrl:
      'https://docs.lukso.tech/standards/accounts/lsp1-universal-receiver',
  },
  LSP17Extendable: {
    interfaceId: INTERFACE_IDS.LSP17Extendable,
    docsUrl:
      'https://docs.lukso.tech/standards/accounts/lsp17-contract-extension/',
  },
  LSP25ExecuteRelayCall: {
    interfaceId: INTERFACE_IDS.LSP25ExecuteRelayCall,
    docsUrl:
      'https://docs.lukso.tech/standards/accounts/lsp25-execute-relay-call/',
  },
};

export const ACCESS_CONTROL_INTERFACE_IDS = {
  LSP6KeyManager: {
    interfaceId: INTERFACE_IDS.LSP6KeyManager,
    docsUrl:
      'https://docs.lukso.tech/standards/access-control/lsp6-key-manager',
  },
  LSP14OwnableTwoSteps: {
    interfaceId: INTERFACE_IDS.LSP14Ownable2Step,
    docsUrl:
      'https://docs.lukso.tech/standards/access-control/lsp14-ownable-2-step/',
  },
  LSP20CallVerification: {
    interfaceId: INTERFACE_IDS.LSP20CallVerification,
    docsUrl:
      'https://docs.lukso.tech/standards/accounts/lsp20-call-verification/#introduction',
  },
  LSP20CallVerifier: {
    interfaceId: INTERFACE_IDS.LSP20CallVerifier,
    docsUrl:
      'https://docs.lukso.tech/standards/accounts/lsp20-call-verification/#verification-receiving-contract-logic-verifier',
  },
};

export const ASSETS_INTERFACE_IDS = {
  LSP7DigitalAsset: {
    interfaceId: INTERFACE_IDS.LSP7DigitalAsset,
    docsUrl: 'https://docs.lukso.tech/standards/tokens/LSP7-Digital-Asset',
  },
  LSP8IdentifiableDigitalAsset: {
    interfaceId: INTERFACE_IDS.LSP8IdentifiableDigitalAsset,
    docsUrl:
      'https://docs.lukso.tech/standards/tokens/LSP8-Identifiable-Digital-Asset',
  },
  ERC20: {
    interfaceId: INTERFACE_IDS.ERC20,
    docsUrl: 'https://eips.ethereum.org/EIPS/eip-20',
  },
  ERC721: {
    interfaceId: INTERFACE_IDS.ERC721,
    docsUrl: 'https://eips.ethereum.org/EIPS/eip-721',
  },
};

export const OTHER_INTERFACE_IDS = {
  LSP1Delegate: {
    interfaceId: INTERFACE_IDS.LSP1UniversalReceiverDelegate,
    docsUrl:
      'https://docs.lukso.tech/standards/accounts/lsp1-universal-receiver-delegate/',
  },
  LSP9Vault: {
    interfaceId: INTERFACE_IDS.LSP9Vault,
    docsUrl: 'https://docs.lukso.tech/standards/accounts/lsp9-vault',
  },
  LSP17Extension: {
    interfaceId: INTERFACE_IDS.LSP17Extension,
    docsUrl:
      'https://docs.lukso.tech/standards/accounts/lsp17-contract-extension/#extendable-vs-extension-contracts',
  },
  LSP26FollowerSystem: {
    interfaceId: INTERFACE_IDS.LSP26FollowerSystem,
    docsUrl:
      'https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-26-FollowerSystem.md',
  },
};
