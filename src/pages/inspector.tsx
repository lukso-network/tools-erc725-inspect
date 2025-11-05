/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { isAddress } from 'web3-utils';

import '@/styles/Inspect.module.css';
import { checkInterface, getVersion } from '@/utils/web3';

import AddressButtons from '@/components/ui/AddressButtons';
import CustomKeySchemaForm from '@/components/features/CustomKeySchemaForm';
import ContractOwner from '@/components/features/ContractOwner';
import DataKeysTable from '@/components/features/DataKeysTable';
import SampleAddressInput from '@/components/ui/SampleAddressInput/SampleAddressInput';
import { NetworkContext } from '@/contexts/NetworksContext';

import useWeb3 from '@/hooks/useWeb3';
import {
  ACCESS_CONTROL_INTERFACE_IDS,
  ACCOUNT_INTERFACE_IDS,
  ASSETS_INTERFACE_IDS,
  OTHER_INTERFACE_IDS,
} from '@/constants/interface-ids';

import { LSP_SPECS_URL } from '@/constants/links';
import ToolInfos from '@/components/layout/ToolInfos';
import AddressInfos from '@/components/features/AddressInfos';
import LSP1DelegateDataKeys from '@/components/features/LSP1DelegateDataKeys/LSP1DelegateDataKeys';

const Home: NextPage = () => {
  const router = useRouter();

  const web3 = useWeb3();

  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState('');
  const { network } = useContext(NetworkContext);

  // Account Standards
  const [isErc725X, setIsErc725X] = useState(false);
  const [isErc725Y, setIsErc725Y] = useState(false);
  const [isErc1271, setIsErc1271] = useState(false);
  const [isLsp0Erc725Account, setIsLsp0Erc725Account] = useState(false);
  const [isLsp1UniversalReceiver, setIsLsp1UniversalReceiver] = useState(false);
  const [isLsp17Extendable, setIsLsp17Extendable] = useState(false);
  const [isLsp25ExecuteRelayCall, setIsLsp25ExecuteRelayCall] = useState(false);

  // Access Control Standards
  const [isLsp6KeyManager, setIsLsp6KeyManager] = useState(false);
  const [isLsp14OwnableTwoSteps, setIsLsp14OwnableTwoSteps] = useState(false);
  const [isLsp20CallVerification, setIsLsp20CallVerification] = useState(false);
  const [isLsp20CallVerifier, setIsLsp20CallVerifier] = useState(false);

  // Asset Standards
  const [isLsp7DigitalAsset, setIsLsp7DigitalAsset] = useState(false);
  const [isLsp8IdentifiableDigitalAsset, setIsLsp8IdentifiableDigitalAsset] =
    useState(false);
  const [isErc20, setIsErc20] = useState(false);
  const [isErc721, setIsErc721] = useState(false);

  // Other Standards
  const [isLsp1Delegate, setIsLsp1Delegate] = useState(false);
  const [isLsp9Vault, setIsLsp9Vault] = useState(false);
  const [isLsp17Extension, setIsLsp17Extension] = useState(false);
  const [isLsp26FollowerSystem, setIsLsp26FollowerSystem] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [isEmptyInput, setIsEmptyInput] = useState(true);

  useEffect(() => {
    if (router.query.address) {
      setAddress(router.query.address.toString());
    }
  }, [router.query]);

  useEffect(() => {
    const check = async () => {
      if (!web3) {
        return;
      }

      // Reset all interface states
      setIsErc725X(false);
      setIsErc725Y(false);
      setIsErc1271(false);
      setIsLsp0Erc725Account(false);
      setIsLsp1UniversalReceiver(false);
      setIsLsp17Extendable(false);
      setIsLsp25ExecuteRelayCall(false);
      setIsLsp6KeyManager(false);
      setIsLsp14OwnableTwoSteps(false);
      setIsLsp20CallVerification(false);
      setIsLsp20CallVerifier(false);
      setIsLsp7DigitalAsset(false);
      setIsLsp8IdentifiableDigitalAsset(false);
      setIsErc20(false);
      setIsErc721(false);
      setIsLsp1Delegate(false);
      setIsLsp9Vault(false);
      setIsLsp17Extension(false);
      setIsLsp26FollowerSystem(false);
      setErrorMessage('');

      if (address.length === 0) {
        setIsEmptyInput(true);
        setErrorMessage('Empty input field');
        return;
      } else {
        setIsEmptyInput(false);
      }

      if (!isAddress(address)) {
        setErrorMessage('Address is not valid');
        return;
      }

      if (typeof window !== 'undefined' && router.query.address !== address) {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('address', address);
        router.replace(currentUrl.href, undefined, { shallow: true });
      }

      setIsLoading(true);

      const supportStandards = await checkInterface(address, web3);

      // Account Standards
      setIsErc725X(supportStandards.isErc725X);
      setIsErc725Y(supportStandards.isErc725Y);
      setIsErc1271(supportStandards.isErc1271);
      setIsLsp0Erc725Account(supportStandards.isLsp0Erc725Account);
      setIsLsp1UniversalReceiver(supportStandards.isLsp1UniversalReceiver);
      setIsLsp17Extendable(supportStandards.isLsp17Extendable);
      setIsLsp25ExecuteRelayCall(supportStandards.isLsp25ExecuteRelayCall);

      // Access Control Standards
      setIsLsp6KeyManager(supportStandards.isLsp6KeyManager);
      setIsLsp14OwnableTwoSteps(supportStandards.isLsp14OwnableTwoSteps);
      setIsLsp20CallVerification(supportStandards.isLsp20CallVerification);
      setIsLsp20CallVerifier(supportStandards.isLsp20CallVerifier);

      // Asset Standards
      setIsLsp7DigitalAsset(supportStandards.isLsp7DigitalAsset);
      setIsLsp8IdentifiableDigitalAsset(
        supportStandards.isLsp8IdentifiableDigitalAsset,
      );
      setIsErc20(supportStandards.isErc20);
      setIsErc721(supportStandards.isErc721);

      // Other Standards
      setIsLsp1Delegate(supportStandards.isLsp1UniversalReceiverDelegate);
      setIsLsp9Vault(supportStandards.isLsp9Vault);
      setIsLsp17Extension(supportStandards.isLsp17Extension);
      setIsLsp26FollowerSystem(supportStandards.isLsp26FollowerSystem);

      setIsLoading(false);
    };
    check();
  }, [address, web3, errorMessage, network.name, router]);

  // Helper function to determine if an interface is supported
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

  const isLspDigitalAsset =
    isLsp7DigitalAsset || isLsp8IdentifiableDigitalAsset;

  const ERC725InspectResult = () => {
    if (
      !isLoading &&
      !isEmptyInput &&
      !isErc725X &&
      !isErc725Y &&
      !isLsp1UniversalReceiver &&
      !isLsp6KeyManager &&
      !isLsp0Erc725Account
    ) {
      return (
        <div className="help is-danger inspect-result">
          <p>This address is not a valid ERC725 or Lsp contract.</p>
          <p>Please check if the address is correct.</p>
        </div>
      );
    }

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
                          className={`button is-small is-info ${
                            getInterfaceSupport(standard) ? '' : 'is-outlined'
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
                          className={`button is-small is-info ${
                            getInterfaceSupport(standard) ? '' : 'is-outlined'
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
                          className={`button is-small is-info ${
                            getInterfaceSupport(standard) ? '' : 'is-outlined'
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
                          className={`button is-small is-info ${
                            getInterfaceSupport(standard) ? '' : 'is-outlined'
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

    return null;
  };

  return (
    <>
      <Head>
        <title>Inspect - ERC725 Tools</title>
      </Head>
      <div className="container">
        <h2 className="title is-2">Inspector</h2>
        <ToolInfos
          erc725jsMethod="fetchData"
          description={
            <>
              Retrieve, decode and display all{' '}
              <a href={LSP_SPECS_URL.ERC725Y} target="_blank" rel="noreferrer">
                ERC725Y
              </a>{' '}
              data keys of a smart contract in a developer-friendly way using
              the{' '}
              <a href={LSP_SPECS_URL.LSP2} target="_blank" rel="noreferrer">
                LSP2 ERC725Y JSON Schema
              </a>{' '}
              standard.
            </>
          }
        />

        <div className="columns">
          <div className="column is-half">
            <div className="field">
              <h3 className="title is-3">Contract Address</h3>
              <div className="control mb-0">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter a UP, LSP7 or LSP8 address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <SampleAddressInput
                  onClick={(newAddress) => setAddress(newAddress)}
                />
                {!isEmptyInput && !isLoading && (
                  <>
                    {(errorMessage && (
                      <div className="help is-danger">{errorMessage}</div>
                    )) || (
                      <div>
                        <div className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center mt-6">
                          <i className="has-text-centered mb-2">
                            Scroll to see results
                          </i>
                          <p className="has-text-centered">⬇️</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field">
              <ERC725InspectResult />
            </div>
          </div>
        </div>
        <div className="container">
          {!errorMessage &&
            !isLoading &&
            (isErc725X ||
              isErc725Y ||
              isLsp1UniversalReceiver ||
              isLsp6KeyManager ||
              isLsp0Erc725Account) && (
              <>
                <>
                  <h3 className="title is-3">Instance and Ownership</h3>
                  <div className="columns is-multiline dataKeyBox my-3">
                    <div className="column is-two-thirds">
                      <div className="content">
                        <div className="title is-4">
                          <a
                            href="https://docs.lukso.tech/standards/erc725/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="home-link"
                          >
                            Contract ↗️
                          </a>
                        </div>
                        <ul>
                          <li>
                            <strong>Contract address:</strong>
                            <span className="tag is-small mb-2 mx-2 is-link is-light">
                              address
                            </span>
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
                        standards={{
                          isLsp0Erc725Account,
                          isLsp7DigitalAsset,
                          isLsp8IdentifiableDigitalAsset,
                        }}
                      />
                    </div>
                  </div>
                </>
                {(isErc725X || isErc725Y) && (
                  <ContractOwner contractAddress={address} />
                )}
                {isErc725Y && (
                  <>
                    <CustomKeySchemaForm address={address} />
                    <DataKeysTable
                      address={address}
                      isErc725Y={isErc725Y}
                      isAsset={isLspDigitalAsset}
                      isLSP8={isLsp8IdentifiableDigitalAsset}
                    />

                    {
                      /* Show data keys related to LSP1 Delegates for specific notification types separately */
                      !isLspDigitalAsset && (
                        <LSP1DelegateDataKeys
                          address={address}
                          isErc725Y={isErc725Y}
                        />
                      )
                    }
                  </>
                )}
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default Home;
