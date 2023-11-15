/**
 * @author Felix Hildebrandt <fhildeb>
 */

import { useContext } from 'react';
import { NetworkContext } from '../../contexts/NetworksContext';
import { SAMPLE_ADDRESS } from '../../constants';
enum AddressType {
  UP = 'UP',
  Asset = 'Asset',
}

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SampleAddressInput: React.FC<Props> = ({ inputRef, onChange }) => {
  const { network } = useContext(NetworkContext);

  const changeInputAddress = (type: AddressType) => {
    let address: string | null = null;

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

    if (address && inputRef.current) {
      inputRef.current.value = address;
      onChange({
        target: { value: address },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div>
      <button
        className="button is-light is-small mt-2 mb-2"
        onClick={() => changeInputAddress(AddressType.UP)}
      >
        Use Universal Profile Sample Address
      </button>
      <button
        className="button is-light is-small mt-2 mb-2 ml-2"
        onClick={() => changeInputAddress(AddressType.Asset)}
      >
        Use Digital Asset Sample Address
      </button>
    </div>
  );
};

export default SampleAddressInput;
