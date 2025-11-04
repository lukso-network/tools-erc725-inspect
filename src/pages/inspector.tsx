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
  const [isERC1271, setIsERC1271] = useState(false);
  const [isLSP0ERC725Account, setIsLSP0ERC725Account] = useState(false);
  const [isLSP1UniversalReceiver, setIsLSP1UniversalReceiver] = useState(false);
  const [isLSP17Extendable, setIsLSP17Extendable] = useState(false);
  const [isLSP25ExecuteRelayCall, setIsLSP25ExecuteRelayCall] = useState(false);

  // Access Control Standards
  const [isLSP6KeyManager, setIsLSP6KeyManager] = useState(false);
  const [isLSP14OwnableTwoSteps, setIsLSP14OwnableTwoSteps] = useState(false);
  const [isLSP20CallVerification, setIsLSP20CallVerification] = useState(false);
  const [isLSP20CallVerifier, setIsLSP20CallVerifier] = useState(false);

  // Asset Standards
  const [isLSP7DigitalAsset, setIsLSP7DigitalAsset] = useState(false);
  const [isLSP8IdentifiableDigitalAsset, setIsLSP8IdentifiableDigitalAsset] =
    useState(false);
  const [isERC20, setIsERC20] = useState(false);
  const [isERC721, setIsERC721] = useState(false);

  // Other Standards
  const [isLSP1Delegate, setIsLSP1Delegate] = useState(false);
  const [isLSP9Vault, setIsLSP9Vault] = useState(false);
  const [isLSP17Extension, setIsLSP17Extension] = useState(false);
  const [isLSP26FollowerSystem, setIsLSP26FollowerSystem] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [isEmptyInput, setIsEmptyInput] = useState(true);

  const [contractVersion, setContractVersion] = useState('');

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
      setIsERC1271(false);
      setIsLSP0ERC725Account(false);
      setIsLSP1UniversalReceiver(false);
      setIsLSP17Extendable(false);
      setIsLSP25ExecuteRelayCall(false);
      setIsLSP6KeyManager(false);
      setIsLSP14OwnableTwoSteps(false);
      setIsLSP20CallVerification(false);
      setIsLSP20CallVerifier(false);
      setIsLSP7DigitalAsset(false);
      setIsLSP8IdentifiableDigitalAsset(false);
      setIsERC20(false);
      setIsERC721(false);
      setIsLSP1Delegate(false);
      setIsLSP9Vault(false);
      setIsLSP17Extension(false);
      setIsLSP26FollowerSystem(false);
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

      const fetchedContractVersion = await getVersion(address, web3);
      setContractVersion(fetchedContractVersion);

      const supportStandards = await checkInterface(address, web3);

      // Account Standards
      setIsErc725X(supportStandards.isErc725X);
      setIsErc725Y(supportStandards.isErc725Y);
      setIsERC1271(supportStandards.isErc1271);
      setIsLSP0ERC725Account(supportStandards.isLsp0Erc725Account);
      setIsLSP1UniversalReceiver(supportStandards.isLsp1UniversalReceiver);
      setIsLSP17Extendable(supportStandards.isLsp17Extendable);
      setIsLSP25ExecuteRelayCall(supportStandards.isLsp25ExecuteRelayCall);

      // Access Control Standards
      setIsLSP6KeyManager(supportStandards.isLsp6KeyManager);
      setIsLSP14OwnableTwoSteps(supportStandards.isLsp14OwnableTwoSteps);
      setIsLSP20CallVerification(supportStandards.isLsp20CallVerification);
      setIsLSP20CallVerifier(supportStandards.isLsp20CallVerifier);

      // Asset Standards
      setIsLSP7DigitalAsset(supportStandards.isLsp7DigitalAsset);
      setIsLSP8IdentifiableDigitalAsset(
        supportStandards.isLsp8IdentifiableDigitalAsset,
      );
      setIsERC20(supportStandards.isErc20);
      setIsERC721(supportStandards.isERC721);

      // Other Standards
      setIsLSP1Delegate(supportStandards.isLsp1UniversalReceiverDelegate);
      setIsLSP9Vault(supportStandards.isLsp9Vault);
      setIsLSP17Extension(supportStandards.isLsp17Extension);
      setIsLSP26FollowerSystem(supportStandards.isLsp26FollowerSystem);

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
      ERC1271: isERC1271,
      LSP0ERC725Account: isLSP0ERC725Account,
      LSP1UniversalReceiver: isLSP1UniversalReceiver,
      LSP17Extendable: isLSP17Extendable,
      LSP25ExecuteRelayCall: isLSP25ExecuteRelayCall,
      // Access Control Standards
      LSP6KeyManager: isLSP6KeyManager,
      LSP14OwnableTwoSteps: isLSP14OwnableTwoSteps,
      LSP20CallVerification: isLSP20CallVerification,
      LSP20CallVerifier: isLSP20CallVerifier,
      // Asset Standards
      LSP7DigitalAsset: isLSP7DigitalAsset,
      LSP8IdentifiableDigitalAsset: isLSP8IdentifiableDigitalAsset,
      ERC20: isERC20,
      ERC721: isERC721,
      // Other Standards
      LSP1Delegate: isLSP1Delegate,
      LSP9Vault: isLSP9Vault,
      LSP17Extension: isLSP17Extension,
      LSP26FollowerSystem: isLSP26FollowerSystem,
    };

    return interfaceMap[standard] || false;
  };

  const ERC725InspectResult = () => {
    if (
      !isErc725X &&
      !isErc725Y &&
      !isLSP1UniversalReceiver &&
      !isLSP6KeyManager &&
      !isLSP0ERC725Account &&
      !isEmptyInput &&
      !isLoading
    ) {
      return (
        <div className="help is-danger inspect-result">
          <p>This address is not a valid ERC725 or LSP contract.</p>
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
                          <div className="tags has-addons">
                            <span className="tag is-dark">version</span>
                            <span className="tag is-info">{contractVersion}</span>
                          </div>
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
              isLSP1UniversalReceiver ||
              isLSP6KeyManager ||
              isLSP0ERC725Account) && (
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
                              assetBadgeOptions={{ showBalance: false }}
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
                          isLSP0ERC725Account,
                          isLSP7DigitalAsset,
                          isLSP8IdentifiableDigitalAsset,
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
                      isAsset={
                        isLSP7DigitalAsset || isLSP8IdentifiableDigitalAsset
                      }
                      isLSP8={isLSP8IdentifiableDigitalAsset}
                    />

                    {
                      /* Show data keys related to LSP1 Delegates for specific notification types separately */
                      (!isLSP7DigitalAsset && !isLSP8IdentifiableDigitalAsset) && <LSP1DelegateDataKeys address={address} isErc725Y={isErc725Y} />

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
