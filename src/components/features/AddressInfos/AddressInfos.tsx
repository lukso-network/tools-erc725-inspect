/**
 * @author Jean Cavallera <CJ42>
 */
import React, { useState, useContext, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useBytecode } from 'wagmi';
import { type Address, isAddress } from 'viem';

import {
  LUKSO_LSP1_DELEGATE,
  LSP1_GRAVE_FORWARDER,
  LUKSO_UP_RECOVERY_ADDRESSES,
} from '@/constants/contracts';

import { checkInterface, checkIsGnosisSafe, getVersion } from '@/utils/web3';

import { AddressTypeBadge, AssetInfosBadge, ProfileInfosBadge } from './Badges';
import { NetworkContext } from '@/contexts/NetworksContext';
import { getChainIdByNetworkName } from '@/config/wagmi';

interface Props {
  address: string;
  userAddress?: string;
  assetBadgeOptions?: {
    showName?: boolean;
    showSymbol?: boolean;
    showBalance?: boolean;
  };
  showAddress?: boolean;
}

const AddressInfos: React.FC<Props> = ({
  address,
  userAddress = '',
  assetBadgeOptions,
  showAddress = true,
}) => {
  const { network } = useContext(NetworkContext);
  const { data: bytecode, isLoading: isBytecodeLoading } = useBytecode({
    address: isAddress(address) ? (address as Address) : undefined,
    chainId: getChainIdByNetworkName(network.name),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isEOA, setIsEOA] = useState(true);
  const [isLSP0, setIsLSP0] = useState(false);
  const [isLsp6KeyManager, setIsLsp6KeyManager] = useState(false);
  const [isLSP7, setIsLSP7] = useState(false);
  const [isLSP8, setIsLSP8] = useState(false);

  const [isLSP1Delegate, setIsLSP1Delegate] = useState(false);
  const [isLSP1GraveForwarder, setIsLSP1GraveForwarder] = useState(false);
  const [isGnosisSafe, setIsGnosisSafe] = useState(false);

  const [contractVersion, setContractVersion] = useState('');

  const checkAddressInfos = async (_address: string) => {
    if (!network || !_address || isBytecodeLoading) {
      return;
    }

    if (!bytecode || bytecode === '0x') {
      setIsEOA(true);
      return;
    }

    setIsEOA(false);

    const {
      isLsp0Erc725Account,
      isLsp1Delegate,
      isLsp7DigitalAsset,
      isLsp8IdentifiableDigitalAsset,
      isLsp6KeyManager,
    } = await checkInterface(_address, network);

    setIsLSP0(isLsp0Erc725Account);
    setIsLSP7(isLsp7DigitalAsset);
    setIsLSP8(isLsp8IdentifiableDigitalAsset);

    setIsLSP1Delegate(isLsp1Delegate);
    setIsLsp6KeyManager(isLsp6KeyManager);

    const { isSafe, version } = await checkIsGnosisSafe(_address, network);
    setIsGnosisSafe(isSafe);

    if (isSafe && version) {
      setContractVersion(version);
    }

    if (isLsp0Erc725Account) {
      const fetchedContractVersion = await getVersion(address, network);
      setContractVersion(fetchedContractVersion);
    }
  };

  useEffect(() => {
    if (!address || isBytecodeLoading) return;
    setIsLoading(true);
    setIsLSP1GraveForwarder(address === LSP1_GRAVE_FORWARDER);

    checkAddressInfos(address)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [address, network, bytecode, isBytecodeLoading]);

  // Display addresses that are "official" contracts from LUKSO

  // e.g: UP Recovery
  const isLUKSOUPRecovery =
    LUKSO_UP_RECOVERY_ADDRESSES[network.name]?.includes(address) ?? false;

  // e.g: Default LSP1 Delegate for registering tokens / NFTs received in `LSP5ReceivedAssets[]`
  const isLUKSOLSP1Delegate = LUKSO_LSP1_DELEGATE.find(
    (contract) => contract.address === address,
  );
  const addressTypeText = isEOA ? '🔑 EOA' : '📄 Contract';

  const explorerBaseUrl = network.explorerBaseUrl;
  const explorerLink = explorerBaseUrl
    ? `${explorerBaseUrl}/address/${address}`
    : undefined;

  const showName = assetBadgeOptions?.showName ?? true;
  const showSymbol = assetBadgeOptions?.showSymbol ?? true;
  const showBalance = assetBadgeOptions?.showBalance ?? Boolean(userAddress);

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

        {isLsp6KeyManager && (
          <AddressTypeBadge text="🔐 Key Manager" colorClass="is-success" />
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
              showName={showName}
              showSymbol={showSymbol}
              showBalance={showBalance}
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
              showName={showName}
              showSymbol={showSymbol}
              showBalance={showBalance}
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
        {showAddress && (
          <code className="mr-2">
            {explorerLink ? (
              <a target="_blank" rel="noreferrer" href={explorerLink}>
                {address}
              </a>
            ) : (
              address
            )}
          </code>
        )}
        <AddressTypeBadge text={addressTypeText} isLight={true} />
      </div>
      <div className="is-flex">{renderTags()}</div>
    </>
  );
};

export default AddressInfos;
