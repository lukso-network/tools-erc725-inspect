import type { ReactNode } from 'react';

import AddressInfos from '@/components/features/AddressInfos';
import AddressButtons from '../AddressButtons';

type ContractTypeBoxProps = {
  title: string;
  link: string;
  label: string;
  address: string;
  standards: {
    isLsp0Erc725Account: boolean;
    isLsp7DigitalAsset: boolean;
    isLsp8IdentifiableDigitalAsset: boolean;
  };
  description?: ReactNode;
  showInspectButton?: boolean;
};

const ContractTypeBox = ({
  title,
  link,
  label,
  address,
  standards,
  description,
  showInspectButton = true,
}: ContractTypeBoxProps) => (
  <>
    <div className="columns is-multiline dataKeyBox my-3">
      <div className="column is-two-thirds">
        <div className="content">
          <div className="title is-4">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="home-link"
            >
              {title} ↗️
            </a>
          </div>
          {description && (
            <div className="has-background-link-light p-2 m-4 is-size-6">
              {description}
            </div>
          )}
          <ul>
            <li>
              <strong className="mr-2">{label}:</strong>
              <code>{address}</code>
            </li>
            <li className="is-flex is-align-items-center">
              <strong className="mr-2">Contract type:</strong>{' '}
              <AddressInfos
                address={address}
                assetBadgeOptions={{
                  showBalance: false,
                  showName: true,
                }}
                showAddress={false}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="column">
        <AddressButtons
          address={address}
          showInspectButton={showInspectButton}
          standards={standards}
        />
      </div>
    </div>
  </>
);

export default ContractTypeBox;
