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

export const SCHEMA_DOCS_LINKS: { [key in SchemaName]: string } = {
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

export enum LSP1TypeIdsDescriptions {
  'LSP7Tokens_SenderNotification' = 'Allows your 🆙 to react after sending LSP7 tokens.',
  'LSP7Tokens_RecipientNotification' = 'Allows your 🆙 to react after receiving LSP7 tokens.',
  'LSP7Tokens_OperatorNotification' = 'Allows your 🆙 to react after it being authorized as an operator to transfer LSP7 tokens of someone else.',
  'LSP8Tokens_SenderNotification' = 'Allows your 🆙 to react after sending LSP8 NFTs.',
  'LSP8Tokens_RecipientNotification' = 'Allows your 🆙 to react after receiving LSP8 NFTs.',
  'LSP8Tokens_OperatorNotification' = 'Allows your 🆙 to react after being authorized as an operator to transfer LSP8 NFTs of someone else',
  'LSP26FollowerSystem_FollowNotification' = 'Allows your 🆙 to react after receiving a new follower.',
  'LSP26FollowerSystem_UnfollowNotification' = 'Allows your 🆙 to react after someone unfollowed it.',
  'LSP0ValueReceived' = 'Allows your 🆙 to react after receiving native LYX.',
  'LSP0OwnershipTransferStarted' = '⚠️ Advanced usage. Details coming later.',
  'LSP0OwnershipTransferred_SenderNotification' = '⚠️ Advanced usage. Details coming later.',
  'LSP0OwnershipTransferred_RecipientNotification' = '⚠️ Advanced usage. Details coming later.',
}
