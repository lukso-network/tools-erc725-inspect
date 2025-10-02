/**
 * @author Jean Cavallera <CJ42>
 */
import React, { useState, useContext, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import { NetworkContext } from '@/contexts/NetworksContext';
import useWeb3 from '@/hooks/useWeb3';

import {
  LUKSO_LSP1_DELEGATE,
  LSP1_GRAVE_FORWARDER,
  LUKSO_UP_RECOVERY_ADDRESSES,
} from '@/constants/contracts';
import { EXPLORER_BASE_URL } from '@/constants/networks';

import { checkInterface, checkIsGnosisSafe, getVersion } from '@/utils/web3';

import { AddressTypeBadge, AssetInfosBadge, ProfileInfosBadge } from './Badges';

interface Props {
  address: string;
  userAddress?: string;
}

const AddressInfos: React.FC<Props> = ({ address, userAddress = '' }) => {
  const web3 = useWeb3();
  const { network } = useContext(NetworkContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isEOA, setIsEOA] = useState(true);
  const [isLSP0, setIsLSP0] = useState(false);
  const [isLSP7, setIsLSP7] = useState(false);
  const [isLSP8, setIsLSP8] = useState(false);

  const [isLSP1Delegate, setIsLSP1Delegate] = useState(false);
  const [isLSP1GraveForwarder, setIsLSP1GraveForwarder] = useState(false);
  const [isGnosisSafe, setIsGnosisSafe] = useState(false);

  const [contractVersion, setContractVersion] = useState('');

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
      isLsp0Erc725Account,
      isLsp1UniversalReceiverDelegate,
      isLsp7DigitalAsset,
      isLsp8IdentifiableDigitalAsset,
    } = await checkInterface(_address, web3);

    setIsLSP0(isLsp0Erc725Account);
    setIsLSP7(isLsp7DigitalAsset);
    setIsLSP8(isLsp8IdentifiableDigitalAsset);

    setIsLSP1Delegate(isLsp1UniversalReceiverDelegate);

    const { isSafe, version } = await checkIsGnosisSafe(_address, web3);
    setIsGnosisSafe(isSafe);

    if (isSafe && version) {
      setContractVersion(version);
    }

    if (isLsp0Erc725Account) {
      const fetchedContractVersion = await getVersion(address, web3);
      setContractVersion(fetchedContractVersion);
    }
  };

  useEffect(() => {
    if (!address) return;
    setIsLoading(true);
    setIsLSP1GraveForwarder(address === LSP1_GRAVE_FORWARDER);

    checkAddressInfos(address)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [address, web3]);

  // Display addresses that are "official" contracts from LUKSO

  // e.g: UP Recovery
  const isLUKSOUPRecovery =
    LUKSO_UP_RECOVERY_ADDRESSES[network.name].includes(address);

  // e.g: Default LSP1 Delegate for registering tokens / NFTs received in `LSP5ReceivedAssets[]`
  const isLUKSOLSP1Delegate = LUKSO_LSP1_DELEGATE.find(
    (contract) => contract.address === address,
  );
  const addressTypeText = isEOA ? '🔑 EOA' : '📄 Contract';

  const explorerLink = `${EXPLORER_BASE_URL[network.name]}/address/${address}`;

  const renderTags = () => {
    if (isLoading) {
      return <Skeleton width="120px" />;
    }

    return (
      <div className="is-flex is-align-items-center mt-1 mb-2">
        {/* LUKSO Official addresses */}
        {isLUKSOUPRecovery && (
          <AddressTypeBadge
            text="🌱 LUKSO UP Recovery"
            colorClass="is-primary"
            isLight={false}
            logo="/lukso-signet-fuschia.svg"
            contractVersion={contractVersion}
          />
        )}

        {isLUKSOLSP1Delegate && (
          <AddressTypeBadge
            text="📢 LUKSO LSP1 Delegate"
            colorClass="is-danger"
            isLight={false}
            contractVersion={isLUKSOLSP1Delegate.version}
            logo="/lukso-signet-fuschia.svg"
          />
        )}

        {/* Decode by contract type */}

        {isLSP0 && (
          <>
            <AddressTypeBadge
              text="Universal Profile"
              colorClass="is-info"
              contractVersion={contractVersion}
              logo="/up-box-logo.png"
            />
            <ProfileInfosBadge profileAddress={address} />
          </>
        )}

        {isLSP1Delegate && (
          <AddressTypeBadge text="📢 LSP1 Delegate" colorClass="is-danger" />
        )}

        {isLSP7 && (
          <>
            <AddressTypeBadge
              text="🪙 LSP7 Digital Asset"
              colorClass="is-warning"
            />
            <AssetInfosBadge
              assetAddress={address}
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
            />
            <AssetInfosBadge
              assetAddress={address}
              userAddress={userAddress}
              isLSP7={isLSP7}
            />
          </>
        )}

        {/* Other type and community contracts */}

        {isLSP1GraveForwarder && (
          <AddressTypeBadge
            text="👻 LSP1 Grave Forwarder"
            colorClass="is-danger"
            isLight={true}
          />
        )}

        {isGnosisSafe && (
          <AddressTypeBadge
            text="Gnosis Safe"
            colorClass="bg-safe"
            contractVersion={contractVersion}
            logo="/safe-logo.png"
          />
        )}
      </div>
    );
  };

  if (address === null) {
    return <span>no address set</span>;
  }

  return (
    <>
      <div className="is-flex">
        <code className="mr-2">
          <a target="_blank" rel="noreferrer" href={explorerLink}>
            {address}
          </a>
        </code>
        <AddressTypeBadge text={addressTypeText} isLight={true} />
      </div>
      <div className="is-flex">{renderTags()}</div>
    </>
  );
};

export default AddressInfos;
