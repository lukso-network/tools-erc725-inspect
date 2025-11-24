import React, { useMemo } from 'react';

import CallTypeButton from '@/components/ui/CallTypeButton';

import type { CallType } from '@/types/erc725js';
import { decodeCallTypeBits } from '@/utils/encoding';

import styles from './AllowedCallsDecoder.module.scss';
import AddressInfos from '../AddressInfos';
import { isAddress } from 'viem';

const CALL_TYPE_ORDER: CallType[] = [
  'VALUE',
  'CALL',
  'STATICCALL',
  'DELEGATECALL',
];

const ANY_ADDRESS = '0xffffffffffffffffffffffffffffffffffffffff';
const ANY_BYTES4 = '0xffffffff';
const noop = () => undefined;

type AllowedCallTuple = {
  callTypeBits: string;
  allowedAddress: string;
  allowedStandard: string;
  allowedFunction: string;
};

type Props = {
  allowedCalls: unknown;
};

const normalizeAllowedCalls = (value: unknown): AllowedCallTuple[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => {
      if (!Array.isArray(entry) || entry.length < 4) {
        return null;
      }

      const [callTypeBits, allowedAddress, allowedStandard, allowedFunction] =
        entry;

      if (
        typeof callTypeBits !== 'string' ||
        typeof allowedAddress !== 'string' ||
        typeof allowedStandard !== 'string' ||
        typeof allowedFunction !== 'string'
      ) {
        return null;
      }

      return {
        callTypeBits,
        allowedAddress,
        allowedStandard,
        allowedFunction,
      };
    })
    .filter(Boolean) as AllowedCallTuple[];
};

const isAnyValue = (value: string, anyValue: string): boolean =>
  value.toLowerCase() === anyValue.toLowerCase();

const getModeTags = (mode: 'any' | 'custom', value: string, label: string) => (
  <div className="is-flex is-align-items-center is-flex-wrap-wrap">
    <div className={`${styles.tagGroup}`}>
      <span className={`tag is-info ${mode === 'any' ? '' : 'is-light'}`}>
        Any
      </span>
      <span className={`tag is-info ${mode === 'custom' ? '' : 'is-light'}`}>
        Custom
      </span>
    </div>
    {mode === 'custom' && (
      <div className="ml-3">
        {isAddress(value) ? (
          <AddressInfos
            address={value}
            assetBadgeOptions={{
              showName: true,
              showSymbol: true,
              showBalance: false,
            }}
            showAddress={true}
          />
        ) : (
          <code className={`${styles.value} is-family-monospace ml-3`}>
            {value || label}
          </code>
        )}
      </div>
    )}
  </div>
);

const AllowedCallsDecoder: React.FC<Props> = ({ allowedCalls }) => {
  const normalizedAllowedCalls = useMemo(
    () => normalizeAllowedCalls(allowedCalls),
    [allowedCalls],
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
          const callTypeStates = decodeCallTypeBits(callTypeBits);
          const addressMode = isAnyValue(allowedAddress, ANY_ADDRESS)
            ? 'any'
            : 'custom';
          const standardsMode = isAnyValue(allowedStandard, ANY_BYTES4)
            ? 'any'
            : 'custom';
          const functionsMode = isAnyValue(allowedFunction, ANY_BYTES4)
            ? 'any'
            : 'custom';

          return (
            <div
              className={`box ${styles.wrapper}`}
              key={`${callTypeBits}-${index}`}
            >
              {normalizedAllowedCalls.length > 1 && (
                <p className="title is-6 mb-3">Restriction #{index + 1}</p>
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
                            isActive={Boolean(callTypeStates[type])}
                            onClick={noop}
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
                      {getModeTags(
                        addressMode,
                        allowedAddress,
                        'No address configured',
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Allowed Standards (interface IDs)</strong>
                    </td>
                    <td>
                      {getModeTags(
                        standardsMode,
                        allowedStandard,
                        'No standard configured',
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Allowed Function</strong>
                    </td>
                    <td>
                      {getModeTags(
                        functionsMode,
                        allowedFunction,
                        'No function selector configured',
                      )}
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
