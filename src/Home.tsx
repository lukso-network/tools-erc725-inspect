import React, { useEffect, useState } from 'react';
import { isAddress } from 'web3-utils';
import { useLocation } from 'react-router-dom';

import './App.css';
import useWeb3 from './hooks/useWeb3';
import { checkInterface } from './utils/web3';

import DataKeysTable from './components/DataKeysTable';
import Header from './components/Header';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();

  const [address, setAddress] = useState(
    query.get('address') || '0xb8E120e7e5EAe7bfA629Db5CEFfA69C834F74e99',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isErc725X, setIsErc725X] = useState(false);
  const [isErc725Y, setIsErc725Y] = useState(false);
  const [shareButtonTitle, setShareButtonTitle] = useState('Copy share link');
  const [errorMessage, setErrorMessage] = useState('');

  const web3 = useWeb3();

  useEffect(() => {
    const check = async () => {
      if (!web3) {
        return;
      }

      setIsErc725X(false);
      setIsErc725Y(false);
      setErrorMessage('');

      if (!isAddress(address)) {
        setErrorMessage('Address is not valid');
        return;
      }

      setIsLoading(true);
      const supportStandards = await checkInterface(address, web3);

      setIsErc725X(supportStandards.isErc725X);
      setIsErc725Y(supportStandards.isErc725Y);
      setIsLoading(false);
    };
    check();
  }, [address, web3]);

  return (
    <>
      <Header />
      <section className="section">
        <div className="container is-fluid">
          <div className="columns is-vcentered">
            <div className="column is-offset-one-quarter is-half has-text-centered">
              <div className="field">
                <div className={`control ${isLoading && 'is-loading'}`}>
                  <input
                    className={`input is-rounded has-text-centered is-medium ${
                      errorMessage === '' && (isErc725X || isErc725Y)
                        ? 'is-success'
                        : 'is-danger'
                    }`}
                    type="text"
                    placeholder="ERC725 Contract Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
                {errorMessage && (
                  <p className="help is-danger">{errorMessage}</p>
                )}
                {!errorMessage && !isErc725X && !isErc725Y && (
                  <p className="help is-danger">ERC725X: ❌ - ERC725Y: ❌</p>
                )}

                {(isErc725X || isErc725Y) && (
                  <p className="help is-success">
                    ERC725X: {isErc725X ? '✅' : '❌'} - ERC725Y:{' '}
                    {isErc725Y ? '✅' : '❌'}
                  </p>
                )}
              </div>
              <div className="field">
                <p className="control">
                  <button
                    disabled={!!errorMessage}
                    className="button is-success"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/?address=${address}`,
                      );
                      setShareButtonTitle('Address copied in clipboard');
                    }}
                  >
                    {shareButtonTitle}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container is-fluid">
          {!isLoading && (
            <div>
              <DataKeysTable address={address} isErc725Y={isErc725Y} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
