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
  LSP1_DELEGATE_ADDRESS,
  UP_RECOVERY_ADDRESSES,
} from '../../globals';
import { checkInterface, getData } from '../../utils/web3';

interface Props {
  address: string;
}

interface BadgeProps {
  text: string;
  isLight: boolean;
  colorClass?: string;
}

interface AssetProps {
  name: string;
  symbol: string;
}

const AddressTypeBadge: React.FC<BadgeProps> = ({
  text,
  isLight,
  colorClass,
}) => {
  let classText = colorClass;
  classText += isLight ? ' is-light' : '';
  return <span className={`tag ${classText}`}>{text}</span>;
};

const AssetInfosBadge: React.FC<AssetProps> = ({ name, symbol }) => {
  return (
    <>
      <div className="tags has-addons" style={{ display: 'inline' }}>
        <span className="tag is-info">name:</span>
        <span className="tag is-light">{name}</span>
      </div>
      <div className="tags has-addons" style={{ display: 'inline' }}>
        <span className="tag is-info">symbol:</span>
        <span className="tag is-light">{symbol}</span>
      </div>
    </>
  );
};

const AddressInfos: React.FC<Props> = ({ address }) => {
  const web3 = useWeb3();
  const { network } = useContext(NetworkContext);

  const recoveryAddresses = UP_RECOVERY_ADDRESSES[network.name];

  const [isLoading, setIsLoading] = useState(true);
  const [isEOA, setIsEOA] = useState(true);
  const [isLSP7, setIsLSP7] = useState(false);
  const [isLSP8, setIsLSP8] = useState(false);
  const [assetName, setAssetName] = useState('');
  const [assetSymbol, setAssetSymbol] = useState('');

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

    const nameBytesValue = await getData(
      address,
      ERC725YDataKeys.LSP4.LSP4TokenName,
      web3,
    );

    if (nameBytesValue) {
      setAssetName(web3.utils.toUtf8(nameBytesValue));
    }

    const symbolBytesValue = await getData(
      address,
      ERC725YDataKeys.LSP4.LSP4TokenSymbol,
      web3,
    );

    if (symbolBytesValue) {
      setAssetSymbol(web3.utils.toUtf8(symbolBytesValue));
    }
  };

  useEffect(() => {
    if (!address) return;
    setIsLoading(true);

    checkAddressInterface(address)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [address, web3]);

  const isUPRecovery = recoveryAddresses.includes(address);
  const isLSP1Delegate = address === LSP1_DELEGATE_ADDRESS;

  const addressTypeText = isEOA ? '🔑 EOA' : '📄 Contract';

  const explorerLink = `${EXPLORER_BASE_URL[network.name]}/address/${address}`;

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
          />
        )}

        {isLSP7 && (
          <>
            <AddressTypeBadge
              text="🪙 - LSP7 Digital Asset"
              colorClass="is-warning"
              isLight={true}
            />
            <AssetInfosBadge name={assetName} symbol={assetSymbol} />
          </>
        )}

        {isLSP8 && (
          <>
            <AddressTypeBadge
              text="🎨 - LSP8 Identifiable Digital Asset"
              colorClass="is-link"
              isLight={true}
            />
            <AssetInfosBadge name={assetName} symbol={assetSymbol} />
          </>
        )}
      </>
    );
  };

  return (
    <div>
      <code className="mr-2">
        <a target="_blank" rel="noreferrer" href={explorerLink}>
          {address}
        </a>
      </code>
      <AddressTypeBadge text={addressTypeText} isLight={true} />

      {renderTags()}
    </div>
  );
};

export default AddressInfos;
