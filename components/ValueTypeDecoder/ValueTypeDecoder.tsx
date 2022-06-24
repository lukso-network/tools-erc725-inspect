/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React from 'react';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import { Erc725JsonSchemaAll } from '../../interfaces/erc725';
import AddressButtons from '../AddressButtons';
import { LUKSO_IPFS_BASE_URL } from '../../globals';

interface Props {
  erc725JSONSchema: ERC725JSONSchema | Erc725JsonSchemaAll;
  value: string | string[];
}

const ValueTypeDecoder: React.FC<Props> = ({ erc725JSONSchema, value }) => {
  if (erc725JSONSchema.keyType === 'Array') {
    return (
      <ul>
        {(value as string[]).map((element, index) => (
          <li>
            [ {index} ] {'=>'} <code>{element}</code>
          </li>
        ))}
      </ul>
    );
  } else {
    if (erc725JSONSchema.valueContent === 'Address') {
      return (
        <>
          <code>{value}</code>
          <AddressButtons address={value} />
        </>
      );
    }
  }

  // The schema may be wrong, this error will be catched below
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const schema: ERC725JSONSchema[] = [erc725JSONSchema];

  const erc725 = new ERC725(schema);

  let decodedDataOneKey;
  try {
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
    return (
      <div>
        <pre>{JSON.stringify(decodedDataOneKey[0], null, 4)}</pre>
        {decodedDataOneKey[0].url && (
          <div>
            <span>URL: {decodedDataOneKey[0].url}</span> -{' '}
            {decodedDataOneKey[0].url.indexOf('ipfs://') !== -1 && (
              <>
                [
                <a
                  className="has-text-link"
                  target="_blank"
                  rel="noreferrer"
                  href={`${LUKSO_IPFS_BASE_URL}/${decodedDataOneKey[
                    erc725JSONSchema.name
                  ].url.replace('ipfs://', '')}`}
                >
                  LUKSO IPFS
                </a>
                ]
              </>
            )}
          </div>
        )}
      </div>
    );
  } catch (err) {
    return <span>Can&apos;t decode this key</span>;
  }
};

const AddressView = (value: string) => {
  return (
    <>
      <code>{value}</code>
      <AddressButtons address={value} />
    </>
  );
};

export default ValueTypeDecoder;
