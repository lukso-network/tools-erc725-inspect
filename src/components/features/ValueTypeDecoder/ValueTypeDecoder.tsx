/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React, { useState, useEffect, useContext } from 'react';
import {
  ERC725,
  type ERC725JSONSchema,
  type DecodeDataOutput,
} from '@erc725/erc725.js';

import { NetworkContext } from '@/contexts/NetworksContext';

// components
import AddressInfos from '@/components/features/AddressInfos';
import ControllersList from '@/components/features/ControllersList';
import TokenTypeBadge from '@/components/ui/TokenTypeBadge';
import TokenIdFormatBadge from '@/components/ui/TokenIdFormatBadge';
import VerifiableURIViewer from '@/components/ui/VerifiableURIViewer';

interface Props {
  address: string;
  erc725JSONSchema: ERC725JSONSchema;
  value: string | string[];
}

const ValueTypeDecoder: React.FC<Props> = ({
  address,
  erc725JSONSchema,
  value,
}) => {
  // state to decoded the value retrieved from a data key
  const [decodedDataOneKey, setDecodedDataOneKey] = useState<{
    [key: string]: any;
  }>([]);
  // state used to retrieve entries for an Array data key
  const [decodedDataArray, setDecodedDataArray] = useState<DecodeDataOutput>({
    key: '',
    name: '',
    value: [],
  });

  const { network } = useContext(NetworkContext);

  useEffect(() => {
    const startDecoding = async () => {
      if (!network?.rpcUrl) return;

      try {
        const erc725 = new ERC725([erc725JSONSchema], address, network.rpcUrl);

        const decodedData = erc725.decodeData([
          {
            keyName: erc725JSONSchema.name,
            value: value as string,
          },
        ]);
        setDecodedDataOneKey(decodedData);

        if (erc725JSONSchema.keyType === 'Array') {
          const result = await erc725.getData(erc725JSONSchema.name);
          setDecodedDataArray(result);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    startDecoding();
  }, [address, network, erc725JSONSchema, value]);

  const { name: keyName, keyType, valueContent } = erc725JSONSchema;

  try {
    // Handle the case for arrays
    if (
      decodedDataArray &&
      keyType === 'Array' &&
      Array.isArray(decodedDataArray.value)
    ) {
      // TODO: not sure if this should go in the underlying components or not
      if (decodedDataArray.value.length === 0) {
        return <span className="help">No array entries found.</span>;
      }

      if (keyName == 'AddressPermissions[]') {
        return (
          <ControllersList
            address={address}
            controllers={decodedDataArray.value as string[]}
          />
        );
      }

      // TODO: create a table component <AssetsTable> for LSP5 + LSP12 Issued Assets

      // TODO: create a a generic table component to display the values as fallback (e.g: LSP10 Vaults)
      return (
        <ul>
          <li style={{ listStyleType: 'none' }}>
            {decodedDataArray.value.length} elements in Array
          </li>
          {decodedDataArray.value.map(
            (item, index) =>
              item && (
                <li key={index}>
                  <AddressInfos
                    address={item.toString()}
                    userAddress={address}
                  />
                </li>
              ),
          )}
        </ul>
      );
    }

    // TODO: re-introduce better error handling for this case. This check fails and does not display LSP8TokenIdFormat anymore
    // if (
    //   !decodedDataOneKey ||
    //   !decodedDataOneKey[0] ||
    //   !decodedDataOneKey[0].value
    // ) {
    //   return <span className="help">No data found for this key.</span>;
    // }

    const { value: decodedValue } = decodedDataOneKey[0];

    if (valueContent === 'VerifiableURI' || valueContent === 'JSONURL') {
      return <VerifiableURIViewer value={decodedValue} />;
    }

    if (keyName == 'LSP4TokenType') {
      return <TokenTypeBadge value={decodedValue} />;
    }

    if (keyName == 'LSP8TokenIdFormat') {
      console.log('found LSP8 Token Id Format!');
      return <TokenIdFormatBadge value={decodedValue} />;
    }

    if (valueContent === 'Address') {
      return (
        <>
          <code>{value}</code>
          <div className="mt-4"></div>
          <AddressInfos address={decodedValue} userAddress={address} />
        </>
      );
    }

    // Handle all the remaining cases
    if (typeof decodedValue === 'string' || typeof decodedValue === 'number') {
      return (
        <span className="tag is-medium is-info is-light">{decodedValue}</span>
      );
    }

    // This part of the code should never be reached, but we keep it for debugging purposes
    // display in a code block as a fallback
    return (
      <div>
        <pre>{JSON.stringify(decodedDataOneKey[0], null, 4)}</pre>
      </div>
    );
  } catch (err) {
    console.warn('Could not decode the key: ', err);
    return <span>Couldn&apos;t decode the value for this data key</span>;
  }
};

export default ValueTypeDecoder;
