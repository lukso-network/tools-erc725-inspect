import { LSP0_TYPE_IDS } from '@lukso/lsp0-contracts';
import { LSP7_TYPE_IDS } from '@lukso/lsp7-contracts';
import { LSP8_TYPE_IDS } from '@lukso/lsp8-contracts';
import { LSP26_TYPE_IDS } from '@lukso/lsp26-contracts';

export type CrossChainImplementationContract = {
  address: string;
  version: string;
};

export type SupportedInterfaces = {
  // Account Standards
  isErc725X: boolean;
  isErc725Y: boolean;
  isErc1271: boolean;
  isLsp0Erc725Account: boolean;
  isLsp1UniversalReceiver: boolean;
  isLsp17Extendable: boolean;
  isLsp25ExecuteRelayCall: boolean;
  // Access Control Standards
  isLsp6KeyManager: boolean;
  isLsp14OwnableTwoSteps: boolean;
  isLsp20CallVerification: boolean;
  isLsp20CallVerifier: boolean;
  // Asset Standards
  isLsp7DigitalAsset: boolean;
  isLsp8IdentifiableDigitalAsset: boolean;
  isErc20: boolean;
  isErc721: boolean;
  // Other Standards
  isLsp1Delegate: boolean;
  isLsp9Vault: boolean;
  isLsp17Extension: boolean;
  isLsp26FollowerSystem: boolean;
};

export const CONTRACT_INTERFACE_KEYS = [
  'isErc725X',
  'isErc725Y',
  'isErc1271',
  'isLsp0Erc725Account',
  'isLsp1UniversalReceiver',
  'isLsp17Extendable',
  'isLsp25ExecuteRelayCall',
  'isLsp6KeyManager',
  'isLsp14OwnableTwoSteps',
  'isLsp20CallVerification',
  'isLsp20CallVerifier',
  'isLsp7DigitalAsset',
  'isLsp8IdentifiableDigitalAsset',
  'isErc20',
  'isErc721',
  'isLsp1Delegate',
  'isLsp9Vault',
  'isLsp17Extension',
  'isLsp26FollowerSystem',
] as const satisfies ReadonlyArray<keyof SupportedInterfaces>;

export type LSP1DelegateTypeIdName =
  | keyof typeof LSP7_TYPE_IDS
  | keyof typeof LSP8_TYPE_IDS
  | keyof typeof LSP26_TYPE_IDS
  | keyof typeof LSP0_TYPE_IDS;
