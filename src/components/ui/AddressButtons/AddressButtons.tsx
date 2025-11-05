/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Felix Hildebrandt <fhildeb>
 */
import React, { useContext, useEffect, useState } from 'react';
import { NetworkContext } from '@/contexts/NetworksContext';
import { NetworkName } from '@/types/network';

interface Props {
  address: string;
  showInspectButton?: boolean;
  standards?: {
    isLsp0Erc725Account: boolean;
    isLsp7DigitalAsset: boolean;
    isLsp8IdentifiableDigitalAsset: boolean;
  } | null;
}

const AddressButtons: React.FC<Props> = ({
  address,
  showInspectButton = true,
  standards,
}) => {
  const { network: currentNetwork } = useContext(NetworkContext);
  const [universalEverythingUrl, setUniversalEverythingUrl] = useState<
    string | undefined
  >(undefined);

  const isLuksoNetwork =
    currentNetwork.name === NetworkName.LUKSO_MAINNET ||
    currentNetwork.name === NetworkName.LUKSO_TESTNET;

  const networkType =
    currentNetwork.name === NetworkName.LUKSO_TESTNET ? 'testnet' : 'mainnet';

  useEffect(() => {
    if (!standards || !isLuksoNetwork) return;

    if (
      standards.isLsp7DigitalAsset ||
      standards.isLsp8IdentifiableDigitalAsset
    ) {
      setUniversalEverythingUrl(
        `https://universaleverything.io/asset/${address}?network=${networkType}`,
      );
    }

    if (standards.isLsp0Erc725Account) {
      setUniversalEverythingUrl(
        `https://universaleverything.io/${address}?network=${networkType}`,
      );
    }
  }, [standards, address, networkType]);

  const explorerUrl = currentNetwork.explorerBaseUrl
    ? `${currentNetwork.explorerBaseUrl}/address/${address}`
    : undefined;

  const explorerLogo =
    currentNetwork.explorerName === 'Etherscan'
      ? '/etherscan-logo.svg'
      : '/blockscout-logo-white.svg';

  const inspectUrl =
    typeof window !== 'undefined'
      ? `${window.location.href.split('?')[0]}?address=${address}`
      : `?address=${address}`;

  return (
    <div className="buttons are-small flex is-flex-direction-column is-align-items-flex-start">
      {universalEverythingUrl && (
        <a
          className="button is-normal"
          target="_blank"
          rel="noreferrer"
          href={universalEverythingUrl}
        >
          <span className="icon is-small p-1">
            <img
              src="/universaleverything-logo.png"
              alt="UniversalEverything"
            />
          </span>
          <span>View on Universal Everything</span>
        </a>
      )}
      {explorerUrl && (
        <a
          className={`button is-normal ${
            currentNetwork.explorerName === 'Etherscan'
              ? 'is-normal'
              : 'is-info'
          }`}
          target="_blank"
          rel="noreferrer"
          href={explorerUrl}
        >
          <span className="icon is-small mr-2">
            <img
              src={explorerLogo}
              alt={currentNetwork.explorerName || 'Explorer'}
            />
          </span>
          <span>View on {currentNetwork.explorerName || 'Explorer'}</span>
        </a>
      )}
      {showInspectButton && (
        <a className="button is-primary is-normal" href={inspectUrl}>
          <span className="icon is-small">
            <img src="/inspect-icon.svg" alt="ERC725 Inspect" />
          </span>
          <span>Inspect with ERC725 Inspect</span>
        </a>
      )}
    </div>
  );
};

export default AddressButtons;
