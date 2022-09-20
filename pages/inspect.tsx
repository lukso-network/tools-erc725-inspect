/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Jean Cavallera0 <git@jeanc.abc>
 */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import React, { useEffect, useState, useContext } from 'react';
import { isAddress } from 'web3-utils';

import '../styles/Inspect.module.css';
import { checkInterface } from '../utils/web3';

import DataKeysTable from '../components/DataKeysTable';
import AddressButtons from '../components/AddressButtons';
import { NetworkContext } from '../contexts/NetworksContext';
import UPOwner from '../components/UPOwner';

const Home: NextPage = () => {
  const router = useRouter();

  const { web3 } = useContext(NetworkContext);

  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState('');
  const [isErc725X, setIsErc725X] = useState(false);
  const [isErc725Y, setIsErc725Y] = useState(false);
  const [isErc725Y_v2, setIsErc725Y_v2] = useState(false);
  const [isErc725YLegacy, setIsErc725YLegacy] = useState(false);

  const [isERC1271, setIsERC1271] = useState(false);
  const [isLSP0ERC725Account, setIsLSP0ERC725Account] = useState(false);
  const [isLSP1UniversalReceiver, setIsLSP1UniversalReceiver] = useState(false);
  const [isLSP1UniversalReceiverDelegate, setIsLSP1UniversalReceiverDelegate] =
    useState(false);
  const [isLSP6KeyManager, setIsLSP6KeyManager] = useState(false);
  const [isLSP7DigitalAsset, setIsLSP7DigitalAsset] = useState(false);
  const [isLSP8IdentifiableDigitalAsset, setIsLSP8IdentifiableDigitalAsset] =
    useState(false);
  const [isLSP9Vault, setIsLSP9Vault] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState({
    text: '',
    class: '',
  });

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
      setIsErc725Y_v2(false);
      setIsErc725YLegacy(false);
      setErrorMessage('');

      if (!isAddress(address)) {
        setErrorMessage('Address is not valid');
        return;
      }

      router.push(`/inspect?address=${address}`);

      setIsLoading(true);
      const supportStandards = await checkInterface(address, web3);

      setIsErc725X(supportStandards.isErc725X);
      setIsErc725Y(supportStandards.isErc725Y);
      setIsErc725Y_v2(supportStandards.isErc725Y_v2);
      setIsErc725YLegacy(supportStandards.isErc725YLegacy);

      setIsERC1271(supportStandards.isErc1271);
      setIsLSP0ERC725Account(supportStandards.isLsp0Erc725Account);
      setIsLSP1UniversalReceiver(supportStandards.isLsp1UniversalReceiver);
      setIsLSP1UniversalReceiverDelegate(
        supportStandards.isLsp1UniversalReceiverDelegate,
      );
      setIsLSP6KeyManager(supportStandards.isLsp6KeyManager);
      setIsLSP7DigitalAsset(supportStandards.isLsp7DigitalAsset);
      setIsLSP8IdentifiableDigitalAsset(
        supportStandards.isLsp8IdentifiableDigitalAsset,
      );
      setIsLSP9Vault(supportStandards.isLsp9Vault);

      setIsLoading(false);

      let notificationText = '';
      let notificationClass = '';

      if (supportStandards.isErc725Y_v2) {
        notificationText =
          '⚠️ 🆙 This Profile was created with version 0.5.0. You are missing out on a lot of new cool features. Consider upgrading! ';
        notificationClass = 'warning';
      }

      if (supportStandards.isErc725YLegacy) {
        notificationText =
          '😞 ❗ This is a legacy Universal Profile. Most of the features might not be working properly. Consider creating a new one. ';
        notificationClass = 'danger';
      }

      setNotification({
        text: notificationText,
        class: notificationClass,
      });
    };
    check();
  }, [address, web3, errorMessage]);

  const isErc725YContract = isErc725Y || isErc725Y_v2 || isErc725YLegacy;

  const ERC725InspectResult = () => {
    if (
      !isErc725X &&
      !isErc725YContract &&
      !isLSP1UniversalReceiver &&
      !isLSP1UniversalReceiverDelegate &&
      !isLSP6KeyManager
    ) {
      return (
        <div className="help is-danger inspect-result">
          <p>
            This address is not a valid ERC725 Profile, nor it is a valid LSP
            contract.
          </p>
          <p>Please check if the address is correct.</p>
        </div>
      );
    }

    return (
      <div className="help is-success inspect-result">
        <a
          className={`button is-link mr-2 mt-2 ${!isErc725X && 'is-outlined'}`}
          href="https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725x---generic-executor"
          target="_blank"
          rel="noreferrer"
        >
          ERC725X
        </a>
        <a
          className={`button is-link mr-2 mt-2 ${
            !isErc725YContract && 'is-outlined'
          }`}
          href="https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725y---generic-key-value-store"
          target="_blank"
          rel="noreferrer"
        >
          ERC725Y {isErc725Y_v2 && '(v2.0)'}
          {isErc725YLegacy && '(legacy)'}
        </a>
        <a
          className={`button is-link mr-2 mt-2 ${!isERC1271 && 'is-outlined'}`}
          href="https://eips.ethereum.org/EIPS/eip-1271"
          target="_blank"
          rel="noreferrer"
        >
          ERC1271
        </a>
        <a
          className={`button is-link mr-2 mt-2 ${
            !isLSP0ERC725Account && 'is-outlined'
          }`}
          href="https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725y---generic-key-value-store"
          target="_blank"
          rel="noreferrer"
        >
          LSP0ERC725Account
        </a>
        <a
          className={`button is-link mr-2 mt-2 ${
            !isLSP1UniversalReceiver && 'is-outlined'
          }`}
          href="https://docs.lukso.tech/standards/generic-standards/lsp1-universal-receiver"
          target="_blank"
          rel="noreferrer"
        >
          LSP1UniversalReceiver
        </a>
        <a
          className={`button is-link mr-2 mt-2 ${
            !isLSP1UniversalReceiverDelegate && 'is-outlined'
          }`}
          href="https://docs.lukso.tech/standards/universal-profile/lsp1-universal-receiver-delegate"
          target="_blank"
          rel="noreferrer"
        >
          LSP1UniversalReceiverDelegate
        </a>
        <a
          className={`button is-link mr-2 mt-2 ${
            !isLSP6KeyManager && 'is-outlined'
          }`}
          href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager"
          target="_blank"
          rel="noreferrer"
        >
          LSP6KeyManager
        </a>
        <a
          className={`button is-link mr-2 mt-2 ${
            !isLSP7DigitalAsset && 'is-outlined'
          }`}
          href="https://docs.lukso.tech/standards/nft-2.0/LSP7-Digital-Asset"
          target="_blank"
          rel="noreferrer"
        >
          LSP7DigitalAsset
        </a>
        <a
          className={`button is-link mr-2 mt-2 ${
            !isLSP8IdentifiableDigitalAsset && 'is-outlined'
          }`}
          href="https://docs.lukso.tech/standards/nft-2.0/LSP8-Identifiable-Digital-Asset"
          target="_blank"
          rel="noreferrer"
        >
          LSP8IdentifiableDigitalAsset
        </a>
        <a
          className={`button is-link mr-2 mt-2 ${
            !isLSP9Vault && 'is-outlined'
          }`}
          href="https://docs.lukso.tech/standards/universal-profile/lsp9-vault"
          target="_blank"
          rel="noreferrer"
        >
          LSP9Vault
        </a>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Inspect - ERC725 Tools</title>
      </Head>
      <div className="container">
        <article className="message is-info">
          <div className="message-body">
            This tool will fetch all data keys of{' '}
            <a href="https://github.com/ERC725Alliance/ERC725">ERC725Y</a> smart
            contract and attempt to match them with their{' '}
            <a href="https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md">
              LSP2 ERC725YJSONSchema
            </a>
            .<br />
            The erc725.js lib provides a{' '}
            <a href="https://docs.lukso.tech/tools/erc725js/classes/ERC725#getschema">
              getSchema
            </a>{' '}
            method to decode the keys.
          </div>
        </article>
        <div className="columns">
          <div className="column is-half">
            <div className="field">
              <label className="label">Contract address</label>
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
                  {errorMessage ? (
                    <div className="help is-danger">{errorMessage}</div>
                  ) : (
                    <ERC725InspectResult />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            {(isErc725Y_v2 || isErc725YLegacy) && (
              <div className={'notification is-' + notification.class}>
                {notification.text}
              </div>
            )}
          </div>
        </div>

        <div className="container is-fluid">
          <div className="columns is-vcentered">
            <div className="column is-offset-one-quarter is-half has-text-centered">
              {!errorMessage && (
                <AddressButtons address={address} showInspectButton={false} />
              )}
            </div>
          </div>
        </div>
        <div className="container is-fluid">
          {!errorMessage && !isLoading && (
            <>
              <UPOwner UPAddress={address} />
              <DataKeysTable
                address={address}
                isErc725YLegacy={isErc725YLegacy}
                isErc725Y_v2={isErc725Y_v2}
                isErc725Y={isErc725Y}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
