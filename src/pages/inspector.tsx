/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import '@/styles/Inspect.module.css';

// utils
import { isAddress } from 'viem';
import { getAllSupportedInterfaces } from '@/utils/interface-detection';

// context
import { NetworkContext } from '@/contexts/NetworksContext';

// components
import CustomKeySchemaForm from '@/components/features/CustomKeySchemaForm';
import ContractOwner from '@/components/features/ContractOwner';
import ContractTypeBox from '@/components/ui/ContractTypeBox/ContractTypeBox';
import DataKeysList from '@/components/features/DataKeysList';
import LSP1DelegateDataKeys from '@/components/features/LSP1DelegateDataKeys';

import SampleAddressInput from '@/components/ui/SampleAddressInput/SampleAddressInput';
import SupportedInterfacesTable from '@/components/ui/SupportedInterfacesTable';
import ToolInfos from '@/components/layout/ToolInfos';

// constants
import {
  CONTRACT_INTERFACE_KEYS,
  type SupportedInterfaces,
} from '@/types/contract';
import { LSP_SPECS_URL } from '@/constants/links';

export const DEFAULT_SUPPORTED_INTERFACE_ENTRIES: SupportedInterfaces =
  Object.fromEntries(
    CONTRACT_INTERFACE_KEYS.map((key) => [key, false] as const),
  ) as SupportedInterfaces;

const Home: NextPage = () => {
  const router = useRouter();
  const { network } = useContext(NetworkContext);

  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmptyInput, setIsEmptyInput] = useState(true);

  const [supportedInterfaces, setSupportedInterfaces] =
    useState<SupportedInterfaces>(DEFAULT_SUPPORTED_INTERFACE_ENTRIES);

  const {
    isErc725X,
    isErc725Y,
    isLsp0Erc725Account,
    isLsp1UniversalReceiver,
    isLsp6KeyManager,
    isLsp7DigitalAsset,
    isLsp8IdentifiableDigitalAsset,
  } = supportedInterfaces;

  useEffect(() => {
    if (router.query.address) {
      setAddress(router.query.address.toString());
    }
  }, [router.query]);

  useEffect(() => {
    const check = async () => {
      if (!network) return;

      // Reset supported interfaces to default every time we run the check
      setSupportedInterfaces(DEFAULT_SUPPORTED_INTERFACE_ENTRIES);
      setErrorMessage('');

      if (address.length === 0) {
        setIsEmptyInput(true);
        setErrorMessage('Empty input field');
        return;
      }

      setIsEmptyInput(false);

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
      try {
        const interfacesSupportedByAddress = await getAllSupportedInterfaces(
          address,
          network,
        );
        setSupportedInterfaces(interfacesSupportedByAddress);
      } catch (error) {
        setErrorMessage(
          'Error checking interfaces (check console for details): ' + error,
        );
        console.error('Error checking interfaces: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    check();
  }, [address, network, errorMessage, network.name, router]);

  const isLspDigitalAsset =
    isLsp7DigitalAsset || isLsp8IdentifiableDigitalAsset;

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
                  onChange={(e) => setAddress(e.target.value)}
                />
                <SampleAddressInput
                  onClick={(newAddress) => setAddress(newAddress)}
                />

                <div className="m-3" hidden={!isLoading}>
                  <span>Loading contract informations. Please wait...</span>
                  <progress
                    className="progress is-small is-primary mt-1"
                    style={{ width: '300px' }}
                    max="100"
                  >
                    Loading...{' '}
                  </progress>
                </div>

                {!errorMessage &&
                  !isLoading &&
                  !isEmptyInput &&
                  !isErc725X &&
                  !isErc725Y &&
                  !isLsp1UniversalReceiver &&
                  !isLsp6KeyManager &&
                  !isLsp0Erc725Account && (
                    <div className="help is-danger inspect-result">
                      <p>
                        This address is not a valid ERC725 or LSP smart
                        contract.
                      </p>
                      <p>Please check if the address is correct.</p>
                    </div>
                  )}

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
              <SupportedInterfacesTable
                supportedInterfaces={supportedInterfaces}
              />
            </div>
          </div>
        </div>

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
                <ContractTypeBox
                  title="Contract"
                  link="https://docs.lukso.tech/standards/erc725/"
                  label="Contract address"
                  address={address}
                  standards={{
                    isLsp0Erc725Account,
                    isLsp7DigitalAsset,
                    isLsp8IdentifiableDigitalAsset,
                  }}
                />
              </>
              {(isErc725X || isErc725Y) && (
                <ContractOwner contractAddress={address} />
              )}
              {isErc725Y && (
                <>
                  <CustomKeySchemaForm address={address} />
                  <DataKeysList
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
    </>
  );
};

export default Home;
