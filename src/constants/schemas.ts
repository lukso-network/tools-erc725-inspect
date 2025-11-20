import type { ERC725JSONSchema } from '@erc725/erc725.js';
import { encodeKeyName } from '@erc725/erc725.js';
import LSP1JsonSchemas from '@erc725/erc725.js/schemas/LSP1UniversalReceiverDelegate.json';
import LSP3JsonSchemas from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import LSP4JsonSchemas from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import LSP5JsonSchemas from '@erc725/erc725.js/schemas/LSP5ReceivedAssets.json';
import LSP6JsonSchemas from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import LSP8JsonSchemas from '@erc725/erc725.js/schemas/LSP8IdentifiableDigitalAsset.json';
import LSP10JsonSchemas from '@erc725/erc725.js/schemas/LSP10ReceivedVaults.json';
import LSP12JsonSchemas from '@erc725/erc725.js/schemas/LSP12IssuedAssets.json';

import { LSP0_TYPE_IDS } from '@lukso/lsp0-contracts';
import { LSP7_TYPE_IDS } from '@lukso/lsp7-contracts';
import { LSP8_TYPE_IDS } from '@lukso/lsp8-contracts';
import { LSP26_TYPE_IDS } from '@lukso/lsp26-contracts';
import { Hex } from 'viem';
import { LSP1DelegateTypeIdName } from '@/types/contract';

export enum SchemaName {
  'LSP1UniversalReceiverDelegate' = 'LSP1UniversalReceiverDelegate',
  'SupportedStandards:LSP3Profile' = 'SupportedStandards:LSP3Profile',
  'LSP3Profile' = 'LSP3Profile',
  'LSP5ReceivedAssets[]' = 'LSP5ReceivedAssets[]',
  'AddressPermissions[]' = 'AddressPermissions[]',
  'LSP10Vaults[]' = 'LSP10Vaults[]',
  'LSP12IssuedAssets[]' = 'LSP12IssuedAssets[]',
  'LSP28TheGrid' = 'LSP28TheGrid',
}

export const SCHEMA_DOCS_LINKS: Record<SchemaName, string> = {
  LSP1UniversalReceiverDelegate:
    'https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver',
  'SupportedStandards:LSP3Profile':
    'https://docs.lukso.tech/standards/standard-detection',
  LSP3Profile:
    'https://docs.lukso.tech/standards/universal-profile/lsp3-profile-metadata',
  'LSP5ReceivedAssets[]':
    'https://docs.lukso.tech/standards/universal-profile/lsp5-received-assets',
  'AddressPermissions[]':
    'https://docs.lukso.tech/standards/access-control/lsp6-key-manager',
  'LSP10Vaults[]':
    'https://docs.lukso.tech/standards/universal-profile/lsp10-received-vaults',
  'LSP12IssuedAssets[]':
    'https://docs.lukso.tech/standards/universal-profile/lsp12-issued-assets',
  LSP28TheGrid: 'https://docs.lukso.tech/standards/standard-detection', // TODO: update with correct link
};

// prettier-ignore
export const LSP1TypeIdsDescriptions: Record<LSP1DelegateTypeIdName, string> = {
  LSP7Tokens_SenderNotification: 'Allows your 🆙 to react after sending LSP7 tokens.',
  LSP7Tokens_RecipientNotification: 'Allows your 🆙 to react after receiving LSP7 tokens.',
  LSP7Tokens_OperatorNotification: 'Allows your 🆙 to react after it being authorized as an operator to transfer LSP7 tokens of someone else.',
  LSP7Tokens_VotesDelegatorNotification: 'Allows your 🆙 to react after it being authorized as a delegator to vote for a delegatee. Specific to the LSP7Votes contract.',
  LSP7Tokens_VotesDelegateeNotification: 'Allows your 🆙 to react after it being authorized as a delegatee to vote for a delegator. Specific to the LSP7Votes contract.',
  LSP8Tokens_SenderNotification: 'Allows your 🆙 to react after sending LSP8 NFTs.',
  LSP8Tokens_RecipientNotification: 'Allows your 🆙 to react after receiving LSP8 NFTs.',
  LSP8Tokens_OperatorNotification: 'Allows your 🆙 to react after being authorized as an operator to transfer LSP8 NFTs of someone else',
  LSP8Tokens_VotesDelegateeNotification: 'Allows your 🆙 to react after it being authorized as a delegatee to vote for a delegator. Specific to the LSP8Votes contract.',
  LSP8Tokens_VotesDelegatorNotification: 'Allows your 🆙 to react after it being authorized as a delegator to vote for a delegatee. Specific to the LSP8Votes contract.',
  LSP26FollowerSystem_FollowNotification: 'Allows your 🆙 to react after receiving a new follower.',
  LSP26FollowerSystem_UnfollowNotification: 'Allows your 🆙 to react after someone unfollowed it.',
  LSP0ValueReceived: 'Allows your 🆙 to react after receiving native LYX.',
  LSP0OwnershipTransferStarted: '⚠️ Advanced usage. Details coming later.',
  LSP0OwnershipTransferred_SenderNotification: '⚠️ Advanced usage. Details coming later.',
  LSP0OwnershipTransferred_RecipientNotification: '⚠️ Advanced usage. Details coming later.',
};

const LSP28TheGridJsonSchema = {
  name: 'LSP28TheGrid',
  key: '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff',
  keyType: 'Singleton',
  valueType: 'bytes',
  valueContent: 'VerifiableURI',
};

export const AssetNonDynamicSchemas: ERC725JSONSchema[] =
  LSP4JsonSchemas.filter((schema) => schema.keyType !== 'Mapping');

export const LSP8NonDynamicSchemas: ERC725JSONSchema[] = LSP8JsonSchemas.filter(
  (schema) => schema.name !== 'LSP8ReferenceContract',
);

// Filter and re-organise the array of schemas to display specific data keys first when inspecting Universal Profiles
export const UniversalProfileNonDynamicSchemas: ERC725JSONSchema[] = [
  // 1. LSP1UniversalReceiverDelegate (except keyType `Mapping`)
  ...LSP1JsonSchemas.filter(({ keyType }) => keyType !== 'Mapping'),
  // 2. any schema containing LSP3
  ...LSP3JsonSchemas.filter(({ name }) => name.includes('LSP3')),
  // 3. LSP28 The Grid
  LSP28TheGridJsonSchema,
  // 4. any AddressPermissions schema (except keyType that are MappingWithGrouping)
  ...LSP6JsonSchemas.filter(({ keyType }) => keyType !== 'MappingWithGrouping'),
  // 5. any schemas containing LSP5 (except keyType `Mapping`)
  ...LSP5JsonSchemas.filter(({ keyType }) => keyType !== 'Mapping'),
  // 6. any schemas containing LSP12 (except keyType `Mapping`)
  ...LSP12JsonSchemas.filter(({ keyType }) => keyType !== 'Mapping'),
  // 7. any schemas containing LSP10 (except keyType `Mapping`)
  ...LSP10JsonSchemas.filter(({ keyType }) => keyType !== 'Mapping'),
];

export const LSP1DelegateTypeIdSchema: ERC725JSONSchema = LSP1JsonSchemas[1];

// Preserve this order for display data keys LSP1 Delegate for specific notification types in grouped ordered
export const LSP1DelegateTypeIdCompatibleForUniversalProfile: Record<
  LSP1DelegateTypeIdName,
  Hex
> = {
  ...LSP7_TYPE_IDS,
  ...LSP8_TYPE_IDS,
  ...LSP26_TYPE_IDS,
  ...LSP0_TYPE_IDS,
} as const;

// Create array of ERC725JSONSchema for LSP1 Delegate notifications
export const LSP1NotificationSchemas: ERC725JSONSchema[] = Object.entries(
  LSP1DelegateTypeIdCompatibleForUniversalProfile,
).map(([typeIdName, typeIdValue]) => {
  const { name, keyType, valueType, valueContent } = LSP1DelegateTypeIdSchema;
  const dynamicKeyName = name.replace('<bytes32>', typeIdName);
  const mappingKey = encodeKeyName(name, [typeIdValue]);

  return {
    name: dynamicKeyName,
    key: mappingKey,
    keyType,
    valueType,
    valueContent,
  };
});
