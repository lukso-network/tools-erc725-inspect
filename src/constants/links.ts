import { Erc725JsMethod } from '@/types/erc725js';

// Data Source
export const LUKSO_IPFS_BASE_URL = 'https://api.universalprofile.cloud/ipfs';

// Docs
export const LSP_SPECS_URL = {
  ERC725Y:
    'https://github.com/ERC725Alliance/ERC725/blob/develop/docs/ERC-725.md#erc725y',
  LSP2: 'https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md',
  LSP25:
    'https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-25-ExecuteRelayCall.md',
  LSP26:
    'https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-26-FollowerSystem.md',
};

// Specs

export const LSP_DOCS_URL = {
  ERC725: 'https://docs.lukso.tech/standards/lsp-background/erc725',
  ERC725Y:
    'https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725y',
  LSP0: 'https://docs.lukso.tech/standards/accounts/lsp0-erc725account/',
  LSP2: 'https://docs.lukso.tech/standards/metadata/lsp2-json-schema/',
  LSP6: 'https://docs.lukso.tech/standards/access-control/lsp6-key-manager/',
};

// erc725.js
export const ERC725JS_DOCS_BASE_URL =
  'https://docs.lukso.tech/tools/dapps/erc725js/methods/';

export const ERC725JS_DOCS: Record<Erc725JsMethod, string> = {
  fetchData: `${ERC725JS_DOCS_BASE_URL}#fetchdata`,
  getData: `${ERC725JS_DOCS_BASE_URL}#getdata`,
  encodeData: `${ERC725JS_DOCS_BASE_URL}#encodedata`,
  decodeData: `${ERC725JS_DOCS_BASE_URL}#decodedata`,
  encodePermissions: `${ERC725JS_DOCS_BASE_URL}#encodepermissions`,
  decodePermissions: `${ERC725JS_DOCS_BASE_URL}#decodepermissions`,
};

// Packages
export const NPM_URL = {
  erc725js: 'https://www.npmjs.com/package/@erc725/erc725.js',
};
