import React from 'react';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import { Erc725JsonSchemaAll } from '../../interfaces/erc725';
import AddressButtons from '../AddressButtons';

interface Props {
  erc725JSONSchema: ERC725JSONSchema | Erc725JsonSchemaAll;
  value: string;
}

const ValueTypeDecoder: React.FC<Props> = ({ erc725JSONSchema, value }) => {
  if (erc725JSONSchema.valueContent === 'Address') {
    return (
      <>
        <code>{value}</code>
        <AddressButtons address={value} />
      </>
    );
  }

  // The schema may be wrong, this error will be catched bellow
  // @ts-ignore
  const schema: ERC725JSONSchema[] = [erc725JSONSchema];

  const erc725 = new ERC725(schema);

  let decodedDataOneKey;
  try {
    decodedDataOneKey = erc725.decodeData({
      [erc725JSONSchema.name]: value,
    });
  } catch (err) {
    // Goes here if key is not in erc725.js yet or if key is undefined
    return <span>Can't decode this key</span>;
  }

  console.log(decodedDataOneKey);

  return (
    <div>
      <pre>{JSON.stringify(decodedDataOneKey, null, 4)}</pre>
      {decodedDataOneKey[erc725JSONSchema.name].url && (
        <span>URL: {decodedDataOneKey[erc725JSONSchema.name].url}</span>
      )}
    </div>
  );
};

export default ValueTypeDecoder;
