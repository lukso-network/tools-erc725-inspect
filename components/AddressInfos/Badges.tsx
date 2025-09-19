import { useEffect, useState } from 'react';
import useWeb3 from '@/hooks/useWeb3';

import LSP7Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';
import { AbiItem } from 'web3-utils';
import { getDataBatch, getProfileMetadataJSON } from '@/utils/web3';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import { LUKSO_IPFS_BASE_URL } from '@/globals';

interface BadgeProps {
  text: string;
  isLight?: boolean;
  colorClass?: string;
  contractVersion?: string;
  addLUKSOLogo?: boolean;
}

export const AddressTypeBadge: React.FC<BadgeProps> = ({
  text,
  isLight,
  colorClass,
  contractVersion,
  addLUKSOLogo,
}) => (
  <div className="tags has-addons mr-2 mb-0">
    {addLUKSOLogo && (
      <span className={`tag ${colorClass} is-light`}>
        <img
          src="/lukso-signet-fuschia.svg"
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
  userAddress: string;
  isLSP7: boolean;
}

export const AssetInfosBadge: React.FC<AssetProps> = ({
  assetAddress,
  userAddress,
  isLSP7,
}) => {
  const web3 = useWeb3();

  const [assetBalance, setAssetBalance] = useState<string | undefined>();
  const [assetName, setAssetName] = useState('');
  const [assetSymbol, setAssetSymbol] = useState('');

  useEffect(() => {
    async function getAssetBalance(assetAddress: string) {
      if (!web3 || !userAddress) return;

      const [nameBytesValue, symbolBytesValue] = await getDataBatch(
        assetAddress,
        [
          ERC725YDataKeys.LSP4.LSP4TokenName,
          ERC725YDataKeys.LSP4.LSP4TokenSymbol,
        ],
        web3,
      );

      if (nameBytesValue) {
        setAssetName(web3.utils.toUtf8(nameBytesValue));
      }

      if (symbolBytesValue) {
        setAssetSymbol(web3.utils.toUtf8(symbolBytesValue));
      }

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

      setAssetBalance(formattedBalance);
    }

    getAssetBalance(assetAddress);
  }, [assetAddress, web3, userAddress]);

  return (
    <div className="is-flex">
      <div className="tags has-addons mr-2 mb-0">
        <span className="tag is-info">name</span>
        <span className="tag is-light">{assetName}</span>
      </div>
      <div className="tags has-addons mr-2 mb-0">
        <span className="tag is-info">symbol</span>
        <span className="tag is-light">{assetSymbol}</span>
      </div>
      <div className="tags has-addons mr-2 mb-0">
        <span className="tag is-info">balance</span>
        <span className="tag is-light">{assetBalance}</span>
      </div>
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
            const firstImage = profileImage[0];
            if (firstImage?.url) {
              const { url } = firstImage;
              const cid = url.replace(/^ipfs:\/\//, '');
              setProfileImage(`${LUKSO_IPFS_BASE_URL}/${cid}`);
            }
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
          {profileName && <span className="tag is-info">{profileName}</span>}
        </div>
      )}
    </>
  );
};
