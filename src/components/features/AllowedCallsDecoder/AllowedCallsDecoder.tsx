import React, { useMemo } from 'react';
import { Hex, isAddress } from 'viem';
import type { CallType } from '@/types/erc725js';
import { FunctionSelectors } from '@lukso/lsp-smart-contracts';

import CallTypeButton from '@/components/ui/CallTypeButton';

import { decodeCallTypeBits, isBytes4Hex } from '@/utils/encoding';

import AddressInfos from '@/components/features/AddressInfos/AddressInfos';
import styles from './AllowedCallsDecoder.module.scss';

const CALL_TYPE_ORDER: CallType[] = [
  'VALUE',
  'CALL',
  'STATICCALL',
  'DELEGATECALL',
];

const ANY_ADDRESS = '0xffffffffffffffffffffffffffffffffffffffff';
const ANY_BYTES4 = '0xffffffff';

type AllowedCallTuple = {
  callTypeBits: Hex;
  allowedAddress: Hex;
  allowedStandard: Hex;
  allowedFunction: Hex;
};

// This should be an array of arrays of 4 hex values
const normalizeAllowedCalls = (
  allowedCallsList: Hex[][] | null,
): AllowedCallTuple[] => {
  if (allowedCallsList == null) {
    return [];
  }

  return allowedCallsList.map((allowedCallEntry: Hex[]) => {
    const [callTypeBits, allowedAddress, allowedStandard, allowedFunction] =
      allowedCallEntry;

    return {
      callTypeBits,
      allowedAddress,
      allowedStandard,
      allowedFunction,
    };
  });
};

const AllowedModeBadge: React.FC<{
  mode: 'any' | 'custom';
  size?: 'small' | 'normal';
}> = ({ mode, size = 'normal' }) => (
  <span
    className={`tag is-${size} ${
      mode === 'any' ? 'is-warning' : 'is-info is-light'
    }`}
  >
    {/* Capitalize */}
    {mode.charAt(0).toUpperCase() + mode.slice(1)}
  </span>
);

const AllowedAddressEntry: React.FC<{
  mode: 'any' | 'custom';
  value: string;
}> = ({ mode, value }) => {
  if (mode === 'any') {
    return <code className="is-family-monospace ml-3">{ANY_ADDRESS}</code>;
  }

  if (mode === 'custom' && isAddress(value)) {
    return (
      <div className="ml-3">
        <AddressInfos address={value} showAddress={true} />
      </div>
    );
  }

  return <code className="is-family-monospace ml-3">{value}</code>;
};

const AllowedStandardEntry: React.FC<{
  mode: 'any' | 'custom';
  value: string;
}> = ({ mode, value }) => {
  if (mode === 'any') {
    return <code className="is-family-monospace ml-3">{ANY_BYTES4}</code>;
  }

  // TODO: create re-usable component (shared with interface ID list table at the top of the inspector page), to display interface IDs
  // Make it take a props for "position of interface ID" (right or left)
  return <code className="is-family-monospace ml-3">{value}</code>;
};

const AllowedFunctionSelectorEntry: React.FC<{
  mode: 'any' | 'custom';
  value: string;
}> = ({ mode, value }) => {
  const foundFunctionSignature = useMemo(() => {
    if (!isBytes4Hex(value)) {
      return null;
    }

    for (const contractSelectors of Object.values(FunctionSelectors)) {
      if (!contractSelectors) {
        continue;
      }

      const matchedEntry = Object.entries(contractSelectors).find(
        ([selector]) => selector.toLowerCase() === value.toLowerCase(),
      );

      if (matchedEntry) {
        const [, selectorDetails] = matchedEntry;
        return (selectorDetails as { sig?: string }).sig ?? null;
      }
    }

    return null;
  }, [value]);

  if (mode === 'any') {
    return <code className="is-family-monospace ml-3">{ANY_BYTES4}</code>;
  }

  if (mode === 'custom' && isBytes4Hex(value)) {
    return (
      <div className="tags has-addons ml-3">
        <span className="tag is-medium is-primary is-light">
          <code>{value}</code>
        </span>
        {foundFunctionSignature && (
          <span className="tag is-medium is-primary is-foon">
            {foundFunctionSignature}
          </span>
        )}
      </div>
    );
  }

  return <code className="is-family-monospace ml-3">{value}</code>;
};

type Props = {
  allowedCallsList: Hex[][];
  size?: 'small' | 'normal';
};

const AllowedCallsDecoder: React.FC<Props> = ({
  allowedCallsList,
  size = 'normal',
}) => {
  const normalizedAllowedCalls = useMemo(
    () => normalizeAllowedCalls(allowedCallsList),
    [allowedCallsList],
  );

  if (!normalizedAllowedCalls.length) {
    return <span className="help">No allowed calls configured.</span>;
  }

  const titleSize = size === 'small' ? 'is-size-7' : 'is-size-6';

  return (
    <div className="mt-3">
      {normalizedAllowedCalls.map(
        (
          { callTypeBits, allowedAddress, allowedStandard, allowedFunction },
          index,
        ) => {
          const allowedCallTypes = decodeCallTypeBits(callTypeBits);

          const allowedAddressMode =
            allowedAddress.toLowerCase() === ANY_ADDRESS ? 'any' : 'custom';

          const allowedStandardMode =
            allowedStandard.toLowerCase() === ANY_BYTES4 ? 'any' : 'custom';

          const allowedFunctionMode =
            allowedFunction.toLowerCase() === ANY_BYTES4 ? 'any' : 'custom';

          return (
            <details
              className={`box p-0 content ${styles.allowedCallsToggle}`}
              key={index}
            >
              <summary className="has-background-link-light p-2 has-text-weight-semibold is-size-7">
                <p className={`title ${titleSize}`}>
                  Restriction #{index + 1} - AllowedCalls[{index}]
                </p>
              </summary>

              <table className="table is-fullwidth mb-0 mt-3">
                <thead className="has-background-light">
                  <tr className={titleSize}>
                    <th>Restriction</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={titleSize}>
                      <strong>Allowed call types</strong>
                    </td>
                    <td>
                      <div className="buttons">
                        {CALL_TYPE_ORDER.map((type) => (
                          <CallTypeButton
                            key={type}
                            callType={type}
                            isActive={Boolean(allowedCallTypes[type])}
                            size={size}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className={titleSize}>
                      <strong>Allowed Address</strong>
                    </td>
                    <td>
                      <div className="is-flex is-align-items-center is-flex-wrap-wrap">
                        <AllowedModeBadge
                          mode={allowedAddressMode}
                          size={size}
                        />
                        <AllowedAddressEntry
                          mode={allowedAddressMode}
                          value={allowedAddress}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className={titleSize}>
                      <strong>Allowed Standards (interface IDs)</strong>
                    </td>
                    <td>
                      <div className="is-flex is-align-items-center is-flex-wrap-wrap">
                        <AllowedModeBadge
                          mode={allowedStandardMode}
                          size={size}
                        />
                        <AllowedStandardEntry
                          mode={allowedStandardMode}
                          value={allowedStandard}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className={titleSize}>
                      <strong>Allowed Function</strong>
                    </td>
                    <td>
                      <div className="is-flex is-align-items-center is-flex-wrap-wrap">
                        <AllowedModeBadge
                          mode={allowedFunctionMode}
                          size={size}
                        />
                        <AllowedFunctionSelectorEntry
                          mode={allowedFunctionMode}
                          value={allowedFunction}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </details>
          );
        },
      )}
    </div>
  );
};

export default AllowedCallsDecoder;
