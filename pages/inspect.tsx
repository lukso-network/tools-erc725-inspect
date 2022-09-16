/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Jean Cavallera0 <git@jeanc.abc>
 */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import React, { useEffect, useState } from 'react';
import { isAddress } from 'web3-utils';

import '../styles/Inspect.module.css';
import useWeb3 from '../hooks/useWeb3';
import { checkInterface } from '../utils/web3';

import DataKeysTable from '../components/DataKeysTable';
import AddressButtons from '../components/AddressButtons';

const Home: NextPage = () => {
  const router = useRouter();

  const web3 = useWeb3();

  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState('');
  const [isErc725X, setIsErc725X] = useState(false);
  const [isErc725Y, setIsErc725Y] = useState(false);
  const [isErc725Y_v2, setIsErc725Y_v2] = useState(false);
  const [isErc725YLegacy, setIsErc725YLegacy] = useState(false);

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

  console.log('======= RENDER START =======');
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
      console.log('supportStandards: ', supportStandards);

      setIsErc725X(supportStandards.isErc725X);
      setIsErc725Y(supportStandards.isErc725Y);
      setIsErc725Y_v2(supportStandards.isErc725Y_v2);
      setIsErc725YLegacy(supportStandards.isErc725YLegacy);
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
  }, [address, web3]);

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
                <div className="column is-one-quarter">
                  {!errorMessage &&
                    !isErc725X &&
                    !isErc725Y &&
                    !isErc725Y_v2 &&
                    !isErc725YLegacy && (
                      <div>
                        <p className="help is-danger">ERC725X: ❌</p>
                        <p className="help is-danger">ERC725Y: ❌</p>
                      </div>
                    )}

                  {(isErc725X || isErc725Y || isErc725YLegacy) && (
                    <p className="help is-success">
                      <p>ERC725X: {isErc725X ? '✅' : '❌'}</p>
                      <p>
                        ERC725Y:{' '}
                        {isErc725Y || isErc725Y_v2 || isErc725YLegacy
                          ? '✅'
                          : '❌'}{' '}
                        {isErc725Y_v2 && '(v2.0)'}
                        {isErc725YLegacy && '(legacy)'}
                      </p>
                    </p>
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
          {!isLoading && (
            <DataKeysTable
              address={address}
              isErc725YLegacy={isErc725YLegacy}
              isErc725Y_v2={isErc725Y_v2}
              isErc725Y={isErc725Y}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
