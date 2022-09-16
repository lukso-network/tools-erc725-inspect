import { useState, useEffect, useContext } from 'react';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts/constants.js';

import { NetworkContext } from '../../contexts/NetworksContext';
import { supportsInterfaceAbi } from '../../constants';

type Props = {
  UPAddress: string;
};

enum ownerTypeEnum {
  KeyManager = 'Key Manager',
  SmartContract = 'Smart Contract',
  EOA = 'EOA',
}

const UPOwner: React.FC<Props> = ({ UPAddress }) => {
  const [UPOwner, setUPowner] = useState('');
  const [ownerType, setOwnerType] = useState<ownerTypeEnum>();

  const { web3 } = useContext(NetworkContext);

  const checkIsKeyManager = async (ownerAddress: string) => {
    const OwnerContract = new web3.eth.Contract(
      supportsInterfaceAbi as any,
      ownerAddress,
    );
    const isKeyManager = await OwnerContract.methods
      .supportsInterface(INTERFACE_IDS.LSP6KeyManager)
      .call();

    //if not key manager then it is a smart contract (could be UP or anything else)
    if (isKeyManager) {
      setOwnerType(ownerTypeEnum.KeyManager);
    } else {
      setOwnerType(ownerTypeEnum.SmartContract);
    }
  };

  const findOwnerType = async (ownerAddress: string) => {
    const isEOA = (await web3.eth.getCode(ownerAddress)) === '0x';
    if (isEOA) {
      setOwnerType(ownerTypeEnum.EOA);
      return;
    }
    await checkIsKeyManager(ownerAddress);
  };

  useEffect(() => {
    if (!web3 || !UPAddress) return;
    const universalProfile = new web3.eth.Contract(
      UniversalProfile.abi as any,
      UPAddress,
    );
    universalProfile.methods
      .owner()
      .call()
      .then((owner: string) => {
        setUPowner(owner);
        findOwnerType(owner);
      });
  }, [UPAddress, web3]);

  return (
    <div className="columns is-multiline">
      <div className="column is-full">
        <div className="content pt-5">
          <h4 className="title is-4">Owner</h4>
          <ul>
            <li>
              Owner address{' '}
              <span className="tag is-link is-light">address</span>:{' '}
              <code>{UPOwner}</code>
            </li>
            <li>
              Owner type: <strong>{ownerType}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UPOwner;
