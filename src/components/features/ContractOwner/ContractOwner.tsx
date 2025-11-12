import { isAddress, type Address } from 'viem';

import { useGetOwner } from '@/hooks/useGetOwner';

import ContractTypeBox from '@/components/ui/ContractTypeBox/ContractTypeBox';
import { useGetSupportedInterfaces } from '@/hooks/useGetSupportedInterfaces';

type Props = {
  contractAddress: string;
};

const ContractOwner: React.FC<Props> = ({ contractAddress }) => {
  const { data: contractOwner } = useGetOwner(
    isAddress(contractAddress) ? (contractAddress as Address) : undefined,
  );

  const { supportedInterfaces } = useGetSupportedInterfaces(contractOwner);

  const {
    isLsp0Erc725Account,
    isLsp7DigitalAsset,
    isLsp8IdentifiableDigitalAsset,
  } = supportedInterfaces || {};

  return (
    <ContractTypeBox
      title="Owner"
      link="https://docs.lukso.tech/standards/erc725/#ownership"
      label="Owner address"
      address={contractOwner || ''}
      standards={{
        isLsp0Erc725Account: isLsp0Erc725Account || false,
        isLsp7DigitalAsset: isLsp7DigitalAsset || false,
        isLsp8IdentifiableDigitalAsset: isLsp8IdentifiableDigitalAsset || false,
      }}
      description={
        <span>
          Returned by the <code>owner()</code> function
        </span>
      }
    />
  );
};

export default ContractOwner;
