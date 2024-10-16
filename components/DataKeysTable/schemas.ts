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
    'https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager/',
  'LSP10Vaults[]':
    'https://docs.lukso.tech/standards/universal-profile/lsp10-received-vaults',
  'LSP12IssuedAssets[]':
    'https://docs.lukso.tech/standards/universal-profile/lsp12-issued-assets',
  LSP28TheGrid: 'https://docs.lukso.tech/standards/standard-detection', // TODO: update with correct link
};
