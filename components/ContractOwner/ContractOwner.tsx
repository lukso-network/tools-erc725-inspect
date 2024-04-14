import { useState, useEffect } from 'react';
import ERC725Account from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';
import useWeb3 from '../../hooks/useWeb3';

import { eip165ABI } from '../../constants';
import { AbiItem, isAddress } from 'web3-utils';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';
import AddressButtons from '../AddressButtons';

type Props = {
  contractAddress: string;
};

enum ownerTypeEnum {
  KeyManager = 'Key Manager',
  SmartContract = 'Smart Contract',
  EOA = 'EOA',
}

const ContractOwner: React.FC<Props> = ({ contractAddress }) => {
  const [ContractOwner, setContractOwner] = useState('');
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

    // if not key manager then it is a smart contract (could be UP or anything else)
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
    if (!web3 || !contractAddress) return;
    if (!isAddress(contractAddress)) return;

    const universalProfile = new web3.eth.Contract(
      ERC725Account.abi as AbiItem[],
      contractAddress,
    );

    const setOwner = async () => {
      try {
        await universalProfile.methods
          .owner()
          .call()
          .then((owner: string) => {
            setContractOwner(owner);
            findOwnerType(owner);
          });
      } catch (error) {
        console.log(error);
      }
    };

    setOwner();
  }, [contractAddress, web3]);

  return (
    <div className="columns is-multiline mt-3">
      <div className="column is-full dataKeyBox">
        <div className="content">
          <div className="title is-4 home-link">
            <a
              href="https://docs.lukso.tech/standards/lsp-background/erc725/#ownership"
              target="_blank"
              rel="noopener noreferrer"
            >
              Owner ↗️
            </a>
          </div>
          <ul>
            <li>
              <strong>Owner address:</strong>
              <span className="tag is-small mb-2 mx-2 is-link is-light">
                address
              </span>
              <code>{ContractOwner}</code>
            </li>
            <li>
              <strong>Owner type:</strong> <code>{ownerType}</code>
            </li>
          </ul>
          <AddressButtons address={ContractOwner}></AddressButtons>
        </div>
      </div>
    </div>
  );
};

export default ContractOwner;
