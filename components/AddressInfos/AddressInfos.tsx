/**
 * @author Jean Cavallera <CJ42>
 */
import React, { useState, useContext, useEffect } from 'react';
import { NetworkContext } from '../../contexts/NetworksContext';
import Link from 'next/link';

import useWeb3 from '../../hooks/useWeb3';
import Skeleton from 'react-loading-skeleton';

import LSP4ABI from '@lukso/lsp-smart-contracts/artifacts/LSP4DigitalAssetMetadata.json';
import { INTERFACE_IDS, ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

import { AbiItem } from 'web3-utils';

const UP_RECOVERY_ADDRESSES_TESTNET = [
  '0xb13B12848dbE8dDf87027Fa2c26aBeF0118a5EB7,0x08019bf6606367d4D5f74082634d3eA0692adf93',
];

const UP_RECOVERY_ADDRESSES_MAINNET = [
  '0xD6ebB3C5C1836f5377d134c303f4EBb053562f6f',
  '0x2e90C2ff7E9bbD9381c8e4eA030666f9c6090727',
  '0x9F44982B472431bEdeFC1DC92149Ca2ea09820aa',
  '0x348EA31074263385a87e2B83f5aB58a7678205F7',
  '0x22e4F54586676158B7D5251e457383E499903617',
  '0x5827b91d84050d3A8e159C27E16B0d7426F66aEB',
  '0x4a252E46A640FB2C45f0E74BAC9448F68fe66d63',
  '0xeB7A7B91B5B7188c098Cb64DD01F59C9D876566d',
  '0xBE8EA52CA32c51024E8B11C2719d9Edb94B21D16',
  '0x242387F645a327af3f1E34F3A9A9032BeEe69fb0',
];

const LSP1_DELEGATE_ADDRESS = '0xA5467dfe7019bF2C7C5F7A707711B9d4cAD118c8';

interface Props {
  address: string;
  keyName: string;
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
  let classText = 'tag ' + colorClass;
  classText += isLight ? ' is-light' : '';
  return <span className={classText}>{text}</span>;
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

// const RenderWithLoading: React.FC<{ loading: boolean }> = (props) => {
//   return props.loading ? <Skeleton width="70px" /> : props.children;
// };

const AddressInfos: React.FC<Props> = ({ address }) => {
  const web3 = useWeb3();
  const { network } = useContext(NetworkContext);

  const recoveryAddresses =
    network.name === 'TESTNET'
      ? UP_RECOVERY_ADDRESSES_TESTNET
      : UP_RECOVERY_ADDRESSES_MAINNET;

  const [isEOA, setIsEOA] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLSP7, setIsLSP7] = useState(false);
  const [isLSP8, setIsLSP8] = useState(false);
  const [assetName, setAssetName] = useState('');
  const [assetSymbol, setAssetSymbol] = useState('');

  const checkAddressInterface = async (_address: string) => {
    if (!web3 || !_address) {
      return;
    }

    setIsLoading(true);
    const bytecode = await web3.eth.getCode(_address);

    if (!bytecode || bytecode === '0x') {
      setIsEOA(true);
      setIsLoading(false);
      return;
    }

    setIsEOA(false);

    const assetContract = new web3.eth.Contract(
      LSP4ABI.abi as AbiItem[],
      address,
    );

    setIsLSP7(
      await assetContract.methods
        .supportsInterface(INTERFACE_IDS.LSP7DigitalAsset)
        .call(),
    );
    setIsLSP8(
      await assetContract.methods
        .supportsInterface(INTERFACE_IDS.LSP8IdentifiableDigitalAsset)
        .call(),
    );

    const nameBytesValue = await assetContract.methods
      .getData(ERC725YDataKeys.LSP4.LSP4TokenName)
      .call();
    setAssetName(web3.utils.toUtf8(nameBytesValue));

    const symbolBytesValue = await assetContract.methods
      .getData(ERC725YDataKeys.LSP4.LSP4TokenSymbol)
      .call();
    setAssetSymbol(web3.utils.toUtf8(symbolBytesValue));

    setIsLoading(false);
  };

  useEffect(() => {
    if (!address) return;

    checkAddressInterface(address);
  }, [address, web3]);

  const isUPRecovery = recoveryAddresses.includes(address);
  const isLSP1Delegate = address === LSP1_DELEGATE_ADDRESS;

  const addressTypeText = isEOA ? '🔑 EOA' : '📄 Contract';

  const explorerLink = `https://explorer.execution.${network.name.toLowerCase()}.lukso.network/address/${address}`;

  return (
    <div>
      <Link href={explorerLink} passHref>
        <a target="_blank">
          <code className="mr-2">🔗 {address}</code>
        </a>
      </Link>
      <AddressTypeBadge text={addressTypeText} isLight={true} />

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
    </div>
  );
};

export default AddressInfos;
