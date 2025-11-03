import { hexToBigInt, size, isHex, toHex } from 'viem';
import { pad } from 'viem';
import { CALLTYPE } from '@lukso/lsp-smart-contracts';

import type { CallType } from '@/types/erc725js';

export const computeCallTypeBits = (
  callTypes: Record<CallType, boolean>,
): string => {
  let result = hexToBigInt('0x00000000');

  // Convert hex strings to BigInt and perform bitwise OR
  Object.entries(callTypes).forEach(([callType, isEnabled]) => {
    if (isEnabled && CALLTYPE[callType]) {
      const hexValue = CALLTYPE[callType];
      const value = hexToBigInt(hexValue);
      result = result | value;
    }
  });

  // Convert back to hex string with proper padding
  const hexResult = toHex(result);
  return pad(hexResult, { size: 4, dir: 'left' });
};

export const isBytes4Hex = (value: string): boolean =>
  isHex(value) && size(value) === 4;
