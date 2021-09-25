import React from 'react';

interface Props {
  address: string;
}

const AddressButtons: React.FC<Props> = ({ address }) => {
  return (
    <div className="buttons are-small pt-2">
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
      <a
        className="button is-link is-light"
        href={`${window.location}?address=${address}`}
      >
        ERC725 Inspect 🔍
      </a>
    </div>
  );
};

export default AddressButtons;
