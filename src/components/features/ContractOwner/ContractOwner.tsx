import { useState, useEffect } from 'react';
import { isAddress } from 'web3-utils';
import useWeb3 from '@/hooks/useWeb3';

import AddressButtons from '@/components/ui/AddressButtons';
import AddressInfos from '../AddressInfos';
import { checkInterface } from '@/utils/web3';

type Props = {
  contractAddress: string;
};

const ContractOwner: React.FC<Props> = ({ contractAddress }) => {
  const web3 = useWeb3();
  const [contractOwner, setContractOwner] = useState('');
  const [standards, setStandards] = useState({
    isLsp0Erc725Account: false,
    isLsp7DigitalAsset: false,
    isLsp8IdentifiableDigitalAsset: false,
  });

  useEffect(() => {
    if (!web3 || !contractAddress) return;
    if (!isAddress(contractAddress)) return;

    const contractInstance = new web3.eth.Contract(
      [
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      contractAddress,
    );

    const getOwnerInfos = async () => {
      try {
        const owner = await contractInstance.methods.owner().call();

        setContractOwner(owner);

        const {
          isLsp0Erc725Account,
          isLsp7DigitalAsset,
          isLsp8IdentifiableDigitalAsset,
        } = await checkInterface(owner, web3);

        setStandards({
          isLsp0Erc725Account,
          isLsp7DigitalAsset,
          isLsp8IdentifiableDigitalAsset,
        });
      } catch (error) {
        console.error('Error while getting owner infos:', error);
      }
    };

    getOwnerInfos();
  }, [contractAddress, web3]);

  return (
    <div className="columns is-multiline dataKeyBox my-3">
      <div className="column is-two-thirds">
        <div className="content">
          <div className="title is-4 home-link">
            <a
              href="https://docs.lukso.tech/standards/erc725/#ownership"
              target="_blank"
              rel="noopener noreferrer"
            >
              Owner ↗️
            </a>
          </div>
          <div className="has-background-link-light p-2 m-4 is-size-6">
            Returned by the <code>owner()</code> function
          </div>
          <ul>
            <li>
              <strong>Owner address:</strong>
              <span className="tag is-small mb-2 mx-2 is-link is-light">
                address
              </span>
              <code>{contractOwner}</code>
            </li>
            <li className="is-flex is-align-items-center">
              <strong className="mr-2">Owner type:</strong>
              <AddressInfos address={contractOwner} showAddress={false} />
            </li>
          </ul>
        </div>
      </div>
      <div className="column">
        <AddressButtons address={contractOwner} standards={standards} />
      </div>
    </div>
  );
};

export default ContractOwner;
