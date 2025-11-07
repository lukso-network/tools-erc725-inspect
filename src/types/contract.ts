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
