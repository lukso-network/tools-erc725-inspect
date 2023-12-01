import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { isAddress } from 'web3-utils';
import ERC725 from '@erc725/erc725.js';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

import LSP1DataKeys from '@erc725/erc725.js/schemas/LSP1UniversalReceiverDelegate.json';
import LSP3DataKeys from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import LSP4DataKeys from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import LSP5DataKeys from '@erc725/erc725.js/schemas/LSP5ReceivedAssets.json';
import LSP6DataKeys from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import LSP9DataKeys from '@erc725/erc725.js/schemas/LSP9Vault.json';

import { checkInterface, getData } from '../utils/web3';
import useWeb3 from '../hooks/useWeb3';

import SampleAddressInput from '../components/SampleAddressInput/SampleAddressInput';
import { SAMPLE_ADDRESS } from '../constants';

const dataKeyList = [
  ...LSP1DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '📢' })),
  ...LSP3DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '👤' })),
  ...LSP4DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '🔵' })),
  ...LSP5DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '💰' })),
  ...LSP6DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '🔑' })),
  ...LSP9DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '🔒' })),
];

const GetData: NextPage = () => {
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [dataKey, setDataKey] = useState('');
  const [dataKeyError, setDataKeyError] = useState('');
  const [data, setData] = useState('');
  const [interfaces, setInterfaces] = useState({
    isErc725X: false,
    isErc725Y: false,
  });

  const web3 = useWeb3();

  const onContractAddressChange = async (address: string) => {
    setAddress(address);
    setData('');
    if (!isAddress(address) && address.length !== 0) {
      setAddressError('The address is not valid');
      setInterfaces({
        isErc725X: false,
        isErc725Y: false,
      });
      return;
    }

    if (address.slice(0, 2) !== '0x' && address.length !== 0) {
      setAddress(`0x${address}`);
    }

    setAddressError('');

    if (!web3) {
      return;
    }

    const result = await checkInterface(address, web3);

    // Set first menu element as default
    onDataKeyChange(ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate);
    setInterfaces(result);
  };

  const onDataKeyChange = (dataKey: string) => {
    setDataKey(dataKey);
    setData('');

    if (
      (dataKey.length !== 64 && dataKey.length !== 66) ||
      (dataKey.length === 66 && dataKey.slice(0, 2) !== '0x')
    ) {
      setDataKeyError('The data key is not valid');
      return;
    }

    if (dataKey.slice(0, 2) !== '0x') {
      setDataKey(`0x${dataKey}`);
    }

    setDataKeyError('');
  };

  const onGetDataClick = async () => {
    if (!web3) {
      return;
    }

    if (!interfaces.isErc725Y) {
      console.log('Contract not compatible with ERC725');

      return;
    }

    const data = await getData(address, dataKey, web3);

    setData(data || '0x');
  };

  return (
    <>
      <Head>
        <title>getData - ERC725 Tools</title>
      </Head>
      <div className="container">
        <h2 className="title is-2">Data Fetcher</h2>
        <article className="message is-info">
          <div className="message-body">
            Retrieve the encoded storage of a
            <a
              href="https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725y---generic-key-value-store"
              target="_blank"
              rel="noreferrer"
              className="mx-1"
            >
              ERC725Y
            </a>
            data key.
          </div>
        </article>
        <article className="message">
          <div className="message-body">
            It&lsquo;s calling the
            <a
              href="https://github.com/ERC725Alliance/ERC725/blob/develop/docs/ERC-725.md#getdata"
              target="_blank"
              rel="noreferrer"
              className="mx-1"
            >
              getData
            </a>
            function of the
            <a
              href="https://docs.lukso.tech/standards/lsp-background/erc725#erc725y-generic-data-keyvalue-store"
              target="_blank"
              rel="noreferrer"
              className="mx-1"
            >
              ERC725Y
            </a>
            smart contract.
          </div>
        </article>

        <div className="is-flex">
          <div className="is-half">
            <div className="field">
              <label className="label">Contract Address</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder={SAMPLE_ADDRESS.TESTNET_UP}
                  value={address}
                  onChange={(e) => onContractAddressChange(e.target.value)}
                />
                <SampleAddressInput
                  onClick={(newAddress) => onContractAddressChange(newAddress)}
                />
              </div>
              {addressError !== '' && (
                <p className="help is-danger">{addressError}</p>
              )}
              {(interfaces.isErc725X || interfaces.isErc725Y) && (
                <p className="help is-success mt-3">
                  ERC725X: {interfaces.isErc725X ? '✅' : '❌'} - ERC725Y{' '}
                  {interfaces.isErc725Y ? '✅' : '❌'}
                </p>
              )}
            </div>

            <div className="field">
              <label className="label">Data Key</label>

              <div className="select mb-4 is-fullwidth">
                <select
                  onChange={(e) => onDataKeyChange(e.target.value)}
                  className="is-fullwidth"
                >
                  {dataKeyList.map((dataKey, index) => {
                    return (
                      <option key={index} value={dataKey.key}>
                        {dataKey.icon} &nbsp;
                        {dataKey.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <br />
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder={LSP1DataKeys[0].key}
                  value={dataKey}
                  onChange={(e) => onDataKeyChange(e.target.value)}
                />
              </div>
              {dataKeyError !== '' && (
                <p className="help is-danger">{dataKeyError}</p>
              )}
            </div>
            <button
              className="button is-primary"
              type="button"
              disabled={
                address === '' ||
                dataKey === '' ||
                addressError !== '' ||
                dataKeyError !== '' ||
                !interfaces.isErc725Y
              }
              onClick={onGetDataClick}
            >
              getData
            </button>
          </div>
        </div>
        <div>
          {data && (
            <div className="is-full-width my-4">
              <article className="message is-info">
                <div className="message-body">
                  You can decode this value using the
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#valueContent"
                    className="mx-1"
                  >
                    LSP-2 ERC725YJSONSchema
                  </a>
                  specification.
                </div>
              </article>
              <pre style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                {dataKey.startsWith(
                  ERC725YDataKeys.LSP6['AddressPermissions:Permissions'],
                )
                  ? JSON.stringify(ERC725.decodePermissions(data), undefined, 2)
                  : data}
              </pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GetData;
