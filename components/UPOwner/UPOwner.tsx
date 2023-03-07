import { useState, useEffect, useContext } from 'react';
import ERC725Account from '../../abis/ERC725Account.json';

import { NetworkContext } from '../../contexts/NetworksContext';
import { supportsInterfaceAbi } from '../../constants';
import { AbiItem, isAddress } from 'web3-utils';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

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
    try {
      const isEOA = (await web3.eth.getCode(ownerAddress)) === '0x';
      if (isEOA) {
        setOwnerType(ownerTypeEnum.EOA);
        return;
      }
      await checkIsKeyManager(ownerAddress);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!web3 || !UPAddress) return;
    if (!isAddress(UPAddress)) return;

    const universalProfile = new web3.eth.Contract(
      ERC725Account.abi as AbiItem[],
      UPAddress,
    );
    try {
      universalProfile.methods
        .owner()
        .call()
        .then((owner: string) => {
          setUPowner(owner);
          findOwnerType(owner);
        });
    } catch (error) {
      console.log(error);
    }
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
