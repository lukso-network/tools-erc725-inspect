import useWeb3 from "@/hooks/useWeb3";
import { ERC725JSONSchema } from "@erc725/erc725.js";
import { useEffect, useState } from "react";

// components
import DataKeyBox from "@/components/ui/DataKeyBox/DataKeyBox";

// constants
import { LSP1TypeIdsDescriptions } from "@/constants/schemas";

// LSP2 schemas
import LSP1NotificationsSchema from './LSP1NotificationsSchema.json';

// utilities
import { getDataBatch } from "@/utils/web3";


interface Props {
    address: string;
    isErc725Y: boolean;
}

const LSP1DelegateDataKeys: React.FC<Props> = ({ address, isErc725Y }) => {
    const web3 = useWeb3();

    const [data, setData] = useState<
        {
            key: string;
            value: string | string[];
            schema: ERC725JSONSchema;
        }[]
    >([]);

    useEffect(() => {
        const fetch = async () => {
            if (!web3) return;

            if (!isErc725Y) return;

            const dataResult: {
                key: string;
                value: string;
                schema: ERC725JSONSchema;
            }[] = [];

            try {
                if (isErc725Y) {

                    const dataKeys = LSP1NotificationsSchema.map((schema) => schema.key);

                    const result = await getDataBatch(address, dataKeys, web3);
                    result.map((_, i) => {
                        dataResult.push({
                            key: dataKeys[i],
                            value: result[i],
                            schema: LSP1NotificationsSchema[i],
                        });
                    });
                }
            } catch (err) {
                console.error(err);
            }

            setData(dataResult);
        };

        fetch();
    }, [address, web3, isErc725Y]);

    return (
        <div className="is-multiline">
            <h3 className="title is-3 mt-6">📢 LSP1 Delegate Data Keys</h3>
            <article className="columns mx-1 message is-info">
                <div className="content message-body">
                    <p>
                        Use these ERC725Y data keys on your Universal Profile to register
                        <a
                            href="https://docs.lukso.tech/standards/accounts/lsp1-universal-receiver-delegate/"
                            target="_blank"
                            rel="noreferrer"
                            className="mx-1"
                        >
                            <strong>LSP1Delegate contract</strong>
                        </a>{' '}
                        to react on various notification types it receives (called{' '}
                        <i>Type IDs</i>).
                    </p>
                    <p>
                        The code at the smart contract address registered under each of
                        these specific data keys will run after your 🆙 has been notified!
                    </p>
                    <p className="title is-5 has-text-link">How it works</p>
                    <ul>
                        <li>
                            Each <strong>Key</strong> is named:{' '}
                            <code>
                                LSP1UniversalReceiverDelegate:{'<NotificationTypeId>'}
                            </code>
                            <li>
                                <strong>Decoded value:</strong> address of the{' '}
                                <code>LSP1Delegate</code> smart contract registered for this
                                notification type
                            </li>
                        </li>
                        <li>
                            When your Universal Profile gets a notification with this type ID,
                            it will:
                            <ol>
                                <li>Look up the matching data key</li>
                                <li>Read the value under it</li>
                                <li>
                                    If a smart contract address is registered under this data key,
                                    it will call its{' '}
                                    <code>
                                        universalReceiverDelegate(uint256 typeId, bytes data)
                                    </code>{' '}
                                    function.
                                </li>
                            </ol>
                        </li>
                    </ul>
                    <p>
                        This lets you plug custom logic to run after receiving notifications
                        like <i>&quot;I received some tokens&quot;</i>,{' '}
                        <i>&quot;I received some LYX&quot;</i>,{' '}
                        <i>&quot;I have a new follower&quot;</i>, and many more.
                    </p>
                </div>
            </article>

            <article className="columns m-1 message is-success">
                <div className="message-body">
                    You can find all the notification types available in the{' '}
                    <strong>
                        <a
                            href="https://docs.lukso.tech/contracts/type-ids/"
                            target="_blank"
                            rel="noreferrer"
                            className="mx-1"
                        >
                            Universal Receiver Type IDs
                        </a>
                    </strong>{' '}
                    page on docs.lukso.tech
                </div>
            </article>

            {data
                .map((data) => {
                    const { key, schema } = data;
                    const namePrefix = 'LSP1UniversalReceiverDelegate:'
                    return (
                        <>
                            <DataKeyBox key={key} address={address} data={data} />
                            <article className="columns m-1 p-1 message has-background-warning-light">
                                <div className="message-body is-text-small">
                                    <strong>What does this do?</strong>{' '}
                                    {LSP1TypeIdsDescriptions[schema.name.slice(namePrefix.length).trim()]}
                                </div>
                            </article>
                        </>
                    );
                })}
        </div>
    )


}

export default LSP1DelegateDataKeys;