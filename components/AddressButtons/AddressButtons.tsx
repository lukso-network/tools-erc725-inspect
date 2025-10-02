/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Felix Hildebrandt <fhildeb>
 */
import React, { useContext } from 'react';
import { NetworkContext } from '@/contexts/NetworksContext';

interface Props {
  address: string;
  showInspectButton?: boolean;
  standards?: {
    isLSP0ERC725Account: boolean;
    isLSP7DigitalAsset: boolean;
    isLSP8IdentifiableDigitalAsset: boolean;
  } | null;
}

const AddressButtons: React.FC<Props> = ({
  address,
  showInspectButton = true,
  standards,
}) => {
  const { network } = useContext(NetworkContext);

  const networkType = network.name.toLocaleLowerCase();

  const universalEverythingURL =
    standards && standards.isLSP7DigitalAsset
      ? `https://universaleverything.io/asset/${address}?network=${networkType}`
      : `https://universaleverything.io/${address}?network=${networkType}`;

  return (
    <div className="buttons are-small flex is-flex-direction-column is-align-items-flex-start">
      {standards && (
        <a
          className="button is-normal"
          target="_blank"
          rel="noreferrer"
          href={universalEverythingURL}
        >
          <span className="icon is-small p-1">
            <img
              src="/universaleverything-logo.png"
              alt="UniversalEverything"
            />
          </span>
          <span>View on UniversalEverything.io</span>
        </a>
      )}
      {/* <a
        className="button is-normal"
        target="_blank"
        rel="noreferrer"
        href={universalEverythingURL}
      >
        <span className="icon is-small p-1">
          <img src="/universaleverything-logo.png" alt="UniversalEverything" />
        </span>
        <span>View on UniversalEverything.io</span>
      </a> */}
      <a
        className="button is-normal is-info"
        target="_blank"
        rel="noreferrer"
        href={`https://explorer.execution.${networkType}.lukso.network/address/${address}`}
      >
        <span className="icon is-small">
          <img src="/blockscout-logo-white.svg" alt="Blockscout" />
        </span>
        <span>View on Blockscout</span>
      </a>
      {showInspectButton && (
        <a
          className="button is-primary is-normal"
          href={`${window.location.href.split('?')[0]}?address=${address}`}
        >
          <span className="icon is-small">
            <img src="/inspect-icon.svg" alt="ERC725 Inspect" />
          </span>
          <span>Inspect with erc725-inspect</span>
        </a>
      )}
    </div>
  );
};

export default AddressButtons;
