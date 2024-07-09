/**
 * @author Jean Cavallera <CJ42>
 */
import React, { useState, useContext, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

import { NetworkContext } from '../../contexts/NetworksContext';
import useWeb3 from '../../hooks/useWeb3';
import {
  EXPLORER_BASE_URL,
  LSP1_DELEGATE_VERSIONS,
  LSP1_GRAVE_FORWARDER,
  UP_RECOVERY_ADDRESSES,
} from '../../globals';
import { checkInterface, getData, checkIsGnosisSafe } from '../../utils/web3';

import LSP7Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';
import { AbiItem } from 'web3-utils';

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

interface AssetProps {
  name: string;
  symbol: string;
  assetAddress: string;
  userAddress: string;
  isLSP7: boolean;
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

const AssetInfosBadge: React.FC<AssetProps> = ({
  name,
  symbol,
  assetAddress,
  userAddress,
  isLSP7,
}) => {
  const web3 = useWeb3();
  const [balance, setBalance] = useState<string | undefined>();

  useEffect(() => {
    async function getAssetBalance(assetAddress: string) {
      if (!web3 || !userAddress) return;
      const tokenContract = new web3.eth.Contract(
        LSP7Artifact.abi as AbiItem[],
        assetAddress,
      );

      const assetBalance = await tokenContract.methods
        .balanceOf(userAddress)
        .call();

      // balance is returned in Wei with 1e18 decimals. Format to ether/LYX unit for LSP7 fungible tokens
      const formattedBalance = isLSP7
        ? parseFloat(web3.utils.fromWei(assetBalance, 'ether')).toFixed(2)
        : assetBalance;

      setBalance(formattedBalance);
    }

    getAssetBalance(assetAddress);
  }, [assetAddress, web3, userAddress]);

  return (
    <>
      <div className="tags has-addons mr-2" style={{ display: 'inline' }}>
        <span className="tag is-info">name:</span>
        <span className="tag is-light">{name}</span>
      </div>
      <div className="tags has-addons" style={{ display: 'inline' }}>
        <span className="tag is-info">symbol:</span>
        <span className="tag is-light">{symbol}</span>
      </div>
      <div className="tags has-addons" style={{ display: 'inline' }}>
        <span className="tag is-info">balance:</span>
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
  const [assetName, setAssetName] = useState('');
  const [assetSymbol, setAssetSymbol] = useState('');
  const [isLSP1GraveForwarder, setIsLSP1GraveForwarder] = useState(false);
  const [isGnosisSafe, setIsGnosisSafe] = useState(false);

  const checkAddressInterface = async (_address: string) => {
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

    const nameBytesValue = await getData(
      assetAddress,
      ERC725YDataKeys.LSP4.LSP4TokenName,
      web3,
    );

    if (nameBytesValue) {
      setAssetName(web3.utils.toUtf8(nameBytesValue));
    }

    const symbolBytesValue = await getData(
      assetAddress,
      ERC725YDataKeys.LSP4.LSP4TokenSymbol,
      web3,
    );

    if (symbolBytesValue) {
      setAssetSymbol(web3.utils.toUtf8(symbolBytesValue));
    }
  };

  useEffect(() => {
    if (!assetAddress) return;
    setIsLoading(true);
    setIsLSP1GraveForwarder(assetAddress === LSP1_GRAVE_FORWARDER);

    checkAddressInterface(assetAddress)
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
      <>
        {isUPRecovery && (
          <AddressTypeBadge
            text="🌱 - UP Recovery"
            colorClass="is-success"
            isLight={false}
          />
        )}

        {isLSP1Delegate && (
          <AddressTypeBadge
            text="📢 - LSP1 Delegate"
            colorClass="is-link"
            isLight={false}
            contractVersion={LSP1_DELEGATE_VERSIONS[assetAddress]}
          />
        )}

        {isLSP1GraveForwarder && (
          <AddressTypeBadge
            text="👻 - LSP1 Grave Forwarder"
            colorClass="is-danger"
            isLight={true}
          />
        )}

        {isGnosisSafe && (
          <AddressTypeBadge
            text="🥝 - Gnosis Safe"
            colorClass="is-success"
            isLight={true}
          />
        )}

        {isLSP7 && (
          <>
            <AddressTypeBadge
              text="🪙 - LSP7 Digital Asset"
              colorClass="is-warning"
              isLight={true}
            />
            <AssetInfosBadge
              name={assetName}
              symbol={assetSymbol}
              assetAddress={assetAddress}
              userAddress={userAddress}
              isLSP7={isLSP7}
            />
          </>
        )}

        {isLSP8 && (
          <>
            <AddressTypeBadge
              text="🎨 - LSP8 Identifiable Digital Asset"
              colorClass="is-link"
              isLight={true}
            />
            <AssetInfosBadge
              name={assetName}
              symbol={assetSymbol}
              assetAddress={assetAddress}
              userAddress={userAddress}
              isLSP7={isLSP7}
            />
          </>
        )}
      </>
    );
  };

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
