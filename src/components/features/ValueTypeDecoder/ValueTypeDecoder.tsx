/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React, { useState, useEffect, useContext } from 'react';
import {
  ERC725,
  type ERC725JSONSchema,
  type DecodeDataOutput,
  type DynamicNameSchema,
} from '@erc725/erc725.js';

import { NetworkContext } from '@/contexts/NetworksContext';

// components
import AddressInfos from '@/components/features/AddressInfos';
import ControllersList from '@/components/features/ControllersList';
import ArrayDataKeyTableWithPagination from '@/components/features/ArrayDataKeyTableWithPagination';
import TokenTypeBadge from '@/components/ui/TokenTypeBadge';
import TokenIdFormatBadge from '@/components/ui/TokenIdFormatBadge';
import VerifiableURIViewer from '@/components/ui/VerifiableURIViewer';
import PermissionsDecoder from '../PermissionsDecoder';
import AllowedCallsDecoder from '../AllowedCallsDecoder/AllowedCallsDecoder';

interface Props {
  address: string;
  erc725JSONSchema: ERC725JSONSchema | DynamicNameSchema;
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
        console.log('erc725JSONSchema', erc725JSONSchema);
        const erc725 = new ERC725([erc725JSONSchema], address, network.rpcUrl);

        let decodeDataParams = {
          keyName: erc725JSONSchema.name,
          value: value as string,
        };

        if (
          erc725JSONSchema.keyType === 'Mapping' ||
          erc725JSONSchema.keyType === 'MappingWithGrouping'
        ) {
          decodeDataParams['dynamicKeyParts'] = (
            erc725JSONSchema as DynamicNameSchema
          ).dynamicKeyParts;
        }

        const decodedData = erc725.decodeData([decodeDataParams]);
        console.log('decodedData', decodedData);
        setDecodedDataOneKey(decodedData);

        if (erc725JSONSchema.keyType === 'Array') {
          const result = await erc725.getData(erc725JSONSchema.name);
          setDecodedDataArray(result);
        }
      } catch (error: any) {
        console.log('there was an error', error);
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

      return (
        <ArrayDataKeyTableWithPagination
          schema={erc725JSONSchema}
          values={decodedDataArray.value as (string | null)[]}
          userAddress={address}
        />
      );
    }

    if (
      !decodedDataOneKey ||
      !decodedDataOneKey[0] ||
      decodedDataOneKey[0].value === null
    ) {
      return <span className="help">No data found for this key.</span>;
    }

    console.log('decodedDataOneKey', decodedDataOneKey);

    const { value: decodedValue } = decodedDataOneKey[0];

    if (keyName.startsWith('AddressPermissions:Permissions:')) {
      return <PermissionsDecoder bitArrayHexValue={decodedValue} />;
    }

    if (keyName.startsWith('AddressPermissions:AllowedCalls:')) {
      console.log('decoding allowed calls');
      return <AllowedCallsDecoder allowedCalls={decodedValue} />;
    }

    if (valueContent === 'VerifiableURI' || valueContent === 'JSONURL') {
      return <VerifiableURIViewer value={decodedValue} />;
    }

    if (keyName == 'LSP4TokenType') {
      return <TokenTypeBadge value={decodedValue} />;
    }

    if (keyName == 'LSP8TokenIdFormat') {
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
    return <span>Could not decode the value for this data key</span>;
  }
};

export default ValueTypeDecoder;
