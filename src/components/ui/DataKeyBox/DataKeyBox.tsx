import type { DynamicNameSchema, ERC725JSONSchema } from '@erc725/erc725.js';

import { SCHEMA_DOCS_LINKS, SchemaName } from '@/constants/schemas';

import AddressButtons from '@/components/ui/AddressButtons';
import ValueTypeDecoder from '@/components/features/ValueTypeDecoder';
import CollapsibleSchema from '@/components/ui/CollapsibleSchema';
import styles from './DataKeyBox.module.scss';

type DataKeyBoxProps = {
  address: string;
  data: {
    key: string;
    value: string | string[];
    schema: ERC725JSONSchema | DynamicNameSchema;
  };
};

const DataKeyBox = ({ address, data }: DataKeyBoxProps) => {
  const { value, schema } = data;
  const { key, keyType, valueType, valueContent } = schema;

  const columnClass = keyType === 'Array' ? 'is-full' : 'is-two-thirds';
  const isMappingDataKey =
    keyType === 'Mapping' || keyType === 'MappingWithGrouping';

  return (
    <details
      className={`${styles.dataKeyBox} content my-3 p-3 is-open`}
      key={data.key}
      open
    >
      <summary className="has-text-weight-semibold is-clickable">
        <div className="title is-4">
          {schema.name in SchemaName ? (
            <a
              href={SCHEMA_DOCS_LINKS[schema.name]}
              target="_blank"
              rel="noopener noreferrer"
              className="home-link"
            >
              {schema.name} ↗️
            </a>
          ) : (
            schema.name
          )}

          <span className="tag is-small mx-2 is-info">{keyType}</span>
        </div>
      </summary>
      <div className="columns is-multiline">
        <div className={`column ${columnClass}`}>
          <CollapsibleSchema schema={schema} />
          <ul>
            <li>
              <strong>Key:</strong> <code>{key}</code>
            </li>
            <li>
              <strong>Raw value: </strong>
              <span className="tag is-small mx-2 is-link is-light">
                {valueType}
              </span>
              <code>{value}</code>
            </li>
            <li>
              <strong>Value Content: </strong>
              <span className="tag is-small is-link is-light">
                {valueContent}
              </span>
            </li>
            {isMappingDataKey && (
              <li>
                Mapped value:{' '}
                <code>{(schema as DynamicNameSchema).dynamicKeyParts}</code>{' '}
              </li>
            )}
            <li>
              <strong>Decoded value: </strong>
              <span className="my-3 mr-3">
                <ValueTypeDecoder
                  address={address}
                  erc725JSONSchema={schema}
                  value={data.value}
                />
              </span>
            </li>
          </ul>
        </div>
        <div className="column">
          {keyType !== 'Array' &&
            value !== '0x' &&
            valueContent === 'Address' && (
              <AddressButtons
                showInspectButton={true}
                address={value as string}
              />
            )}
        </div>
      </div>
    </details>
  );
};

export default DataKeyBox;
