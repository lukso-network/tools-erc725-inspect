import AddressInfos from "@/components/features/AddressInfos";
import AddressButtons from "../AddressButtons";

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
}

const ContractTypeBox = ({ title, link, label, address, standards }: ContractTypeBoxProps) => (
    <>
        <h3 className="title is-3">{title}</h3>
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
                    showInspectButton={false}
                    standards={standards}
                />
            </div>
        </div>
    </>
)

export default ContractTypeBox