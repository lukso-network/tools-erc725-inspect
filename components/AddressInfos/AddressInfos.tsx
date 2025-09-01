/**
 * @author Jean Cavallera <CJ42>
 */
import React, { useState, useContext, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

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
  getAssetInfosAndBalance,
} from '@/utils/web3';

interface Props {
  assetAddress: string;
  userAddress?: string;
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

interface AssetInfosProps {
  name: string;
  symbol: string;
  tokenType: string;
  balance: string;
}

const AssetInfosBadge: React.FC<AssetInfosProps> = ({
  name,
  symbol,
  tokenType,
  balance,
}) => {
  return (
    <>
      <div className="tags has-addons mr-2" style={{ display: 'inline' }}>
        <span className="tag is-info">name</span>
        <span className="tag is-light">{name}</span>
      </div>
      <div className="tags has-addons" style={{ display: 'inline' }}>
        <span className="tag is-info">symbol</span>
        <span className="tag is-light">{symbol}</span>
      </div>
      <div className="tags has-addons" style={{ display: 'inline' }}>
        <span className="tag is-info">token type</span>
        <span className="tag is-light">{tokenType}</span>
      </div>
      <div className="tags has-addons" style={{ display: 'inline' }}>
        <span className="tag is-info">balance</span>
        <span className="tag is-light">{balance}</span>
      </div>
    </>
  );
};

const AddressInfos: React.FC<Props> = ({ assetAddress, userAddress = '' }) => {
  const web3 = useWeb3();
  const { network } = useContext(NetworkContext);

  const recoveryAddresses = UP_RECOVERY_ADDRESSES[network.name];

  const [isLoading, setIsLoading] = useState(true);
  const [isEOA, setIsEOA] = useState(true);
  const [isLSP7, setIsLSP7] = useState(false);
  const [isLSP8, setIsLSP8] = useState(false);
  const [isLSP1GraveForwarder, setIsLSP1GraveForwarder] = useState(false);
  const [isGnosisSafe, setIsGnosisSafe] = useState(false);

  const [assetName, setAssetName] = useState('');
  const [assetSymbol, setAssetSymbol] = useState('');
  const [assetTokenType, setAssetTokenType] = useState<string>('undefined');
  const [assetBalance, setAssetBalance] = useState<string | undefined>('0');

  const getAssetInfos = async (_address: string) => {
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

    setIsLSP7(isLsp7DigitalAsset);
    setIsLSP8(isLsp8IdentifiableDigitalAsset);

    const isGnosisSafeContract = await checkIsGnosisSafe(_address, web3);
    setIsGnosisSafe(isGnosisSafeContract);

    if (isLsp7DigitalAsset || isLsp8IdentifiableDigitalAsset) {
      const [tokenName, tokenSymbol, tokenType, tokenBalance] =
        await getAssetInfosAndBalance(
          assetAddress,
          userAddress,
          isLsp7DigitalAsset,
          web3,
        );

      setAssetName(tokenName ?? '');
      setAssetSymbol(tokenSymbol ?? '');

      const TOKEN_TYPE_MAP: { [key: string]: string } = {
        '0': 'Token',
        '1': 'NFT',
        '2': 'Collection',
      };

      const tokenTypeText = tokenType
        ? `${TOKEN_TYPE_MAP[tokenType]} (${tokenType})`
        : 'Unknown';

      setAssetTokenType(tokenTypeText);
      setAssetBalance(tokenBalance ?? '0');
    }
  };

  useEffect(() => {
    if (!assetAddress) return;
    setIsLoading(true);
    setIsLSP1GraveForwarder(assetAddress === LSP1_GRAVE_FORWARDER);

    getAssetInfos(assetAddress)
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

  const renderAddressTag = () => {
    if (isLoading) {
      return <Skeleton width="120px" />;
    }

    return (
      <>
        {isUPRecovery && (
          <AddressTypeBadge
            text="🌱 UP Recovery"
            colorClass="is-success"
            isLight={false}
          />
        )}

        {isLSP1Delegate && (
          <AddressTypeBadge
            text="📢 LSP1 Delegate"
            colorClass="is-link"
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
            text="🥝 Gnosis Safe"
            colorClass="is-success"
            isLight={true}
          />
        )}

        {isLSP7 && (
          <AddressTypeBadge
            text="🪙 LSP7 Digital Asset"
            colorClass="is-warning"
            isLight={true}
          />
        )}

        {isLSP8 && (
          <AddressTypeBadge
            text="🎨 LSP8 Identifiable Digital Asset"
            colorClass="is-link"
            isLight={true}
          />
        )}
      </>
    );
  };

  const renderAssetInfosTags = () => {
    if (isLoading) {
      return <Skeleton width="120px" />;
    }

    if (!isLSP7 && !isLSP8) {
      return null;
    }

    return (
      <div className="my-2">
        <AssetInfosBadge
          name={assetName}
          symbol={assetSymbol}
          tokenType={assetTokenType}
          balance={assetBalance}
        />
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
      {renderAddressTag()}
      {renderAssetInfosTags()}
    </div>
  );
};

export default AddressInfos;
