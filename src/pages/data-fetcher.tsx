import { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { isAddress } from 'viem';
import ERC725, {
  DynamicNameSchema,
  ERC725JSONSchema,
  getSchema,
  isDynamicKeyName,
} from '@erc725/erc725.js';

import { NetworkContext } from '@/contexts/NetworksContext';

// components
import DataKeyBox from '@/components/ui/DataKeyBox/DataKeyBox';
import SampleAddressInput from '@/components/ui/SampleAddressInput/SampleAddressInput';
import ToolInfos from '@/components/layout/ToolInfos';

// LSP2 JSON Schemas
import LSP1Schemas from '@erc725/erc725.js/schemas/LSP1UniversalReceiverDelegate.json';
import LSP3Schemas from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import LSP4Schemas from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import LSP5Schemas from '@erc725/erc725.js/schemas/LSP5ReceivedAssets.json';
import LSP6Schemas from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import LSP8Schemas from '@erc725/erc725.js/schemas/LSP8IdentifiableDigitalAsset.json';
import LSP9Schemas from '@erc725/erc725.js/schemas/LSP9Vault.json';
import LSP10Schemas from '@erc725/erc725.js/schemas/LSP10ReceivedVaults.json';
import LSP12Schemas from '@erc725/erc725.js/schemas/LSP12IssuedAssets.json';
import LSP17Schemas from '@erc725/erc725.js/schemas/LSP17ContractExtension.json';

// utils
import { getData } from '@/utils/erc725y';
import { getAllSupportedInterfaces } from '@/utils/interface-detection';

// constants
import { LSP6DataKeys } from '@lukso/lsp6-contracts';
import { LSP_SPECS_URL, LUKSO_IPFS_BASE_URL } from '@/constants/links';

// using local variable for LSP28TheGrid key for now
const LSP28_THE_GRID_DATA_KEY =
  '0x724141d9918ce69e6b8afcf53a91748466086ba2c74b94cab43c649ae2ac23ff';

const dataKeyList = [
  ...LSP1Schemas.map(({ name, key }) => ({ name, key, icon: '📢' })),
  ...LSP3Schemas.map(({ name, key }) => ({ name, key, icon: '👤' })),
  ...LSP4Schemas.map(({ name, key }) => ({ name, key, icon: '🔵' })),
  ...LSP5Schemas.map(({ name, key }) => ({ name, key, icon: '💰' })),
  ...LSP6Schemas.map(({ name, key }) => ({ name, key, icon: '🔑' })),
  ...LSP8Schemas.map(({ name, key }) => ({ name, key, icon: '🖼️' })),
  ...LSP9Schemas.map(({ name, key }) => ({ name, key, icon: '🔒' })),
  ...LSP10Schemas.map(({ name, key }) => ({ name, key, icon: '🔒' })),
  ...LSP12Schemas.map(({ name, key }) => ({ name, key, icon: '🖼️' })),
  ...LSP17Schemas.map(({ name, key }) => ({ name, key, icon: '💎' })),
  { name: 'LSP28TheGrid', key: LSP28_THE_GRID_DATA_KEY, icon: '🌐' },
];

const GetData: NextPage = () => {
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const [dataKey, setDataKey] = useState(dataKeyList[0].key);
  const [dataKeyError, setDataKeyError] = useState('');

  const [data, setData] = useState('');
  const [decodedData, setDecodedData] = useState('');

  const [schemaOfDataKey, setSchemaOfDataKey] = useState<
    ERC725JSONSchema | undefined
  >(undefined);

  const [interfaces, setInterfaces] = useState({
    isErc725X: false,
    isErc725Y: false,
  });

  const [erc725js, setERC725JsInstance] = useState<ERC725>();
  const router = useRouter();

  const { network } = useContext(NetworkContext);

  const schemas = [
    ...LSP1Schemas,
    ...LSP3Schemas,
    ...LSP4Schemas,
    ...LSP5Schemas,
    ...LSP6Schemas,
    ...LSP8Schemas,
    ...LSP9Schemas,
    ...LSP10Schemas,
    ...LSP12Schemas,
    ...LSP17Schemas,
    {
      name: 'LSP28TheGrid',
      key: LSP28_THE_GRID_DATA_KEY,
      keyType: 'Singleton',
      valueType: 'bytes',
      valueContent: 'VerifiableURI',
    },
  ];

  useEffect(() => {
    const queryAddress = router.query.address;
    const queryDataKey = router.query.dataKey;

    if (queryAddress && typeof queryAddress === 'string') {
      setAddress(queryAddress);
    }
    if (queryDataKey && typeof queryDataKey === 'string') {
      setDataKey(queryDataKey);
    }
  }, [router.query]);

  const updateURLParams = (address: string, dataKey: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('address', address);
    currentUrl.searchParams.set('datakey', dataKey);
    router.replace(currentUrl.href, undefined, { shallow: true });
  };

  const onContractAddressChange = async (address: string) => {
    setAddress(address);
    setData('');

    updateURLParams(address, dataKey);

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

    if (!network) return;

    const result = await getAllSupportedInterfaces(address, network);
    setInterfaces(result);
  };

  const onDataKeyChange = (dataKey: string) => {
    setDataKey(dataKey);
    setData('');

    updateURLParams(address, dataKey);

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
    if (!network || !erc725js) return;

    if (!interfaces.isErc725Y) {
      console.log('Contract not compatible with ERC725');

      return;
    }

    const data = await getData(address, dataKey, network);

    if (!data) {
      setData('0x');
      setDecodedData('no data to decode 🤷');
    } else {
      setData(data);

      let keyName, keyType, valueType, valueContent;

      // Handle LSP28TheGrid data key differently since we don't have a schema from the library
      if (dataKey === LSP28_THE_GRID_DATA_KEY) {
        keyName = 'LSP28TheGrid';
        valueType = 'bytes';
        valueContent = 'VerifiableURI';
        setSchemaOfDataKey({
          name: keyName,
          key: dataKey,
          keyType: 'Singleton',
          valueType,
          valueContent,
        });
        return;
      }

      const foundSchema = getSchema(dataKey);

      if (!foundSchema) {
        setSchemaOfDataKey(undefined);
        console.error('Unknown schema');
        return;
      }

      console.log('foundSchema', foundSchema);

      ({ name: keyName, valueType, valueContent } = foundSchema);

      let decodedValue;

      if (isDynamicKeyName(keyName)) {
        // for dynamic key names, we need to use the:
        // - `dynamicName` property of the schema as name
        // - and the `dynamicKeyParts` property for decoding
        const dynamicSchema = foundSchema as DynamicNameSchema;

        console.log('dynamicSchema', dynamicSchema);

        const { dynamicName: keyName, dynamicKeyParts } = dynamicSchema;

        setSchemaOfDataKey({
          name: keyName as string,
          key: dataKey,
          keyType,
          valueType,
          valueContent,
        });

        console.log('dynamicKeyParts', dynamicKeyParts);

        decodedValue = erc725js.decodeData([
          {
            keyName: dynamicSchema.name as string,
            dynamicKeyParts,
            value: data,
          },
        ]);
      } else {
        setSchemaOfDataKey(foundSchema as ERC725JSONSchema);
        decodedValue = erc725js.decodeData([
          {
            keyName,
            value: data,
          },
        ]);
      }

      // TODO: export isValidTuple from @erc725/erc725.js library and it it in this check
      const decodedResult =
        valueContent == 'VerifiableURI'
          ? JSON.stringify(decodedValue[0].value, null, 4)
          : decodedValue[0].value;
      setDecodedData(decodedResult);
    }
  };

  useEffect(() => {
    setERC725JsInstance(
      new ERC725(schemas, address, network.rpcUrl, {
        ipfsGateway: `${LUKSO_IPFS_BASE_URL}/`,
      }),
    );
  }, [address, network]);

  return (
    <>
      <Head>
        <title>getData - ERC725 Tools</title>
      </Head>
      <div className="container">
        <h2 className="title is-2">Data Fetcher</h2>
        <ToolInfos
          erc725jsMethod="decodeData"
          description={
            <>
              Retrieve the value under a specific{' '}
              <a href={LSP_SPECS_URL.ERC725Y} target="_blank" rel="noreferrer">
                ERC725Y
              </a>{' '}
              data key and decode it according to its known{' '}
              <a
                href={`${LSP_SPECS_URL.LSP2}#valueContent`}
                target="_blank"
                rel="noreferrer"
              >
                LSP2 <code>valueContent</code>
              </a>
            </>
          }
        />

        <div className="is-flex">
          <div className="is-half">
            <div className="field">
              <label className="label">Contract Address</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter a UP, LSP7 or LSP8 address"
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
                  value={dataKey}
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
                  placeholder={LSP1Schemas[0].key}
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
        <hr />

        {data && (
          <div className="is-full-width">
            {schemaOfDataKey ? (
              <DataKeyBox
                address={address}
                data={{ key: dataKey, value: data, schema: schemaOfDataKey }}
              />
            ) : (
              <>
                <div className="columns is-vcentered my-2">
                  <span className="mr-3">Encoded Value:</span>
                  <pre
                    style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}
                  >
                    {data}
                  </pre>
                </div>

                <div className="columns is-vcentered my-2">
                  <span className="mr-3">Decoded Value</span>
                  <pre
                    style={{ wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}
                  >
                    {dataKey.startsWith(
                      LSP6DataKeys['AddressPermissions:Permissions'],
                    )
                      ? JSON.stringify(
                          ERC725.decodePermissions(data as `0x${string}`),
                          undefined,
                          2,
                        )
                      : decodedData}
                  </pre>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default GetData;
