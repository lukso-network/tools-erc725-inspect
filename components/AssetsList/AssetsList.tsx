import { useState } from 'react';
import { encodeArrayKey } from '@erc725/erc725.js';
import AddressInfos from '../AddressInfos';

import { checkInterface, getAssetInfosAndBalance } from '@/utils/web3';

type AssetInfosProps = {
  name: string;
  symbol: string;
  tokenType: string;
  balance: string;
};

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

type AssetInfo = {
  name: string;
  symbol: string;
  tokenType: string;
  balance: string;
};

// TODO: improve typing with erc725.js types
type Props = {
  decodedDataArray: any;
  erc725JSONSchema: any;
  userAddress: string;
};

const AssetsList: React.FC<Props> = ({
  decodedDataArray,
  erc725JSONSchema,
  userAddress,
}) => {
  const [assetsInfos, setAssetsInfos] = useState<AssetInfo[]>([]);

  const getAssetInfos = async (assetAddress: string) => {
    // ...
    // if (isLsp7DigitalAsset || isLsp8IdentifiableDigitalAsset) {
    //       const [tokenName, tokenSymbol, tokenType, tokenBalance] =
    //         await getAssetInfosAndBalance(
    //           assetAddress,
    //           userAddress,
    //           isLsp7DigitalAsset,
    //           web3,
    //         );
    //       // setAssetName(tokenName ?? '');
    //       // setAssetSymbol(tokenSymbol ?? '');
    //       // const TOKEN_TYPE_MAP: { [key: string]: string } = {
    //       //   '0': 'Token',
    //       //   '1': 'NFT',
    //       //   '2': 'Collection',
    //       // };
    //       // const tokenTypeText = tokenType
    //       //   ? `${tokenType} - ${TOKEN_TYPE_MAP[tokenType]}`
    //       //   : 'Unknown';
    //       // setAssetTokenType(tokenTypeText);
    //       // setAssetBalance(tokenBalance ?? '0');
    //     }
  };

  // const renderAssetInfosTags = () => {
  //   if (isLoading) {
  //     return <Skeleton width="120px" />;
  //   }

  //   if (!isLSP7 && !isLSP8) {
  //     return null;
  //   }

  //   return (
  //     <div className="my-2">
  //       <AssetInfosBadge
  //         name={assetName}
  //         symbol={assetSymbol}
  //         tokenType={assetTokenType}
  //         balance={assetBalance}
  //       />
  //     </div>
  //   );
  // };

  // TODO: replace with an array of assets infos
  //       const [assetName, setAssetName] = useState('');
  //   const [assetSymbol, setAssetSymbol] = useState('');
  //   const [assetTokenType, setAssetTokenType] = useState<string>('undefined');
  //   const [assetBalance, setAssetBalance] = useState<string | undefined>('0');

  return (
    <>
      <p style={{ display: 'inline' }}>
        {decodedDataArray.value.length} entries found
      </p>
      <table className="table" style={{ backgroundColor: 'transparent' }}>
        <thead>
          <tr>
            <th>
              <abbr title="Position">Data Key index</abbr>
            </th>
            <th>
              <abbr title="Played">Value</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          {decodedDataArray.value.map((item, index) => (
            <tr key={index}>
              <td>
                <p>
                  <strong>
                    {erc725JSONSchema.name.replace('[]', `[${index}]`)}
                  </strong>
                </p>
                <p>
                  ➡ <code>{encodeArrayKey(erc725JSONSchema.key, index)}</code>
                </p>
              </td>
              <td style={{ width: '50%' }}>
                {item ? (
                  <AddressInfos
                    assetAddress={item.toString()}
                    userAddress={userAddress}
                  />
                ) : (
                  <i>No value found at index {index}</i>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AssetsList;
