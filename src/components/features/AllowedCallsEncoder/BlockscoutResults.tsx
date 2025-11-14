import React from 'react';
import {
  type Address,
  isAddress,
  isHex,
  toFunctionSelector,
  toFunctionSignature,
} from 'viem';
import type { BlockscoutContractInfosResult } from '@/hooks/useGetBlockscoutContractInfos';
import AddressInfos from '@/components/features/AddressInfos';

interface BlockscoutResultsProps {
  blockscoutContractInfos: BlockscoutContractInfosResult;
}

export const BlockscoutResults: React.FC<BlockscoutResultsProps> = ({
  blockscoutContractInfos,
}) => {
  const { isLoading, isContract, contractName, abi } = blockscoutContractInfos;

  const couldDecodeAbi = contractName && abi && abi.length > 0;
  const notificationClass = couldDecodeAbi ? 'is-primary' : 'is-warning';

  return (
    <div>
      <div className="m-3" hidden={!isLoading}>
        <span>Loading infos from block explorer...</span>
        <progress
          className="progress is-small is-primary mt-1"
          style={{ width: '300px' }}
          max="100"
        >
          Loading...{' '}
        </progress>
      </div>

      {!isLoading && isContract && (
        <div className={`notification is-light ${notificationClass}`}>
          <h5 className="title is-5">Block Explorer results</h5>
          {couldDecodeAbi ? (
            <p>
              ✅ Found verified contract and its ABI. Select from the{' '}
              <strong>Available Functions</strong> list below if you want to
              restrict to a specific function.
            </p>
          ) : (
            <p>
              ⚠️ The address allowed is a contract, but could not fetch the ABI.
              Contract might not be verified on block explorer.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

interface BlockscoutContractInfosProps {
  blockscoutContractInfos: BlockscoutContractInfosResult;
  address: Address;
}

export const BlockscoutContractInfos: React.FC<
  BlockscoutContractInfosProps
> = ({ blockscoutContractInfos, address }) => {
  const { isLoading, isContract, isProxy, contractName, abi } =
    blockscoutContractInfos;
  return (
    <div className="notification is-primary is-light">
      <div className="m-3" hidden={!isLoading}>
        <span>Loading infos from block explorer...</span>
        <progress
          className="progress is-small is-primary mt-1"
          style={{ width: '300px' }}
          max="100"
        >
          Loading...{' '}
        </progress>
      </div>
      {!isLoading && (
        <>
          {isContract && contractName && (
            <div>
              <span className="mr-4">
                <strong>Contract Name</strong>
              </span>
              <code>{contractName}</code>
            </div>
          )}
          {isContract && (
            <div>
              <span className="mr-4">
                <strong>Contract Type</strong>
              </span>
              <span className="tag is-primary is-light">
                {isProxy || 'normal contract'}
              </span>
            </div>
          )}
          <div className="mt-2">
            <span className="mr-4">
              <strong>Address Infos</strong>
            </span>
            <AddressInfos
              address={address}
              showAddress={false}
              assetBadgeOptions={{
                showName: true,
                showSymbol: true,
                showBalance: false,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

interface BlockscoutAbiFunctionsDropdownProps {
  blockscoutContractInfos: BlockscoutContractInfosResult;
  address: Address;
  onFunctionSelect: (functionSelector: string) => void;
}

export const BlockscoutAbiFunctionsDropdown: React.FC<
  BlockscoutAbiFunctionsDropdownProps
> = ({ blockscoutContractInfos, address, onFunctionSelect }) => {
  const { isLoading, isContract, abi } = blockscoutContractInfos;

  if (!isAddress(address) || !isContract || !abi) {
    return null;
  }

  return (
    <div className="notification is-primary is-light">
      <div className="m-3" hidden={!isLoading}>
        <span>Loading infos from block explorer...</span>
        <progress
          className="progress is-small is-primary mt-1"
          style={{ width: '300px' }}
          max="100"
        >
          Loading...{' '}
        </progress>
      </div>
      {!isLoading && (
        <>
          <strong className="mb-2">Available Functions</strong>
          <div className="select is-primary mt-2">
            <select
              onChange={(event) =>
                isHex(event.target.value)
                  ? onFunctionSelect(event.target.value)
                  : null
              }
            >
              <option>
                <i>See all public functions from the contract</i>
              </option>
              {abi.map((abiItem) =>
                abiItem.type === 'function' ? (
                  <option
                    key={toFunctionSelector(abiItem)}
                    value={toFunctionSelector(abiItem)}
                  >
                    {toFunctionSignature(abiItem)}
                  </option>
                ) : (
                  <></>
                ),
              )}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default BlockscoutResults;
