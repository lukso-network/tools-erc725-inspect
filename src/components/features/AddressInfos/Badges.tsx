import { useEffect, useState } from 'react';
import useWeb3 from '@/hooks/useWeb3';

import LSP7Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';
import { AbiItem } from 'web3-utils';
import { getDataBatch, getProfileMetadataJSON } from '@/utils/web3';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import { LUKSO_IPFS_BASE_URL } from '@/constants/links';

interface BadgeProps {
  text: string;
  isLight?: boolean;
  colorClass?: string;
  contractVersion?: string;
  logo?: string;
}

export const AddressTypeBadge: React.FC<BadgeProps> = ({
  text,
  isLight,
  colorClass,
  contractVersion,
  logo,
}) => (
  <div className="tags has-addons mr-2 mb-0">
    {logo && (
      <span className={`tag ${colorClass} is-light`}>
        <img
          src={logo}
          alt="Profile"
          style={{ width: '20px', padding: '0.15rem' }}
        />
      </span>
    )}
    <span className={`tag ${colorClass} ${isLight ? 'is-light' : ''}`}>
      {text}
    </span>
    {contractVersion && <span className="tag is-dark">{contractVersion}</span>}
  </div>
);

interface AssetProps {
  assetAddress: string;
  userAddress?: string;
  isLSP7: boolean;
  showName?: boolean;
  showSymbol?: boolean;
  showBalance?: boolean;
}

export const AssetInfosBadge: React.FC<AssetProps> = ({
  assetAddress,
  userAddress,
  isLSP7,
  showName = true,
  showSymbol = true,
  showBalance = true,
}) => {
  const web3 = useWeb3();

  const [assetBalance, setAssetBalance] = useState<string | undefined>();
  const [assetName, setAssetName] = useState('');
  const [assetSymbol, setAssetSymbol] = useState('');

  useEffect(() => {
    let ignore = false;

    const shouldFetchMetadata = showName || showSymbol;
    const shouldFetchBalance = showBalance && Boolean(userAddress);

    if (!web3) {
      setAssetName('');
      setAssetSymbol('');
      setAssetBalance(undefined);
      return () => {
        ignore = true;
      };
    }

    if (!shouldFetchMetadata && !shouldFetchBalance) {
      setAssetName('');
      setAssetSymbol('');
      setAssetBalance(undefined);
      return () => {
        ignore = true;
      };
    }

    async function fetchAssetInfos(currentAddress: string) {
      if (!web3) return;

      try {
        if (shouldFetchMetadata) {
          const [nameBytesValue, symbolBytesValue] = await getDataBatch(
            currentAddress,
            [
              ERC725YDataKeys.LSP4.LSP4TokenName,
              ERC725YDataKeys.LSP4.LSP4TokenSymbol,
            ],
            web3,
          );

          if (!ignore) {
            setAssetName(
              nameBytesValue ? web3.utils.toUtf8(nameBytesValue) : '',
            );
            setAssetSymbol(
              symbolBytesValue ? web3.utils.toUtf8(symbolBytesValue) : '',
            );
          }
        }

        if (shouldFetchBalance) {
          const tokenContract = new web3.eth.Contract(
            LSP7Artifact.abi as AbiItem[],
            currentAddress,
          );

          const fetchedBalance = await tokenContract.methods
            .balanceOf(userAddress as string)
            .call();

          const formattedBalance = isLSP7
            ? parseFloat(web3.utils.fromWei(fetchedBalance, 'ether')).toFixed(2)
            : fetchedBalance;

          if (!ignore) {
            setAssetBalance(formattedBalance);
          }
        } else if (!ignore) {
          setAssetBalance(undefined);
        }
      } catch (error) {
        if (!ignore) {
          setAssetName('');
          setAssetSymbol('');
          setAssetBalance(undefined);
        }
        console.error('Error while fetching asset infos badges:', error);
      }
    }

    fetchAssetInfos(assetAddress);

    return () => {
      ignore = true;
    };
  }, [
    assetAddress,
    web3,
    userAddress,
    isLSP7,
    showName,
    showSymbol,
    showBalance,
  ]);

  if (!showName && !showSymbol && !showBalance) {
    return null;
  }

  return (
    <div className="is-flex">
      {showName && (
        <div className="tags has-addons mr-2 mb-0">
          <span className="tag is-info">name</span>
          <span className="tag is-light">{assetName || '—'}</span>
        </div>
      )}
      {showSymbol && (
        <div className="tags has-addons mr-2 mb-0">
          <span className="tag is-info">symbol</span>
          <span className="tag is-light">{assetSymbol || '—'}</span>
        </div>
      )}
      {showBalance && (
        <div className="tags has-addons mr-2 mb-0">
          <span className="tag is-info">balance</span>
          <span className="tag is-light">
            {assetBalance !== undefined ? assetBalance : '—'}
          </span>
        </div>
      )}
    </div>
  );
};

interface ProfileProps {
  profileAddress: string;
}

export const ProfileInfosBadge: React.FC<ProfileProps> = ({
  profileAddress,
}) => {
  const web3 = useWeb3();

  const [profileName, setProfileName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    async function fetchProfileMetadata(address) {
      if (!web3 || !address) return;

      try {
        const profileMetadata = await getProfileMetadataJSON(address, web3);

        if (profileMetadata?.value?.LSP3Profile) {
          const { name, profileImage } = profileMetadata.value.LSP3Profile;

          // Extract profile name
          if (name) {
            setProfileName(name);
          }

          // Extract profile image (first available image)
          if (profileImage && profileImage.length > 0) {
            // Try to get the first image URL
            let profileImageUrl = profileImage[0].url;

            if (profileImageUrl.startsWith('ipfs://')) {
              const cid = profileImageUrl.replace(/^ipfs:\/\//, '');
              profileImageUrl = `${LUKSO_IPFS_BASE_URL}/${cid}`;
            }

            setProfileImage(profileImageUrl);
          }
        }
      } catch (error) {
        setProfileName('');
        setProfileImage('');
        console.error('Error fetching profile metadata:', error);
      }
    }
    fetchProfileMetadata(profileAddress);
  }, [web3]);

  return (
    <>
      {(profileImage || profileName) && (
        <div className="tags has-addons mr-2 mb-0">
          {profileImage && (
            <span className="tag is-info is-light">
              <img
                src={profileImage}
                alt="Profile"
                style={{ width: '20px', borderRadius: '50%' }}
              />
            </span>
          )}
          {profileName && (
            <span className="tag is-info is-light">{profileName}</span>
          )}
        </div>
      )}
    </>
  );
};
