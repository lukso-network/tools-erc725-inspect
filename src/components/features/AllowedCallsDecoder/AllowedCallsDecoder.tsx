import React, { useMemo } from 'react';
import { Hex, isAddress } from 'viem';
import type { CallType } from '@/types/erc725js';

import CallTypeButton from '@/components/ui/CallTypeButton';

import { decodeCallTypeBits } from '@/utils/encoding';

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
  allowedCallsList: Hex[][],
): AllowedCallTuple[] => {
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

type AllowedModeBadgeProps = {
  mode: 'any' | 'custom';
};

const AllowedModeBadge: React.FC<AllowedModeBadgeProps> = ({ mode }) => (
  <div className={`${styles.tagGroup}`}>
    <span className={`tag is-info ${mode === 'any' ? '' : 'is-light'}`}>
      Any
    </span>
    <span className={`tag is-info ${mode === 'custom' ? '' : 'is-light'}`}>
      Custom
    </span>
  </div>
);

const AllowedValueEntry: React.FC<{
  mode: 'any' | 'custom';
  entryType: 'address' | 'standard' | 'function';
  value: string;
  label: string;
}> = ({ mode, entryType, value, label }) => {
  if (mode === 'any') {
    const anyValueHex = entryType === 'address' ? ANY_ADDRESS : ANY_BYTES4;

    return (
      <code className={`${styles.value} is-family-monospace ml-3`}>
        {anyValueHex}
      </code>
    );
  }

  if (entryType == 'address' && isAddress(value)) {
    return (
      <div className="ml-3">
        <AddressInfos
          address={value}
          assetBadgeOptions={{
            showName: true,
            showSymbol: true,
            showBalance: false,
          }}
          showAddress={true}
        />
      </div>
    );
  }

  return (
    <code className={`${styles.value} is-family-monospace ml-3`}>
      {value || label}
    </code>
  );
};

type Props = {
  encodedAllowedCalls: Hex[][];
};

const AllowedCallsDecoder: React.FC<Props> = ({ encodedAllowedCalls }) => {
  const normalizedAllowedCalls = useMemo(
    () => normalizeAllowedCalls(encodedAllowedCalls),
    [encodedAllowedCalls],
  );

  if (!normalizedAllowedCalls.length) {
    return <span className="help">No allowed calls configured.</span>;
  }

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
            <div
              className={`box ${styles.wrapper}`}
              key={`${callTypeBits}-${index}`}
            >
              {normalizedAllowedCalls.length > 1 && (
                <p className="title is-6 mb-3">
                  Restriction #{index + 1} - AllowedCalls[{index}]
                </p>
              )}
              <table className="table is-fullwidth mb-0">
                <thead className="has-background-light">
                  <tr>
                    <th>Restriction</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Allowed call types</strong>
                    </td>
                    <td>
                      <div className={`buttons ${styles.callTypes}`}>
                        {CALL_TYPE_ORDER.map((type) => (
                          <CallTypeButton
                            key={type}
                            callType={type}
                            isActive={Boolean(allowedCallTypes[type])}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Allowed Address</strong>
                    </td>
                    <td>
                      <div className="is-flex is-align-items-center is-flex-wrap-wrap">
                        <AllowedModeBadge mode={allowedAddressMode} />
                        <AllowedValueEntry
                          mode={allowedAddressMode}
                          entryType="address"
                          value={allowedAddress}
                          label="No address configured"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Allowed Standards (interface IDs)</strong>
                    </td>
                    <td>
                      <div className="is-flex is-align-items-center is-flex-wrap-wrap">
                        <AllowedModeBadge mode={allowedStandardMode} />
                        <AllowedValueEntry
                          mode={allowedStandardMode}
                          entryType="standard"
                          value={allowedStandard}
                          label="No standard configured"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Allowed Function</strong>
                    </td>
                    <td>
                      <div className="is-flex is-align-items-center is-flex-wrap-wrap">
                        <AllowedModeBadge mode={allowedFunctionMode} />
                        <AllowedValueEntry
                          mode={allowedFunctionMode}
                          entryType="function"
                          value={allowedFunction}
                          label="No function selector configured"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        },
      )}
    </div>
  );
};

export default AllowedCallsDecoder;
