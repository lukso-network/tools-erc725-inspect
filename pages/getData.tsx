import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { isAddress } from 'web3-utils';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import useWeb3 from '../hooks/useWeb3';
import { checkInterface, getData, getDataLegacy } from '../utils/web3';

interface DataKeysList {
  name: string;
  key: string;
  icon: string;
}

const GetData: NextPage = () => {
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  4;
  const [dataKey, setDataKey] = useState('');
  const [dataKeyError, setDataKeyError] = useState('');
  const [dataKeyList, setDataKeyList] = useState<DataKeysList[]>([]);

  const [data, setData] = useState('');

  const [interfaces, setInterfaces] = useState({
    isErc725X: false,
    isErc725Y: false,
    isErc725YLegacy: false,
  });

  const web3 = useWeb3();

  useEffect(() => {
    setDataKeyList([
      {
        name: 'LSP1UniversalReceiverDelegate',
        key: '0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47',
        icon: '📢',
      },
      {
        name: 'LSP3Profile',
        key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
        icon: '👤',
      },
      {
        name: 'LSP4TokenName',
        key: '0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1',
        icon: '🔵',
      },
      {
        name: 'LSP5ReceivedAssets[]',
        key: '0x6460ee3c0aac563ccbf76d6e1d07bada78e3a9514e6382b736ed3f478ab7b90b',
        icon: '💰',
      },
    ]);
  }, []);

  const onContractAddressChange = async (address: string) => {
    setAddress(address);
    setData('');
    if (!isAddress(address)) {
      setAddressError('The address is not valid');
      setInterfaces({
        isErc725X: false,
        isErc725Y: false,
        isErc725YLegacy: false,
      });
      return;
    }

    if (address.slice(0, 2) !== '0x') {
      setAddress(`0x${address}`);
    }

    setAddressError('');

    if (!web3) {
      return;
    }

    const result = await checkInterface(address, web3);
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

    if (!interfaces.isErc725Y || !interfaces.isErc725YLegacy) {
      console.log('Contract not compatible with ERC725');
    }

    let data;

    if (interfaces.isErc725Y) {
      data = await getData(address, [dataKey], web3);
    } else {
      data = await getDataLegacy(address, web3, dataKey);
    }

    setData(data);
  };

  return (
    <>
      <Head>
        <title>getData - ERC725 Tools</title>
      </Head>
      <div className="container">
        <article className="message is-info">
          <div className="message-body">
            This tool calls <code>getData</code> on a{' '}
            <a href="https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725y---generic-key-value-store">
              ERC725Y
            </a>{' '}
            compatible smart contract.
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
                  onChange={(e: SelectChangeEvent) =>
                    onContractAddressChange(e.target.value)
                  }
                />
              </div>
              {addressError !== '' && (
                <p className="help is-danger">{addressError}</p>
              )}
              {(interfaces.isErc725X ||
                interfaces.isErc725Y ||
                interfaces.isErc725YLegacy) && (
                <p className="help is-success">
                  ERC725X: {interfaces.isErc725X ? '✅' : '❌'} - ERC725Y
                  {interfaces.isErc725YLegacy ? ' (legacy)' : ''}:{' '}
                  {interfaces.isErc725Y || interfaces.isErc725YLegacy
                    ? '✅'
                    : '❌'}
                </p>
              )}
            </div>

            <div className="field">
              <label className="label">Data key</label>
              <FormControl fullWidth>
                <input
                  className="input"
                  type="text"
                  placeholder="0xeafec4d89fa9619884b6b89135626455000000000000000000000000afdeb5d6"
                  value={dataKey}
                  onChange={(e) => onDataKeyChange(e.target.value)}
                />
                <Select
                  label="Find your ERC725Y data key"
                  onChange={(e: SelectChangeEvent) =>
                    onDataKeyChange(e.target.value)
                  }
                >
                  {dataKeyList.map((dataKey) => {
                    return (
                      <MenuItem value={dataKey.key}>
                        {dataKey.icon}&nbsp;<code>{dataKey.name}</code> -{' '}
                        {dataKey.key}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {dataKeyError !== '' && (
                <p className="help is-danger">{dataKeyError}</p>
              )}
            </div>
            <button
              className="button is-primary"
              type="button"
              disabled={
                (address === '' ||
                  dataKey === '' ||
                  addressError !== '' ||
                  dataKeyError !== '') &&
                (interfaces.isErc725Y || interfaces.isErc725YLegacy)
              }
              onClick={onGetDataClick}
            >
              getData
            </button>
          </div>
        </div>
        <div className="columns">
          {data && (
            <div className="column">
              <article className="message is-info">
                <div className="message-body">
                  To decode this value, you can refer to the{' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#valueContent"
                  >
                    LSP-2-ERC725YJSONSchema spec
                  </a>
                  .
                </div>
              </article>
              <pre style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                {data}
              </pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GetData;
