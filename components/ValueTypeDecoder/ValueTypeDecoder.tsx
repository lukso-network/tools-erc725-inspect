/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React from 'react';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import { Erc725JsonSchemaAll } from '../../interfaces/erc725';
import AddressButtons from '../AddressButtons';
import { LUKSO_IPFS_BASE_URL } from '../../globals';
import useWeb3 from '../../hooks/useWeb3';

interface Props {
  address: string;
  erc725JSONSchema: ERC725JSONSchema | Erc725JsonSchemaAll;
  value: string;
}

const ValueTypeDecoder: React.FC<Props> = ({
  address,
  erc725JSONSchema,
  value,
}) => {
  let decodedDataOneKey;

  try {
    const web3 = useWeb3();

    // The schema may be wrong, this error will be catched below
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const schema: ERC725JSONSchema[] = [erc725JSONSchema];

    const erc725 = new ERC725(schema, address, web3?.currentProvider);

    console.log('value', value);

    decodedDataOneKey = erc725.decodeData([
      {
        keyName: erc725JSONSchema.name,
        value: value,
      },
    ]);
    console.log('decodedDataOneKey', decodedDataOneKey);
  } catch (err) {
    // Goes here if key is not in erc725.js yet or if key is undefined
    return <span>Can&apos;t decode this key</span>;
  }

  try {
    if (typeof decodedDataOneKey[0].value === 'string') {
      if (erc725JSONSchema.valueContent === 'Address') {
        return <AddressView value={decodedDataOneKey[0].value} />;
      }

      return <code>{value}</code>;
    }

    if (
      Array.isArray(decodedDataOneKey[0].value) &&
      erc725JSONSchema.keyType === 'Array'
    ) {
      console.log('decodedDataOneKey', decodedDataOneKey);
      return (
        <ul>
          <li>{decodedDataOneKey[0].value[0]}</li>
        </ul>
      );
    }

    if (erc725JSONSchema.valueContent === 'JSONURL') {
      return (
        <>
          <pre>{JSON.stringify(decodedDataOneKey[0].value, null, 4)}</pre>
          <div>
            <span>URL: {decodedDataOneKey[0].value.url}</span> -{' '}
            {decodedDataOneKey[0].value.url.indexOf('ipfs://') !== -1 && (
              <>
                [
                <a
                  className="has-text-link"
                  target="_blank"
                  rel="noreferrer"
                  href={`${LUKSO_IPFS_BASE_URL}/${decodedDataOneKey[0].value.url.replace(
                    'ipfs://',
                    '',
                  )}`}
                >
                  LUKSO IPFS
                </a>
                ]
              </>
            )}
          </div>
        </>
      );
    }

    // display in a code block as a fallback
    return (
      <div>
        <pre>{JSON.stringify(decodedDataOneKey[0], null, 4)}</pre>
      </div>
    );
  } catch (err) {
    return <span>Can&apos;t decode this key</span>;
  }
};

const AddressView = ({ value }: { value: string }) => {
  return (
    <>
      <code>{value}</code>
      <AddressButtons address={value} />
    </>
  );
};

export default ValueTypeDecoder;
