import { hexToBigInt, size, isHex, toHex, pad, Hex } from 'viem';
import { CALLTYPE } from '@lukso/lsp-smart-contracts';
import ERC725 from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';

import type { CallType } from '@/types/erc725js';

const erc725js = new ERC725(LSP6Schema);

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

export const decodeAllowedCalls = (
  allowedCallsHex: Hex,
  controllerAddress: string,
): any => {
  const decodedAllowedCalls = erc725js.decodeData([
    {
      keyName: 'AddressPermissions:AllowedCalls:<address>',
      dynamicKeyParts: controllerAddress,
      value: allowedCallsHex,
    },
  ]);

  return decodedAllowedCalls;
};

export const isBytes4Hex = (value: string): boolean =>
  isHex(value) && size(value) === 4;
