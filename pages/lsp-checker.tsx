import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import {
  ERC725,
  decodeDataSourceWithHash,
  getDataFromExternalSources,
  isDynamicKeyName,
} from '@erc725/erc725.js';
import LSP3Schema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';

import SampleAddressInput from '@/components/SampleAddressInput';
import useWeb3 from '@/hooks/useWeb3';
import { checkInterface, getDataBatch } from '@/utils/web3';
import { isAddress, keccak256, stripHexPrefix } from 'web3-utils';
import { LUKSO_IPFS_BASE_URL } from '@/constants/links';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { isProfileMetadata } = require('@lukso/lsp-utils');

enum Status {
  PASS,
  FAIL,
  INFO,
  WARNING,
  BLANK,
}

type CheckStatus = {
  [key in Status]: string;
};

const checkStatusIcons: CheckStatus = {
  [Status.PASS]: '✅',
  [Status.FAIL]: '❌',
  [Status.INFO]: 'ℹ️',
  [Status.WARNING]: '⚠️',
  [Status.BLANK]: '-',
};

type CheckResult = { dataKey: string; pass: Status; valueSet: string };
type MetadataValidation = { hashMatch: boolean; jsonValid: boolean };

const LSPChecker: NextPage = () => {
  const web3 = useWeb3();

  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [checkResults, setCheckResults] = useState<CheckResult[]>([]);
  const [metadataValid, setMetadataValid] = useState<MetadataValidation>();

  const [supportedInterfaces, setSupportedInterfaces] = useState({
    isLsp0Erc725Account: false,
  });

  const getUniversalProfileResults = async () => {
    if (!web3) {
      return;
    }

    const schemas = LSP3Schema.concat(LSP6Schema);
    const nonDynamicSchemas = schemas.filter(
      (schema) => !isDynamicKeyName(schema.name),
    );

    const valuesFetched = await getDataBatch(
      address,
      nonDynamicSchemas.map((schema) => schema.key),
      web3,
    );

    const checkResults = () => {
      return valuesFetched.map((data: string, index: number) => {
        const decodedValue = ERC725.decodeData(
          [{ keyName: nonDynamicSchemas[index].name, value: data }],
          [nonDynamicSchemas[index]],
        );

        const { name: dataKey, value } = decodedValue[0];
        let pass = Status.BLANK;

        if (dataKey == 'SupportedStandards:LSP3Profile') {
          pass = value === '0x5ef83ad9' ? Status.PASS : Status.FAIL;
        }

        if (dataKey == 'LSP3Profile') {
          pass = value != '0x' ? Status.PASS : Status.INFO;
        }

        if (dataKey == 'LSP1UniversalReceiverDelegate') {
          pass = isAddress(value as string) ? Status.PASS : Status.FAIL;
        }

        if (
          dataKey == 'AddressPermissions[]' ||
          dataKey == 'LSP12IssuedAssets[]' ||
          dataKey == 'LSP5ReceivedAssets[]'
        ) {
          // must be 16 bytes long
          if (data == '0x') {
            pass = Status.INFO;
          } else {
            pass =
              stripHexPrefix(data).length / 2 == 16 ? Status.PASS : Status.FAIL;
          }
        }

        return {
          dataKey,
          pass,
          valueSet: valuesFetched[index],
        };
      });
    };

    return checkResults();
  };

  const retrieveData = async () => {
    if (!web3) {
      return;
    }

    setIsLoading(true);

    let results: CheckResult[] = [];

    const { isLsp0Erc725Account } = await checkInterface(address, web3);

    results = (await getUniversalProfileResults()) as CheckResult[];

    const lsp3ProfileValue = results.find(
      (value) => value.dataKey === 'LSP3Profile',
    );

    if (lsp3ProfileValue) {
      const lsp3ProfileSchema = LSP3Schema[1];

      const { name, key } = lsp3ProfileSchema;

      const decodedVerifiableURI = decodeDataSourceWithHash(
        lsp3ProfileValue.valueSet,
      );

      const [{ value: json }] = await getDataFromExternalSources(
        [lsp3ProfileSchema],
        [
          {
            value: decodedVerifiableURI,
            name,
            key,
          },
        ],
        LUKSO_IPFS_BASE_URL,
      );

      const hash = keccak256(JSON.stringify(json));

      setMetadataValid({
        hashMatch: decodedVerifiableURI.verification.data == hash,
        jsonValid: isProfileMetadata(json),
      });
    }

    if (checkResults !== undefined) {
      setCheckResults(results);
    }

    setSupportedInterfaces({
      isLsp0Erc725Account,
    });

    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>LSP Checker - ERC725 Tools</title>
      </Head>
      <div className="container">
        <h2 className="title is-2">LSP Checker</h2>

        <div className="field">
          <h3 className="title is-3">Contract Address</h3>
          <div className="control mb-0">
            <input
              className="input"
              type="text"
              placeholder="0x..."
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <SampleAddressInput
              onClick={(newAddress) => setAddress(newAddress)}
            />
            <button
              className="button is-primary mx-2"
              type="button"
              onClick={retrieveData}
            >
              Verify Universal Profile
            </button>
          </div>
        </div>
        <div className="content my-5">
          {!isLoading && (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Check</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {checkResults.map((result, index) => (
                    <tr key={index}>
                      <td>
                        <b>Data Key: </b>
                        <code>{result.dataKey}</code>
                      </td>
                      <td>{checkStatusIcons[result.pass]}</td>
                      <td style={{ maxWidth: '300px' }}>
                        <pre
                          style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                          }}
                        >
                          {result.valueSet}
                        </pre>
                        {result.dataKey == 'LSP3Profile' && (
                          <>
                            <p>
                              Is the JSON file valid?{' '}
                              {metadataValid?.jsonValid ? '✅' : '❌'}
                            </p>
                            <p>
                              Does the hash matches the hash of the JSON file?{' '}
                              {metadataValid?.hashMatch ? '✅' : '❌'}
                            </p>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <code>supportsInterface(LSP0ERC725Account)</code>
                    </td>
                    <td>
                      {supportedInterfaces.isLsp0Erc725Account ? '✅' : '❌'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LSPChecker;
