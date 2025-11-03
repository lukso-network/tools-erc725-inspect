import { CALLTYPE } from '@lukso/lsp-smart-contracts';

export type Erc725JsMethod =
  | 'fetchData'
  | 'getData'
  | 'encodeData'
  | 'decodeData'
  | 'encodePermissions'
  | 'decodePermissions';

export type CallType = keyof typeof CALLTYPE;
