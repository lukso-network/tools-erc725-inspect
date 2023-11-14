/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React, { useContext } from 'react';
import { NetworkContext } from '../../contexts/NetworksContext';

interface Props {
  address: string;
  showInspectButton?: boolean;
}

const AddressButtons: React.FC<Props> = ({
  address,
  showInspectButton = true,
}) => {
  const { network } = useContext(NetworkContext);

  const networkType = network.name === 'MAINNET' ? 'mainnet' : 'testnet';

  const openProfileExplorer = () => {
    window.open(
      `https://universalprofile.cloud/${address}?network=${networkType}`,
      '_blank',
    );
  };

  const openAssetExplorer = () => {
    window.open(
      `https://universalprofile.cloud/asset/${address}?network=${networkType}`,
      '_blank',
    );
  };

  const openBlockscout = () => {
    const url =
      network.name === 'MAINNET'
        ? `https://explorer.execution.mainnet.lukso.network/address/${address}`
        : `https://explorer.execution.testnet.lukso.network/address/${address}`;
    window.open(url, '_blank');
  };

  const openInspector = () => {
    window.location.href = `${
      window.location.href.split('?')[0]
    }?address=${address}`;
  };

  return (
    <div className="buttons is-centered are-small pt-2">
      <button
        className="button is-primary is-light"
        onClick={openProfileExplorer}
      >
        View as Profile 🧑‍🎤
      </button>
      <button className="button is-info is-light" onClick={openAssetExplorer}>
        View as Asset 👗
      </button>
      <button className="button is-primary is-light" onClick={openBlockscout}>
        View on Blockscout ⛓
      </button>
      {showInspectButton && (
        <button className="button is-primary is-light" onClick={openInspector}>
          Open in ERC725 Inspect 🔍
        </button>
      )}
    </div>
  );
};

export default AddressButtons;
