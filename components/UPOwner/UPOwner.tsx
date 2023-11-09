import { useState, useEffect } from 'react';
import ERC725Account from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';
import useWeb3 from '../../hooks/useWeb3';

import { eip165ABI } from '../../constants';
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

  const web3 = useWeb3();

  const checkIsKeyManager = async (ownerAddress: string) => {
    if (!web3) {
      console.error('Web3 is not initialized');
      return;
    }

    const OwnerContract = new web3.eth.Contract(eip165ABI as any, ownerAddress);

    let isKeyManager = false;
    try {
      isKeyManager = await OwnerContract.methods
        .supportsInterface(INTERFACE_IDS.LSP6KeyManager)
        .call();
    } catch (err: any) {
      console.warn(err.message);
    }

    //if not key manager then it is a smart contract (could be UP or anything else)
    if (isKeyManager) {
      setOwnerType(ownerTypeEnum.KeyManager);
    } else {
      setOwnerType(ownerTypeEnum.SmartContract);
    }
  };

  const findOwnerType = async (ownerAddress: string) => {
    if (!web3) {
      console.error('Web3 is not initialized');
      return;
    }

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

    const setOwner = async () => {
      try {
        await universalProfile.methods
          .owner()
          .call()
          .then((owner: string) => {
            setUPowner(owner);
            findOwnerType(owner);
          });
      } catch (error) {
        console.log(error);
      }
    };

    setOwner();
  }, [UPAddress, web3]);

  return (
    <div className="columns is-multiline">
      <div className="column is-full">
        <div className="content pt-5">
          <h4 className="title is-4">Owner</h4>
          <ul>
            <li>
              Owner address{' '}
              <span className="tag is-medium is-link is-light">address</span>:{' '}
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
