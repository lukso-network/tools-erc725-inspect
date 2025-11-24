import { hexToBigInt, size, isHex, toHex, pad, Hex } from 'viem';
import { CALLTYPE } from '@lukso/lsp-smart-contracts';

import type { CallType } from '@/types/erc725js';

export const encodeCallTypeBits = (
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

export const decodeCallTypeBits = (
  callTypeBitsHex: Hex,
): Record<CallType, boolean> => {
  const bits = hexToBigInt(callTypeBitsHex);

  return Object.entries(CALLTYPE).reduce((acc, [callType, bitMask]) => {
    const mask = hexToBigInt(bitMask);
    acc[callType as CallType] = (bits & mask) === mask && mask !== BigInt(0);
    return acc;
  }, {} as Record<CallType, boolean>);
};

export const isBytes4Hex = (value: string): boolean =>
  isHex(value) && size(value) === 4;
