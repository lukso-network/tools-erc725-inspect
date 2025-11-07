import { useState, useEffect } from 'react';
import { isAddress } from 'web3-utils';
import useWeb3 from '@/hooks/useWeb3';

import { checkInterface } from '@/utils/web3';
import ContractTypeBox from '@/components/ui/ContractTypeBox/ContractTypeBox';

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
    <ContractTypeBox
      title="Owner"
      link="https://docs.lukso.tech/standards/erc725/#ownership"
      label="Owner address"
      address={contractOwner}
      standards={standards}
      description={
        <span>
          Returned by the <code>owner()</code> function
        </span>
      }
    />
  );
};

export default ContractOwner;
