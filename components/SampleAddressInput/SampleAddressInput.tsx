import { useContext } from 'react';

import { NetworkContext } from '@/contexts/NetworksContext';
import { SAMPLE_ADDRESS } from '@/constants';

enum AddressType {
  UP = 'UP',
  LSP7 = 'LSP7',
  LSP8 = 'LSP8',
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

      case AddressType.LSP7:
        switch (network.name) {
          case 'MAINNET':
            address = SAMPLE_ADDRESS.MAINNET_LSP7;
            break;
          case 'TESTNET':
            address = SAMPLE_ADDRESS.TESTNET_LS7;
            break;
        }
        break;

      case AddressType.LSP8:
        switch (network.name) {
          case 'MAINNET':
            address = SAMPLE_ADDRESS.MAINNET_LSP8;
            break;
          case 'TESTNET':
            address = SAMPLE_ADDRESS.TESTNET_LSP8;
            break;
        }
        break;
    }

    onClick(address);
  };

  return (
    <div className="is-flex is-flex-direction-row is-align-items-center">
      <span className="mr-2">Try with:</span>
      <button
        className="button is-light is-small my-4"
        onClick={() => changeInputAddress(AddressType.UP)}
      >
        🆙 Universal Profile Sample Address
      </button>
      <button
        className="button is-light is-small my-4 ml-2"
        onClick={() => changeInputAddress(AddressType.LSP7)}
      >
        🪙 LSP7 Sample Address
      </button>
      <button
        className="button is-light is-small my-4 ml-2"
        onClick={() => changeInputAddress(AddressType.LSP8)}
      >
        🖼️ LSP8 Sample Address
      </button>
    </div>
  );
};

export default SampleAddressInput;
