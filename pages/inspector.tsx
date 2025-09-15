/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { isAddress } from 'web3-utils';

import '@/styles/Inspect.module.css';
import { checkInterface, getVersion } from '@/utils/web3';

import AddressButtons from '@/components/AddressButtons';
import CustomKeySchemaForm from '@/components/CustomKeySchemaForm';
import ContractOwner from '@/components/ContractOwner';
import DataKeysTable from '@/components/DataKeysTable';
import SampleAddressInput from '@/components/SampleAddressInput/SampleAddressInput';
import { NetworkContext } from '@/contexts/NetworksContext';

import useWeb3 from '@/hooks/useWeb3';
import {
  ACCESS_CONTROL_INTERFACE_IDS,
  ACCOUNT_INTERFACE_IDS,
  ASSETS_INTERFACE_IDS,
  OTHER_INTERFACE_IDS,
  SAMPLE_ADDRESS,
} from '@/constants';

const Home: NextPage = () => {
  const router = useRouter();

  const web3 = useWeb3();

  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState('');
  const { network } = useContext(NetworkContext);

  const [isErc725X, setIsErc725X] = useState(false);
  const [isErc725Y, setIsErc725Y] = useState(false);
  const [isERC1271, setIsERC1271] = useState(false);
  const [isLSP0ERC725Account, setIsLSP0ERC725Account] = useState(false);
  const [isLSP1UniversalReceiver, setIsLSP1UniversalReceiver] = useState(false);
  const [isLSP6KeyManager, setIsLSP6KeyManager] = useState(false);
  const [isLSP7DigitalAsset, setIsLSP7DigitalAsset] = useState(false);
  const [isLSP8IdentifiableDigitalAsset, setIsLSP8IdentifiableDigitalAsset] =
    useState(false);
  const [isLSP9Vault, setIsLSP9Vault] = useState(false);
  const [isERC721, setIsERC721] = useState(false);

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

      setIsErc725X(false);
      setIsErc725Y(false);
      setIsERC1271(false);
      setIsLSP0ERC725Account(false);
      setIsLSP1UniversalReceiver(false);
      setIsLSP6KeyManager(false);
      setIsLSP7DigitalAsset(false);
      setIsLSP8IdentifiableDigitalAsset(false);
      setIsLSP9Vault(false);
      setIsERC721(false);
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

      setIsErc725X(supportStandards.isErc725X);
      setIsErc725Y(supportStandards.isErc725Y);

      setIsERC1271(supportStandards.isErc1271);
      setIsLSP0ERC725Account(supportStandards.isLsp0Erc725Account);
      setIsLSP1UniversalReceiver(supportStandards.isLsp1UniversalReceiver);
      setIsLSP6KeyManager(supportStandards.isLsp6KeyManager);
      setIsLSP7DigitalAsset(supportStandards.isLsp7DigitalAsset);
      setIsLSP8IdentifiableDigitalAsset(
        supportStandards.isLsp8IdentifiableDigitalAsset,
      );
      setIsLSP9Vault(supportStandards.isLsp9Vault);

      setIsLoading(false);
    };
    check();
  }, [address, web3, errorMessage, network.name, router]);

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
                          className={`button is-small is-info is-outlined`}
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
                          className={`button is-small is-info is-outlined`}
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
                          className={`button is-small is-info is-outlined`}
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
                          className={`button is-small is-info is-outlined`}
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
        <article className="message is-info content">
          <div className="message-body">
            <p>
              Retrieve and decode all
              <a
                href="https://github.com/ERC725Alliance/ERC725"
                target="_blank"
                rel="noreferrer"
                className="mx-1"
              >
                ERC725Y
              </a>
              data keys of a smart contract using the
              <a
                href="https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md"
                target="_blank"
                rel="noreferrer"
                className="mx-1"
              >
                LSP2 ERC725YJSONSchema
              </a>
              specification. It&lsquo;s using the
              <a
                href="https://docs.lukso.tech/tools/erc725js/classes/ERC725#encodepermissions"
                target="_blank"
                rel="noreferrer"
                className="mx-1"
              >
                getData
              </a>
              function of the
              <a
                href="https://www.npmjs.com/package/@erc725/erc725.js"
                target="_blank"
                rel="noreferrer"
                className="mx-1"
              >
                erc725.js
              </a>
              library.
            </p>
          </div>
        </article>

        <div className="columns">
          <div className="column is-half">
            <div className="field">
              <h3 className="title is-3">Contract Address</h3>
              <div className="control mb-0">
                <input
                  className="input"
                  type="text"
                  placeholder={SAMPLE_ADDRESS.TESTNET_UP}
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
                      <div className="tags has-addons">
                        <span className="tag is-dark">Version</span>
                        <span className="tag is-info">{contractVersion}</span>
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
                  <div className="columns is-multiline mt-3">
                    <div className="column is-full dataKeyBox">
                      <div className="content">
                        <div className="title is-4">
                          <a
                            href="https://docs.lukso.tech/standards/lsp-background/erc725"
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
                          <li>
                            <strong>Contract type:</strong>{' '}
                            <code>
                              {isLSP0ERC725Account && '🆙 Universal Profile'}{' '}
                              (ERC725-compatible)
                            </code>
                          </li>
                        </ul>
                        <AddressButtons
                          address={address}
                          showInspectButton={false}
                        ></AddressButtons>
                      </div>
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
