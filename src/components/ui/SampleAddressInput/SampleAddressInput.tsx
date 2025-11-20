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
  const sampleAddresses = SAMPLE_ADDRESS[network.name];

  // Do not show for networks that do not have sample addresses
  if (sampleAddresses === null) return;

  return (
    <div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-align-items-center">
      <span className="mr-2">Try with:</span>
      <button
        className="button is-light is-small my-2"
        onClick={() => onClick(sampleAddresses[AddressType.UP])}
      >
        🆙 Universal Profile Sample Address
      </button>
      <button
        className="button is-light is-small my-2 ml-2"
        onClick={() => onClick(sampleAddresses[AddressType.LSP7])}
      >
        🪙 LSP7 Sample Address
      </button>
      <button
        className="button is-light is-small my-2 ml-2"
        onClick={() => onClick(sampleAddresses[AddressType.LSP8])}
      >
        🖼️ LSP8 Sample Address
      </button>
    </div>
  );
};

export default SampleAddressInput;
