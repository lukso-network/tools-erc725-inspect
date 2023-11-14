/**
 * @author Felix Hildebrandt <fhildeb>
 */

import { useContext } from 'react';
import { NetworkContext } from '../../contexts/NetworksContext';

enum AddressType {
  UP = 'UP',
  Asset = 'Asset',
}

interface Props {
  inputId: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SampleAddressInput: React.FC<Props> = ({ inputId, onChange }) => {
  const { network } = useContext(NetworkContext);

  const changeInputAddress = (type: AddressType) => {
    let address;
    if (type === AddressType.UP) {
      if (network.name === 'MAINNET') {
        // TODO: Update to Mainnet Profile
        address = '0x9139def55c73c12bcda9c44f12326686e3948634';
      } else if (network.name === 'TESTNET') {
        address = '0x9139def55c73c12bcda9c44f12326686e3948634';
      }
    } else if (type === AddressType.Asset) {
      if (network.name === 'MAINNET') {
        // TODO: Update to Mainnet Asset
        address = '0x6395b330F063F96579aA8F7b59f2584fb9b6c3a5';
      } else if (network.name === 'TESTNET') {
        address = '0x6395b330F063F96579aA8F7b59f2584fb9b6c3a5';
      }
    }

    if (address) {
      const inputElement = document.getElementById(inputId) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = address;
        onChange({
          target: { value: address },
        } as React.ChangeEvent<HTMLInputElement>);
      }
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
