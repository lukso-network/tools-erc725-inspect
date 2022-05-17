/**
 * @author Hugo Masclet <git@hugom.xyz>
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

  const [address, setAddress] = useState(
    '0xb8E120e7e5EAe7bfA629Db5CEFfA69C834F74e99',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isErc725X, setIsErc725X] = useState(false);
  const [isErc725Y, setIsErc725Y] = useState(false);
  const [isErc725YLegacy, setIsErc725YLegacy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const web3 = useWeb3();

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
      setIsErc725YLegacy(false);
      setErrorMessage('');

      if (!isAddress(address)) {
        setErrorMessage('Address is not valid');
        return;
      }

      router.push(`/inspect?address=${address}`);

      setIsLoading(true);
      const supportStandards = await checkInterface(address, web3);

      console.log(supportStandards);

      setIsErc725X(supportStandards.isErc725X);
      setIsErc725Y(supportStandards.isErc725Y);
      setIsErc725YLegacy(supportStandards.isErc725YLegacy);
      setIsLoading(false);
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
              <div className="control">
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
              {!errorMessage &&
                !isErc725X &&
                !isErc725Y &&
                !isErc725YLegacy && (
                  <p className="help is-danger">ERC725X: ❌ - ERC725Y: ❌</p>
                )}

              {(isErc725X || isErc725Y || isErc725YLegacy) && (
                <p className="help is-success">
                  ERC725X: {isErc725X ? '✅' : '❌'} - ERC725Y
                  {isErc725YLegacy ? ' (legacy)' : ''}:{' '}
                  {isErc725Y || isErc725YLegacy ? '✅' : '❌'}
                </p>
              )}
            </div>
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
              isErc725Y={isErc725Y}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
