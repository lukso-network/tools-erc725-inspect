import { useState, useEffect, useContext } from 'react';
import { isAddress, type Address } from 'viem';
import { useGetOwner } from '@/hooks/useGetOwner';

import { checkInterface } from '@/utils/web3';
import ContractTypeBox from '@/components/ui/ContractTypeBox/ContractTypeBox';
import { NetworkContext } from '@/contexts/NetworksContext';

type Props = {
  contractAddress: string;
};

const ContractOwner: React.FC<Props> = ({ contractAddress }) => {
  const { network } = useContext(NetworkContext);
  const { data: contractOwner, isLoading } = useGetOwner(
    isAddress(contractAddress) ? (contractAddress as Address) : undefined
  );

  const [standards, setStandards] = useState<{
    isLsp0Erc725Account: boolean;
    isLsp7DigitalAsset: boolean;
    isLsp8IdentifiableDigitalAsset: boolean;
  }>({
    isLsp0Erc725Account: false,
    isLsp7DigitalAsset: false,
    isLsp8IdentifiableDigitalAsset: false,
  });

  useEffect(() => {
    if (!contractOwner || !network?.rpcUrl) return;

    const getOwnerStandards = async () => {
      try {
        const {
          isLsp0Erc725Account,
          isLsp7DigitalAsset,
          isLsp8IdentifiableDigitalAsset,
        } = await checkInterface(contractOwner, network.rpcUrl);

        setStandards({
          isLsp0Erc725Account,
          isLsp7DigitalAsset,
          isLsp8IdentifiableDigitalAsset,
        });
      } catch (error) {
        console.error('Error while getting owner standards:', error);
      }
    };

    getOwnerStandards();
  }, [contractOwner, network]);

  return (
    <ContractTypeBox
      title="Owner"
      link="https://docs.lukso.tech/standards/erc725/#ownership"
      label="Owner address"
      address={contractOwner || ''}
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
