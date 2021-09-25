import React, { useEffect, useState } from 'react';
import { isAddress } from 'web3-utils';

import './App.css';
import useWeb3 from './hooks/useWeb3';
import { checkInterface } from './utils/web3';

import DataKeysTable from './components/DataKeysTable';
import Header from './components/Header';

const App = () => {
  const [address, setAddress] = useState(
    '0xb8E120e7e5EAe7bfA629Db5CEFfA69C834F74e99',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isErc725X, setIsErc725X] = useState(false);
  const [isErc725Y, setIsErc725Y] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const web3 = useWeb3();

  useEffect(() => {
    const check = async () => {
      if (!web3) {
        return;
      }

      setIsErc725X(false);
      setIsErc725Y(false);

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
            <div className="column">
              <div className="field">
                <label className="label">Contract Address</label>
                <div className="control">
                  <input
                    className={`input ${
                      errorMessage === '' ? 'is-success' : 'is-danger'
                    }`}
                    type="text"
                    placeholder="ERC725 Contract Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </div>
                {errorMessage && (
                  <p className="help is-danger">{errorMessage}</p>
                )}
              </div>
            </div>
            <div className="column">
              ERC725X: {isErc725X ? '✅' : '❌'}
              <br />
              ERC725Y: {isErc725Y ? '✅' : '❌'}
            </div>
          </div>
        </div>
        <div className="container is-fluid">
          {isLoading ? (
            'Loading...'
          ) : (
            <div>
              <DataKeysTable address={address} isErc725Y={isErc725Y} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default App;
