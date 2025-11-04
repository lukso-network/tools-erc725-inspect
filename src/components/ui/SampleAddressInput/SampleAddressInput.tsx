import { useContext } from 'react';

import { NetworkContext } from '@/contexts/NetworksContext';
import { SAMPLE_ADDRESS } from '@/constants/contracts';

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
    const addresses = SAMPLE_ADDRESS[network.name];
    if (addresses === null) {
      return;
    }

    let address = '';

    switch (type) {
      case AddressType.UP:
        address = addresses.UP ?? '';
        break;
      case AddressType.LSP7:
        address = addresses.LSP7 ?? '';
        break;
      case AddressType.LSP8:
        address = addresses.LSP8 ?? '';
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
