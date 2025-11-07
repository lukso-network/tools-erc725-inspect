import { useContext, useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import { type Address, formatEther, hexToString } from 'viem';

import { NetworkContext } from '@/contexts/NetworksContext';

// utils
import { getChainIdByNetworkName } from '@/config/wagmi';
import { getDataBatch } from '@/utils/erc725y';
import { fetchProfileMetadataJSON } from '@/utils/metadata';

// constants
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
  const { network } = useContext(NetworkContext);
  const chainId = getChainIdByNetworkName(network.name);
  const publicClient = usePublicClient({ chainId });

  const [assetBalance, setAssetBalance] = useState<string | bigint>();
  const [assetName, setAssetName] = useState('');
  const [assetSymbol, setAssetSymbol] = useState('');

  useEffect(() => {
    let ignore = false;

    const shouldFetchMetadata = showName || showSymbol;
    const shouldFetchBalance = showBalance && Boolean(userAddress);

    if (!network) {
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
      if (!network || !publicClient) return;

      try {
        if (shouldFetchMetadata) {
          const [nameBytesValue, symbolBytesValue] = await getDataBatch(
            currentAddress,
            [
              ERC725YDataKeys.LSP4.LSP4TokenName,
              ERC725YDataKeys.LSP4.LSP4TokenSymbol,
            ],
            network,
          );

          if (!ignore) {
            setAssetName(nameBytesValue ? hexToString(nameBytesValue) : '');
            setAssetSymbol(
              symbolBytesValue ? hexToString(symbolBytesValue) : '',
            );
          }
        }

        if (shouldFetchBalance) {
          const fetchedBalance = await publicClient.readContract({
            address: currentAddress as Address,
            abi: [
              {
                inputs: [
                  {
                    internalType: 'address',
                    name: 'tokenOwner',
                    type: 'address',
                  },
                ],
                name: 'balanceOf',
                outputs: [
                  {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                  },
                ],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            functionName: 'balanceOf',
            args: [userAddress as `0x${string}`],
          });

          const formattedBalance = isLSP7
            ? parseFloat(formatEther(fetchedBalance)).toFixed(2)
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
    network,
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
  const { network } = useContext(NetworkContext);

  const [profileName, setProfileName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    async function fetchProfileMetadata(address) {
      if (!network || !address) return;

      try {
        const profileMetadata = await fetchProfileMetadataJSON(
          address,
          network.rpcUrl,
        );

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
  }, [network]);

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
