import { useContext } from 'react';

import { NetworkContext } from '../../contexts/NetworksContext';
import { SAMPLE_ADDRESS } from '../../constants';

enum AddressType {
  UP = 'UP',
  Asset = 'Asset',
}

interface Props {
  onClick: (newAddress: string) => void;
}

const SampleAddressInput: React.FC<Props> = ({ onClick }) => {
  const { network } = useContext(NetworkContext);

  const changeInputAddress = (type: AddressType) => {
    let address = '';

    switch (type) {
      case AddressType.UP:
        switch (network.name) {
          case 'MAINNET':
            address = SAMPLE_ADDRESS.MAINNET_UP;
            break;
          case 'TESTNET':
            address = SAMPLE_ADDRESS.TESTNET_UP;
            break;
        }
        break;

      case AddressType.Asset:
        switch (network.name) {
          case 'MAINNET':
            address = SAMPLE_ADDRESS.MAINNET_LSP7;
            break;
          case 'TESTNET':
            address = SAMPLE_ADDRESS.TESTNET_LS7;
            break;
        }
        break;
    }

    onClick(address);
  };

  return (
    <div>
      <button
        className="button is-light is-small my-4"
        onClick={() => changeInputAddress(AddressType.UP)}
      >
        Try with a Universal Profile Sample Address
      </button>
      <button
        className="button is-light is-small my-4 ml-2"
        onClick={() => changeInputAddress(AddressType.Asset)}
      >
        Try with a Digital Asset Sample Address
      </button>
    </div>
  );
};

export default SampleAddressInput;
