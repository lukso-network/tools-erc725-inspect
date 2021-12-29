/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React from 'react';

interface Props {
  address: string;
  showInspectButton?: boolean;
}

const AddressButtons: React.FC<Props> = ({
  address,
  showInspectButton = true,
}) => {
  return (
    <div className="buttons is-centered are-small pt-2">
      <a
        className="button is-primary is-light"
        target="_blank"
        rel="noreferrer"
        href={`https://universalprofile.cloud/${address}`}
      >
        View on UP as Profile 🧑‍🎤
      </a>
      <a
        className="button is-info is-light"
        target="_blank"
        rel="noreferrer"
        href={`https://universalprofile.cloud/asset/${address}`}
      >
        View on UP as Asset 👗
      </a>
      <a
        className="button is-link is-light"
        target="_blank"
        rel="noreferrer"
        href={`https://blockscout.com/lukso/l14/address/${address}`}
      >
        View on Blockscout ⛓
      </a>
      {showInspectButton && (
        <a
          className="button is-link is-light"
          href={`${window.location.href.split('?')[0]}?address=${address}`}
        >
          ERC725 Inspect 🔍
        </a>
      )}
    </div>
  );
};

export default AddressButtons;
