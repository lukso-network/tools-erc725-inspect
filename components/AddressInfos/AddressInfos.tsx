/**
 * @author Jean Cavallera <CJ42>
 */
import React, { useState, useContext, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import { NetworkContext } from '@/contexts/NetworksContext';
import useWeb3 from '@/hooks/useWeb3';
import {
  EXPLORER_BASE_URL,
  LSP1_DELEGATE_VERSIONS,
  LSP1_GRAVE_FORWARDER,
  UP_RECOVERY_ADDRESSES,
} from '@/globals';
import {
  checkInterface,
  checkIsGnosisSafe,
  getProfileMetadataJSON,
} from '@/utils/web3';

import { AddressTypeBadge, AssetInfosBadge, ProfileInfosBadge } from './Badges';

interface Props {
  assetAddress: string;
  userAddress?: string;
}

const AddressInfos: React.FC<Props> = ({ assetAddress, userAddress = '' }) => {
  const web3 = useWeb3();
  const { network } = useContext(NetworkContext);

  const recoveryAddresses = UP_RECOVERY_ADDRESSES[network.name];

  const [isLoading, setIsLoading] = useState(true);
  const [isEOA, setIsEOA] = useState(true);
  const [isLSP0, setIsLSP0] = useState(false);
  const [isLSP7, setIsLSP7] = useState(false);
  const [isLSP8, setIsLSP8] = useState(false);

  const [isLSP1GraveForwarder, setIsLSP1GraveForwarder] = useState(false);
  const [isGnosisSafe, setIsGnosisSafe] = useState(false);

  const checkAddressInfos = async (_address: string) => {
    if (!web3 || !_address) {
      return;
    }

    const bytecode = await web3.eth.getCode(_address);
    if (!bytecode || bytecode === '0x') {
      setIsEOA(true);
      return;
    }

    setIsEOA(false);

    const {
      isLsp7DigitalAsset,
      isLsp8IdentifiableDigitalAsset,
      isLsp0Erc725Account,
    } = await checkInterface(_address, web3);

    setIsLSP7(isLsp7DigitalAsset);
    setIsLSP8(isLsp8IdentifiableDigitalAsset);
    setIsLSP0(isLsp0Erc725Account);

    const isGnosisSafeContract = await checkIsGnosisSafe(_address, web3);
    setIsGnosisSafe(isGnosisSafeContract);
  };

  useEffect(() => {
    if (!assetAddress) return;
    setIsLoading(true);
    setIsLSP1GraveForwarder(assetAddress === LSP1_GRAVE_FORWARDER);

    checkAddressInfos(assetAddress)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [assetAddress, web3]);

  const isUPRecovery = recoveryAddresses.includes(assetAddress);
  const isLSP1Delegate = Object.keys(LSP1_DELEGATE_VERSIONS).includes(
    assetAddress,
  );
  const addressTypeText = isEOA ? '🔑 EOA' : '📄 Contract';

  const explorerLink = `${
    EXPLORER_BASE_URL[network.name]
  }/address/${assetAddress}`;

  const renderTags = () => {
    if (isLoading) {
      return <Skeleton width="120px" />;
    }

    return (
      <div className="mt-2 is-flex">
        {isUPRecovery && (
          <AddressTypeBadge
            text="🌱 LUKSO UP Recovery"
            colorClass="is-success"
            isLight={false}
          />
        )}

        {isLSP1Delegate && (
          <AddressTypeBadge
            text="📢 LUKSO LSP1 Delegate"
            colorClass="is-danger"
            isLight={false}
            contractVersion={LSP1_DELEGATE_VERSIONS[assetAddress]}
          />
        )}

        {isLSP1GraveForwarder && (
          <AddressTypeBadge
            text="👻 LSP1 Grave Forwarder"
            colorClass="is-danger"
            isLight={true}
          />
        )}

        {isGnosisSafe && (
          <AddressTypeBadge
            text="🏦 - Gnosis Safe"
            colorClass="is-success"
            isLight={true}
          />
        )}

        {isLSP7 && (
          <>
            <AddressTypeBadge
              text="🪙 LSP7 Digital Asset"
              colorClass="is-warning"
              isLight={true}
            />
            <AssetInfosBadge
              assetAddress={assetAddress}
              userAddress={userAddress}
              isLSP7={isLSP7}
            />
          </>
        )}

        {isLSP8 && (
          <>
            <AddressTypeBadge
              text="🎨 LSP8 Identifiable Digital Asset"
              colorClass="is-link"
              isLight={true}
            />
            <AssetInfosBadge
              assetAddress={assetAddress}
              userAddress={userAddress}
              isLSP7={isLSP7}
            />
          </>
        )}

        {isLSP0 && (
          <>
            <AddressTypeBadge
              text="🆙 Universal Profile"
              colorClass="is-info"
              isLight={false}
            />
            <ProfileInfosBadge profileAddress={assetAddress} />
          </>
        )}
      </div>
    );
  };

  if (assetAddress === null) {
    return <span>no address set</span>;
  }

  return (
    <div>
      <code className="mr-2">
        <a target="_blank" rel="noreferrer" href={explorerLink}>
          {assetAddress}
        </a>
      </code>
      <AddressTypeBadge text={addressTypeText} isLight={true} />
      {renderTags()}
    </div>
  );
};

export default AddressInfos;
