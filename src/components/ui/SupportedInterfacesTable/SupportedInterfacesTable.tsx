import React from 'react';

import {
    ACCESS_CONTROL_INTERFACE_IDS,
    ACCOUNT_INTERFACE_IDS,
    ASSETS_INTERFACE_IDS,
    OTHER_INTERFACE_IDS,
} from '@/constants/interface-ids';

type SupportedInterfacesTableProps = {
    supports: {
        isErc725X: boolean;
        isErc725Y: boolean;
        isErc1271: boolean;
        isLsp0Erc725Account: boolean;
        isLsp1UniversalReceiver: boolean;
        isLsp17Extendable: boolean;
        isLsp25ExecuteRelayCall: boolean;
        isLsp6KeyManager: boolean;
        isLsp14OwnableTwoSteps: boolean;
        isLsp20CallVerification: boolean;
        isLsp20CallVerifier: boolean;
        isLsp7DigitalAsset: boolean;
        isLsp8IdentifiableDigitalAsset: boolean;
        isErc20: boolean;
        isErc721: boolean;
        isLsp1Delegate: boolean;
        isLsp9Vault: boolean;
        isLsp17Extension: boolean;
        isLsp26FollowerSystem: boolean;
    };
};

const SupportedInterfacesTable: React.FC<SupportedInterfacesTableProps> = ({
    supports,
}) => {
    const {
        isErc725X,
        isErc725Y,
        isErc1271,
        isLsp0Erc725Account,
        isLsp1UniversalReceiver,
        isLsp17Extendable,
        isLsp25ExecuteRelayCall,
        isLsp6KeyManager,
        isLsp14OwnableTwoSteps,
        isLsp20CallVerification,
        isLsp20CallVerifier,
        isLsp7DigitalAsset,
        isLsp8IdentifiableDigitalAsset,
        isErc20,
        isErc721,
        isLsp1Delegate,
        isLsp9Vault,
        isLsp17Extension,
        isLsp26FollowerSystem,
    } = supports;

    const getInterfaceSupport = (standard: string): boolean => {
        const interfaceMap: { [key: string]: boolean } = {
            // Account Standards
            ERC725X: isErc725X,
            ERC725Y: isErc725Y,
            ERC1271: isErc1271,
            LSP0Erc725Account: isLsp0Erc725Account,
            LSP1UniversalReceiver: isLsp1UniversalReceiver,
            LSP17Extendable: isLsp17Extendable,
            LSP25ExecuteRelayCall: isLsp25ExecuteRelayCall,
            // Access Control Standards
            LSP6KeyManager: isLsp6KeyManager,
            LSP14OwnableTwoSteps: isLsp14OwnableTwoSteps,
            LSP20CallVerification: isLsp20CallVerification,
            LSP20CallVerifier: isLsp20CallVerifier,
            // Asset Standards
            LSP7DigitalAsset: isLsp7DigitalAsset,
            LSP8IdentifiableDigitalAsset: isLsp8IdentifiableDigitalAsset,
            ERC20: isErc20,
            ERC721: isErc721,
            // Other Standards
            LSP1Delegate: isLsp1Delegate,
            LSP9Vault: isLsp9Vault,
            LSP17Extension: isLsp17Extension,
            LSP26FollowerSystem: isLsp26FollowerSystem,
        };

        return interfaceMap[standard] || false;
    };

    return (
        <>
            <h3 className="title is-3">Supported Standards</h3>
            <div className="columns">
                <div className="column is-half">
                    <table className="table is-borderless is-size-7 table-no-borders">
                        <thead>
                            <tr>
                                <th>Account Standard</th>
                                <th>Interface ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(ACCOUNT_INTERFACE_IDS).map(
                                ([standard, { interfaceId, docsUrl }]) => (
                                    <tr key={interfaceId}>
                                        <td>
                                            <a
                                                className={`button is-small is-info ${getInterfaceSupport(standard) ? '' : 'is-outlined'
                                                    }`}
                                                href={docsUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {standard} ↗️
                                            </a>
                                        </td>
                                        <td className="is-vcentered">
                                            <code>{interfaceId}</code>
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                    <table className="table is-borderless is-size-7 table-no-borders">
                        <thead>
                            <tr>
                                <th>Access Control Standard</th>
                                <th>Interface ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(ACCESS_CONTROL_INTERFACE_IDS).map(
                                ([standard, { interfaceId, docsUrl }]) => (
                                    <tr key={interfaceId}>
                                        <td>
                                            <a
                                                className={`button is-small is-info ${getInterfaceSupport(standard) ? '' : 'is-outlined'
                                                    }`}
                                                href={docsUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {standard} ↗️
                                            </a>
                                        </td>
                                        <td className="is-vcentered">
                                            <code>{interfaceId}</code>
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="column is-half">
                    <table className="table is-borderless is-size-7 justify-content-center table-no-borders">
                        <thead>
                            <tr>
                                <th>Asset Standard</th>
                                <th>Interface ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(ASSETS_INTERFACE_IDS).map(
                                ([standard, { interfaceId, docsUrl }]) => (
                                    <tr key={interfaceId}>
                                        <td>
                                            <a
                                                className={`button is-small is-info ${getInterfaceSupport(standard) ? '' : 'is-outlined'
                                                    }`}
                                                href={docsUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {standard} ↗️
                                            </a>
                                        </td>
                                        <td className="is-vcentered">
                                            <code>{interfaceId}</code>
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                    <table className="table is-borderless is-size-7 table-no-borders">
                        <thead>
                            <tr>
                                <th>Other Standard</th>
                                <th>Interface ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(OTHER_INTERFACE_IDS).map(
                                ([standard, { interfaceId, docsUrl }]) => (
                                    <tr key={interfaceId}>
                                        <td>
                                            <a
                                                className={`button is-small is-info ${getInterfaceSupport(standard) ? '' : 'is-outlined'
                                                    }`}
                                                href={docsUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {standard} ↗️
                                            </a>
                                        </td>
                                        <td className="is-vcentered">
                                            <code>{interfaceId}</code>
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                    <a
                        href="https://docs.lukso.tech/contracts/interface-ids/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        📚↗️ All interface IDs on docs.lukso.tech
                    </a>
                </div>
            </div>
        </>
    );
};

export default SupportedInterfacesTable;

