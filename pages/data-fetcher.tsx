import type { NextPage } from 'next';
import Head from 'next/head';
import { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { isAddress } from 'web3-utils';
import ERC725, {
  ERC725JSONSchema,
  getSchema,
  isDynamicKeyName,
} from '@erc725/erc725.js';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

import LSP1DataKeys from '@erc725/erc725.js/schemas/LSP1UniversalReceiverDelegate.json';
import LSP3DataKeys from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import LSP4DataKeys from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import LSP5DataKeys from '@erc725/erc725.js/schemas/LSP5ReceivedAssets.json';
import LSP6DataKeys from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import LSP8DataKeys from '@erc725/erc725.js/schemas/LSP8IdentifiableDigitalAsset.json';
import LSP9DataKeys from '@erc725/erc725.js/schemas/LSP9Vault.json';
import LSP10DataKeys from '@erc725/erc725.js/schemas/LSP10ReceivedVaults.json';
import LSP12DataKeys from '@erc725/erc725.js/schemas/LSP12IssuedAssets.json';
import LSP17DataKeys from '@erc725/erc725.js/schemas/LSP17ContractExtension.json';

import { checkInterface, getData } from '@/utils/web3';
import useWeb3 from '@/hooks/useWeb3';

import SampleAddressInput from '@/components/SampleAddressInput/SampleAddressInput';
import { SAMPLE_ADDRESS } from '@/constants';
import { NetworkContext } from '@/contexts/NetworksContext';
import { useRouter } from 'next/router';
import { isValidTuple } from '@erc725/erc725.js/build/main/src/lib/decodeData';
import CustomKeySchemaForm, {
  CustomKeySchemaFormRef,
} from '@/components/CustomKeySchemaForm/CustomKeySchemaForm';

// using local variable for LSP28TheGrid key for now
const LSP28_THE_GRID_KEY =
  '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff';

const dataKeyList = [
  ...LSP1DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '📢' })),
  ...LSP3DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '👤' })),
  ...LSP4DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '🔵' })),
  ...LSP5DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '💰' })),
  ...LSP6DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '🔑' })),
  ...LSP8DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '🖼️' })),
  ...LSP9DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '🔒' })),
  ...LSP10DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '🔒' })),
  ...LSP12DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '🖼️' })),
  ...LSP17DataKeys.map((key) => ({ name: key.name, key: key.key, icon: '💎' })),
  { name: 'LSP28TheGrid', key: LSP28_THE_GRID_KEY, icon: '🌐' },
  { name: 'Custom Key', key: '', icon: '🔧' },
];

const GetData: NextPage = () => {
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [dataKey, setDataKey] = useState(dataKeyList[0].key);
  const [dataKeyError, setDataKeyError] = useState('');

  // New state for controlling the dropdown selection
  const [selectedDataKeyOption, setSelectedDataKeyOption] = useState(
    dataKeyList[0].key,
  );

  const [data, setData] = useState('');
  const [decodedData, setDecodedData] = useState('');

  const [interfaces, setInterfaces] = useState({
    isErc725X: false,
    isErc725Y: false,
  });

  const [erc725js, setERC725JsInstance] = useState<ERC725>();
  const { network } = useContext(NetworkContext);
  const router = useRouter();

  const web3 = useWeb3();

  const customKeySchemaFormRef = useRef<CustomKeySchemaFormRef>(null);

  const schemas = [
    ...LSP1DataKeys,
    ...LSP3DataKeys,
    ...LSP4DataKeys,
    ...LSP5DataKeys,
    ...LSP6DataKeys,
    ...LSP8DataKeys,
    ...LSP9DataKeys,
    ...LSP10DataKeys,
    ...LSP12DataKeys,
    ...LSP17DataKeys,
    {
      name: 'LSP28TheGrid',
      key: LSP28_THE_GRID_KEY,
      keyType: 'Singleton',
      valueType: 'bytes',
      valueContent: 'VerifiableURI',
    },
  ];

  // Effect to sync selectedDataKeyOption when dataKey changes (e.g., from URL or programmatically)
  // Only sync when dataKey matches a predefined key exactly
  useEffect(() => {
    if (!dataKey) {
      return;
    }
    const matchingKey = dataKeyList.find(
      (item) => item.key === dataKey && item.key !== '',
    );
    if (matchingKey && selectedDataKeyOption !== dataKey) {
      setSelectedDataKeyOption(dataKey);
    }
  }, [dataKey]);

  const updateURLParams = useCallback(
    (newAddress: string, newDataKey: string) => {
      if (typeof window === 'undefined') return;

      const currentUrl = new URL(window.location.href);
      const existingAddress = currentUrl.searchParams.get('address');
      const existingDatakey = currentUrl.searchParams.get('datakey');

      if (newAddress === existingAddress && newDataKey === existingDatakey) {
        return;
      }

      currentUrl.searchParams.set('address', newAddress);
      currentUrl.searchParams.set('datakey', newDataKey);
      router.replace(currentUrl.toString(), undefined, { shallow: true });
    },
    [router], // router is stable
  );

  const onContractAddressChange = useCallback(
    async (addr: string) => {
      let finalAddr = addr;
      if (addr.slice(0, 2) !== '0x' && addr.length !== 0) {
        finalAddr = `0x${addr}`;
      }
      setAddress(finalAddr);
      setData('');
      setAddressError('');

      updateURLParams(finalAddr, dataKey);

      if (!isAddress(finalAddr) && finalAddr.length !== 0) {
        setAddressError('The address is not valid');
        setInterfaces({ isErc725X: false, isErc725Y: false });
        return;
      }

      if (!web3) {
        return;
      }

      try {
        const result = await checkInterface(finalAddr, web3);
        setInterfaces(result);
      } catch (error) {
        console.error('Error checking interface:', error);
        setInterfaces({ isErc725X: false, isErc725Y: false });
      }
    },
    [
      web3,
      dataKey,
      updateURLParams,
      setAddress,
      setData,
      setAddressError,
      setInterfaces,
    ],
  );

  const onDataKeyChange = useCallback(
    (value: string) => {
      let inputKey = value;
      let error = '';
      setData('');

      if (inputKey.length > 0) {
        if (
          (inputKey.length !== 64 && inputKey.length !== 66) ||
          (inputKey.length === 66 && inputKey.slice(0, 2) !== '0x')
        ) {
          error = 'The data key is not valid';
        } else if (inputKey.length === 64 && !inputKey.startsWith('0x')) {
          inputKey = `0x${inputKey}`;
        }
      }

      setDataKey(inputKey);
      setDataKeyError(error);
      updateURLParams(address, inputKey);

      // Only update dropdown selection if this is an exact match to a predefined key
      // Don't switch to custom key mode automatically
      const isPredefined = dataKeyList.some(
        (item) => item.key === inputKey && item.key !== '',
      );
      if (isPredefined) {
        setSelectedDataKeyOption(inputKey);
      }
      // Removed the else clause that was setting selectedDataKeyOption to ''
    },
    [address, updateURLParams, setData, setDataKey, setDataKeyError],
  );

  const handleDataKeyDropdownChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOptionValue = event.target.value;
      setSelectedDataKeyOption(selectedOptionValue);
      setData('');

      if (selectedOptionValue !== '') {
        onDataKeyChange(selectedOptionValue);
      } else {
        setDataKey('');
        setDataKeyError('');
        updateURLParams(address, '');
      }
    },
    [
      address,
      updateURLParams,
      setSelectedDataKeyOption,
      setData,
      setDataKey,
      setDataKeyError,
      onDataKeyChange,
    ],
  );

  // Moved this useEffect hook to be after the definitions of its dependencies
  useEffect(() => {
    // Wait for the router to be ready to ensure router.query is populated
    if (!router.isReady) {
      return;
    }

    const queryAddress = router.query.address as string | undefined;
    const queryDatakeyValue = router.query.datakey as string | undefined; // Use 'datakey'

    if (queryAddress !== undefined && queryAddress !== address) {
      onContractAddressChange(queryAddress);
    }

    if (queryDatakeyValue !== undefined && queryDatakeyValue !== dataKey) {
      onDataKeyChange(queryDatakeyValue);
    }
  }, [
    router.isReady,
    router.query,
    address,
    dataKey,
    onContractAddressChange,
    onDataKeyChange,
  ]);

  const onGetDataClick = async () => {
    if (!web3 || !erc725js) return;
    if (!interfaces.isErc725Y) {
      console.log('Contract not compatible with ERC725');
      return;
    }

    const isCustomKeyMode = selectedDataKeyOption === '';

    if (isCustomKeyMode) {
      if (!customKeySchemaFormRef.current) {
        console.error('CustomKeySchemaForm ref not available');
        setDecodedData('Internal error: Custom key form not ready.');
        setData('0x');
        return;
      }

      const customSchemaResult =
        customKeySchemaFormRef.current.getCompleteCustomSchema();

      if (customSchemaResult.error || !customSchemaResult.schema) {
        setDecodedData(
          customSchemaResult.error || 'Failed to generate custom schema.',
        );
        setData('0x');
        return;
      }

      const adHocSchema = customSchemaResult.schema;
      const keyFromCustomForm = adHocSchema.key;

      const dataToDecode = await getData(address, keyFromCustomForm, web3);

      if (!dataToDecode) {
        setData('0x');
        setDecodedData('no data to decode for the custom key 🤷');
        return;
      }
      setData(dataToDecode);

      const tempErc725 = new ERC725(
        [...schemas, adHocSchema],
        address,
        web3?.currentProvider,
        {
          ipfsGateway: 'https://api.ipfs.lukso.network/ipfs/',
        },
      );

      try {
        const decodedPayload = tempErc725.decodeData([
          { keyName: adHocSchema.name, value: dataToDecode },
        ]);

        const decodedCustomValue = decodedPayload[0]?.value;

        const decodedResult =
          adHocSchema.valueContent === 'VerifiableURI' ||
          isValidTuple(adHocSchema.valueType, adHocSchema.valueContent)
            ? JSON.stringify(decodedCustomValue, null, 4)
            : decodedCustomValue;
        setDecodedData(String(decodedResult));
      } catch (error) {
        console.error('Error decoding custom key:', error);
        setDecodedData(
          `Error decoding custom key: ${(error as Error).message}`,
        );
      }
    } else {
      if (dataKeyError || !dataKey) {
        setData('0x');
        setDecodedData('Invalid data key. Please check your input.');
        return;
      }

      const dataToDecode = await getData(address, dataKey, web3);

      if (!dataToDecode) {
        setData('0x');
        setDecodedData('no data to decode 🤷');
      } else {
        setData(dataToDecode);

        const foundSchema = getSchema(dataKey) as ERC725JSONSchema;
        if (!foundSchema && dataKey !== LSP28_THE_GRID_KEY) {
          setDecodedData(
            "Schema not found for this key using standard LSPs. Try 'Custom Key'.",
          );
          return;
        }
        let keyName, valueType, valueContent;

        if (foundSchema) {
          ({ name: keyName, valueType, valueContent } = foundSchema);
        } else if (dataKey === LSP28_THE_GRID_KEY) {
          keyName = 'LSP28TheGrid';
          valueType = 'bytes';
          valueContent = 'VerifiableURI';
        } else {
          console.error('Unknown schema error for predefined key');
          setDecodedData('Could not determine schema for the key.');
          return;
        }

        let decodedValue;

        if (isDynamicKeyName(keyName)) {
          decodedValue = erc725js.decodeData([
            {
              keyName,
              dynamicKeyParts: dataKey.slice(26),
              value: dataToDecode,
            },
          ]);
        } else {
          decodedValue = erc725js.decodeData([
            {
              keyName,
              value: dataToDecode,
            },
          ]);
        }
        const decodedResult =
          valueContent == 'VerifiableURI' ||
          isValidTuple(valueType, valueContent)
            ? JSON.stringify(decodedValue[0].value, null, 4)
            : decodedValue[0].value;
        setDecodedData(decodedResult);
      }
    }
  };

  useEffect(() => {
    setERC725JsInstance(
      new ERC725(schemas, address, web3?.currentProvider, {
        ipfsGateway: 'https://api.ipfs.lukso.network/ipfs/',
      }),
    );
  }, [address, web3]);

  return (
    <>
      <Head>
        <title>getData - ERC725 Tools</title>
      </Head>
      <div className="container">
        <h2 className="title is-2">Data Fetcher</h2>
        <div className="tags has-addons">
          <span className="tag is-dark">Network</span>
          <span className="tag is-warning">{network.name}</span>
        </div>
        <article className="message is-info">
          <div className="message-body">
            <p>
              Retrieve the encoded data stored under an
              <a
                href="https://docs.lukso.tech/standards/universal-profile/lsp0-erc725account#erc725y---generic-key-value-store"
                target="_blank"
                rel="noreferrer"
                className="mx-1"
              >
                ERC725Y
              </a>
              data key.
            </p>
            <p>
              See the
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#valueContent"
                className="mx-1"
              >
                LSP-2 ERC725YJSONSchema
              </a>
              specification to know how this value is encoded/decoded.
            </p>
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
                  value={selectedDataKeyOption}
                  onChange={handleDataKeyDropdownChange}
                  className="is-fullwidth"
                >
                  {dataKeyList.map((dataKeyItem, index) => {
                    return (
                      <option key={index} value={dataKeyItem.key}>
                        {dataKeyItem.icon} &nbsp;
                        {dataKeyItem.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <br />
              {selectedDataKeyOption !== '' && (
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder={LSP1DataKeys[0].key}
                    value={dataKey}
                    onChange={(e) => onDataKeyChange(e.target.value)}
                  />
                </div>
              )}
              {selectedDataKeyOption !== '' && dataKeyError !== '' && (
                <p className="help is-danger">{dataKeyError}</p>
              )}

              {selectedDataKeyOption === '' && (
                <CustomKeySchemaForm ref={customKeySchemaFormRef} />
              )}
            </div>
            <button
              className="button is-primary"
              type="button"
              disabled={
                address === '' ||
                addressError !== '' ||
                !interfaces.isErc725Y ||
                (selectedDataKeyOption !== '' &&
                  (dataKey === '' || dataKeyError !== ''))
              }
              onClick={onGetDataClick}
            >
              getData
            </button>
          </div>
        </div>
        <hr />

        {data && (
          <div className="is-full-width">
            <div className="columns is-vcentered my-2">
              <span className="mr-3">Encoded Value:</span>
              <pre style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                {data}
              </pre>
            </div>

            <div className="columns is-vcentered my-2">
              <span className="mr-3">Decoded Value</span>
              <pre style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                {dataKey.startsWith(
                  ERC725YDataKeys.LSP6['AddressPermissions:Permissions'],
                )
                  ? JSON.stringify(ERC725.decodePermissions(data), undefined, 2)
                  : decodedData}
              </pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GetData;
