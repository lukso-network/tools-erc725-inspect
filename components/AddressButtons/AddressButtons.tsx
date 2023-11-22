/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Felix Hildebrandt <fhildeb>
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

  const networkType = network.name.toLocaleLowerCase();

  return (
    <div className="buttons is-centered are-small pt-2">
      <a
        className="button is-success is-normal"
        target="_blank"
        rel="noreferrer"
        href={`https://wallet.universalprofile.cloud/${address}?network=${networkType}`}
      >
        View on UP as Profile 🧑‍🎤
      </a>
      <a
        className="button is-success is-normal"
        target="_blank"
        rel="noreferrer"
        href={`https://wallet.universalprofile.cloud/asset/${address}?network=${networkType}`}
      >
        View on UP as Asset 👗
      </a>
      <a
        className="button is-success is-normal"
        target="_blank"
        rel="noreferrer"
        href={`https://explorer.execution.${networkType}.lukso.network/address/${address}`}
      >
        View on Blockscout ⛓
      </a>
      {showInspectButton && (
        <a
          className="button is-success is-normal"
          href={`${window.location.href.split('?')[0]}?address=${address}`}
        >
          ERC725 Inspect 🔍
        </a>
      )}
    </div>
  );
};

export default AddressButtons;
