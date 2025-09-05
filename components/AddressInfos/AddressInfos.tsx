/**
 * @author Jean Cavallera <CJ42>
 */
import React, { useState, useContext, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

import { NetworkContext } from '@/contexts/NetworksContext';
import useWeb3 from '@/hooks/useWeb3';
import {
  LSP1_DELEGATE_VERSIONS,
  LSP1_GRAVE_FORWARDER,
  UP_RECOVERY_ADDRESSES,
} from '@/globals';
import { checkInterface, checkIsGnosisSafe } from '@/utils/web3';
import { ADDRESS_BADGES } from '@/types/badges';

interface Props {
  address: string;
}

interface BadgeProps {
  text: string;
  isLight: boolean;
  colorClass?: string;
  contractVersion?: string;
}

const AddressTypeBadge: React.FC<BadgeProps> = ({
  text,
  isLight,
  colorClass,
  contractVersion,
}) => {
  let classText = colorClass;
  classText += isLight ? ' is-light' : '';

  const addressSpan = <span className={`tag mr-2 ${classText}`}>{text}</span>;

  if (!contractVersion) {
    return addressSpan;
  }

  return (
    <div className="tags has-addons mr-2" style={{ display: 'inline' }}>
      {addressSpan}
      <span className="tag is-dark">{contractVersion}</span>
    </div>
  );
};

const ContractTypeBadge: React.FC<{ type: string | undefined }> = ({
  type,
}) => {
  // ...
  if (!type) {
    return <AddressTypeBadge text="Unknown" isLight={true} />;
  }

  const { text, colorClass, light } = ADDRESS_BADGES[type];

  return (
    <AddressTypeBadge text={text} isLight={light} colorClass={colorClass} />
  );
};

const AddressInfos: React.FC<Props> = ({ address }) => {
  const web3 = useWeb3();
  const { network } = useContext(NetworkContext);

  const recoveryAddresses = UP_RECOVERY_ADDRESSES[network.name];

  const [isLoading, setIsLoading] = useState(true);
  const [isEOA, setIsEOA] = useState(true);
  const [addressBadgeType, setAddressBadgeType] = useState('');

  useEffect(() => {
    const getAddressInfos = async (_address: string) => {
      if (!web3 || !_address) {
        return;
      }

      const bytecode = await web3.eth.getCode(_address);
      if (!bytecode || bytecode === '0x') {
        setIsEOA(true);
        return;
      }

      setIsEOA(false);

      const { isLsp7DigitalAsset, isLsp8IdentifiableDigitalAsset } =
        await checkInterface(_address, web3);

      const isGnosisSafe = await checkIsGnosisSafe(_address, web3);

      const isUPRecovery = recoveryAddresses.includes(_address);
      const isLSP1Delegate = Object.keys(LSP1_DELEGATE_VERSIONS).includes(
        _address,
      );
      const isLSP1GraveForwarder = _address === LSP1_GRAVE_FORWARDER;

      if (isLsp7DigitalAsset) {
        setAddressBadgeType('LSP7 Digital Asset');
      } else if (isLsp8IdentifiableDigitalAsset) {
        setAddressBadgeType('LSP8 Identifiable Digital Asset');
      } else if (isGnosisSafe) {
        setAddressBadgeType('Gnosis Safe');
      } else if (isUPRecovery) {
        setAddressBadgeType('UP Recovery');
      } else if (isLSP1Delegate) {
        setAddressBadgeType('LSP1 Delegate');
      } else if (isLSP1GraveForwarder) {
        setAddressBadgeType('LSP1 Grave Forwarder');
      }
    };

    if (!address || !web3) return;
    setIsLoading(true);

    getAddressInfos(address)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [address, web3]);

  if (address === null) {
    return <span>no address set</span>;
  }

  return (
    <div>
      <code className="mr-2">{address}</code>
      {isLoading ? (
        <Skeleton width="120px" />
      ) : (
        <>
          <AddressTypeBadge
            text={isEOA ? '🔑 EOA' : '📄 Contract'}
            isLight={true}
          />
          <ContractTypeBadge type={addressBadgeType} />
        </>
      )}
    </div>
  );
};

export default AddressInfos;
