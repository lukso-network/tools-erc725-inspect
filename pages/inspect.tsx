/**
 * @author Hugo Masclet <git@hugom.xyz>
 */

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { isAddress } from 'web3-utils';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import '../styles/Inspect.module.css';
import useWeb3 from '../hooks/useWeb3';
import { checkInterface } from '../utils/web3';

import NavBar from '../components/NavBar';
import DataKeysTable from '../components/DataKeysTable';
import AddressButtons from '../components/AddressButtons';

const Home: NextPage = () => {
  const router = useRouter();

  const [address, setAddress] = useState(
    (router.query.address as string) ||
      '0xb8E120e7e5EAe7bfA629Db5CEFfA69C834F74e99',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isErc725X, setIsErc725X] = useState(false);
  const [isErc725Y, setIsErc725Y] = useState(false);
  const [isErc725YLegacy, setIsErc725YLegacy] = useState(false);
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
      setIsErc725YLegacy(false);
      setErrorMessage('');

      if (!isAddress(address)) {
        setErrorMessage('Address is not valid');
        return;
      }

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
      <NavBar />
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container>
          <TextField
            label="ERC725 Address"
            fullWidth
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="ERC725 Contract Address"
            error={errorMessage !== ''}
          />

          <div className="field">
            {!errorMessage && !isErc725X && !isErc725Y && !isErc725YLegacy && (
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

          <div className="container is-fluid">
            <div className="columns is-vcentered">
              <div className="column is-offset-one-quarter is-half has-text-centered">
                <div className="field">
                  <p className="control">
                    <button
                      disabled={!!errorMessage}
                      className="button is-success"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${
                            window.location.href.split('?')[0]
                          }?address=${address}`,
                        );
                        setShareButtonTitle('Address copied in clipboard');
                      }}
                    >
                      {shareButtonTitle}
                    </button>
                  </p>
                </div>
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
        </Container>
      </Box>
    </>
  );
};

export default Home;
