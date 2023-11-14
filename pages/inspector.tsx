/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Jean Cavallera <git@jeanc.abc>
 */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import React, { useEffect, useState } from 'react';
import { isAddress } from 'web3-utils';

import '../styles/Inspect.module.css';
import { checkInterface } from '../utils/web3';

import DataKeysTable from '../components/DataKeysTable';
import AddressButtons from '../components/AddressButtons';
import UPOwner from '../components/UPOwner';
import useWeb3 from '../hooks/useWeb3';

const Home: NextPage = () => {
  const router = useRouter();

  const web3 = useWeb3();

  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState('');
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

  const [errorMessage, setErrorMessage] = useState('');
  const [isEmptyInput, setIsEmptyInput] = useState(true);

  useEffect(() => {
    if (router.query.address) {
      setAddress(router.query.address as string);
    }
  }, [router.query.address]);

  useEffect(() => {
    const check = async () => {
      if (!web3) {
        return;
      }

      setIsErc725X(false);
      setIsErc725Y(false);
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

      router.push(`/inspector?address=${address}`);

      setIsLoading(true);
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
  }, [address, web3, errorMessage]);

  const ERC725InspectResult = () => {
    if (
      !isErc725X &&
      !isErc725Y &&
      !isLSP1UniversalReceiver &&
      !isLSP6KeyManager &&
      !isLSP0ERC725Account &&
      !isEmptyInput
    ) {
      return (
        <div className="help is-danger inspect-result">
          <p>This address is not a valid ERC725 or LSP contract.</p>
          <p>Please check if the address is correct.</p>
        </div>
      );
    }

    if (!isEmptyInput) {
      return (
        <div className="help is-success inspect-result mt-4">
          <label className="label">Supported Standards</label>
          <a
            className={`button is-info mr-2 mt-2 ${
              !isErc725X && 'is-outlined'
            }`}
            href="https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725x---generic-executor"
            target="_blank"
            rel="noreferrer"
          >
            ERC725X ↗️
          </a>
          <a
            className={`button is-info mr-2 mt-2 ${
              !isErc725Y && 'is-outlined'
            }`}
            href="https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725y---generic-key-value-store"
            target="_blank"
            rel="noreferrer"
          >
            ERC725Y ↗️
          </a>
          <a
            className={`button is-info mr-2 mt-2 ${
              !isERC1271 && 'is-outlined'
            }`}
            href="https://eips.ethereum.org/EIPS/eip-1271"
            target="_blank"
            rel="noreferrer"
          >
            ERC1271 ↗️
          </a>
          <a
            className={`button is-info mr-2 mt-2 ${
              !isLSP0ERC725Account && 'is-outlined'
            }`}
            href="https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725y---generic-key-value-store"
            target="_blank"
            rel="noreferrer"
          >
            LSP0ERC725Account ↗️
          </a>
          <a
            className={`button is-info mr-2 mt-2 ${
              !isLSP1UniversalReceiver && 'is-outlined'
            }`}
            href="https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver"
            target="_blank"
            rel="noreferrer"
          >
            LSP1UniversalReceiver ↗️
          </a>
          <a
            className={`button is-info mr-2 mt-2 ${
              !isLSP6KeyManager && 'is-outlined'
            }`}
            href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager"
            target="_blank"
            rel="noreferrer"
          >
            LSP6KeyManager ↗️
          </a>
          <a
            className={`button is-info mr-2 mt-2 ${
              !isLSP7DigitalAsset && 'is-outlined'
            }`}
            href="https://docs.lukso.tech/standards/nft-2.0/LSP7-Digital-Asset"
            target="_blank"
            rel="noreferrer"
          >
            LSP7DigitalAsset ↗️
          </a>
          <a
            className={`button is-info mr-2 mt-2 ${
              !isLSP8IdentifiableDigitalAsset && 'is-outlined'
            }`}
            href="https://docs.lukso.tech/standards/nft-2.0/LSP8-Identifiable-Digital-Asset"
            target="_blank"
            rel="noreferrer"
          >
            LSP8IdentifiableDigitalAsset ↗️
          </a>
          <a
            className={`button is-info mr-2 mt-2 ${
              !isLSP9Vault && 'is-outlined'
            }`}
            href="https://docs.lukso.tech/standards/universal-profile/lsp9-vault"
            target="_blank"
            rel="noreferrer"
          >
            LSP9Vault ↗️
          </a>
        </div>
      );
    }
    return <div></div>;
  };

  return (
    <>
      <Head>
        <title>Inspect - ERC725 Tools</title>
      </Head>
      <div className="container">
        <h2 className="title is-2">Inspector</h2>
        <article className="message is-info">
          <div className="message-body">
            This tool will retrieve and decode all
            <a
              href="https://github.com/ERC725Alliance/ERC725"
              target="_blank"
              rel="noreferrer"
              className="mr-1 ml-1"
            >
              ERC725Y
            </a>
            data keys of a smart contract using the
            <a
              href="https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md"
              target="_blank"
              rel="noreferrer"
              className="mr-1 ml-1"
            >
              LSP2 ERC725YJSONSchema
            </a>
            specification.
          </div>
        </article>
        <article className="message">
          <div className="message-body">
            It&lsquo;s using the
            <a
              href="https://docs.lukso.tech/tools/erc725js/classes/ERC725#encodepermissions"
              target="_blank"
              rel="noreferrer"
              className="ml-1 mr-1"
            >
              getData
            </a>
            function of the
            <a
              href="https://www.npmjs.com/package/@erc725/erc725.js"
              target="_blank"
              rel="noreferrer"
              className="ml-1 mr-1"
            >
              erc725.js
            </a>
            library.
          </div>
        </article>

        <div className="columns">
          <div className="column is-half">
            <div className="field">
              <label className="label">Contract Address</label>
              <div className="control mb-0">
                <input
                  className="input"
                  type="text"
                  placeholder="0xb8E120e7e5EAe7bfA629Db5CEFfA69C834F74e99"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div className="columns">
                <div className="column is-one-half">
                  {errorMessage && !isEmptyInput ? (
                    <div className="help is-danger">{errorMessage}</div>
                  ) : (
                    <ERC725InspectResult />
                  )}
                </div>
              </div>
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
                  <label className="label">Instance and Ownership</label>{' '}
                  <div className="columns is-multiline mt-3">
                    <div className="column is-full dataKeyBox">
                      <div className="content pt-5 pb-5">
                        <div className="title is-4 home-link">
                          <a
                            href="https://docs.lukso.tech/standards/lsp-background/erc725"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Contract ↗️
                          </a>
                        </div>
                        <ul>
                          <li>
                            <strong>Contract address:</strong>
                            <span className="tag is-small mu-2 mb-2 mr-2 ml-2 is-link is-light">
                              address
                            </span>
                            <code>{address}</code>
                          </li>
                          <li>
                            <strong>Contract type:</strong>{' '}
                            <code>ERC725-compatible</code>
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
                {isErc725X && <UPOwner UPAddress={address} />}
                <label className="label">Data Keys</label>
                <DataKeysTable address={address} isErc725Y={isErc725Y} />
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default Home;
