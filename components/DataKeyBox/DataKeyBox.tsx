import { ERC725JSONSchema } from '@erc725/erc725.js';

import { SCHEMA_DOCS_LINKS, SchemaName } from './schemas';

import CodeEditor from '../CodeEditor';

import AddressButtons from '@/components/AddressButtons';
import ValueTypeDecoder from '@/components/ValueTypeDecoder';

type DataKeyBoxProps = {
  address: string;
  data: {
    key: string;
    value: string | string[];
    schema: ERC725JSONSchema;
  };
};

const DataKeyBox = ({ address, data }: DataKeyBoxProps) => {
  return (
    <div className="column is-full mt-4 dataKeyBox" key={data.key}>
      <div className="content">
        <div className="title is-4">
          {data.schema.name in SchemaName ? (
            <a
              href={SCHEMA_DOCS_LINKS[data.schema.name]}
              target="_blank"
              rel="noopener noreferrer"
              className="home-link"
            >
              {data.schema.name} ↗️
            </a>
          ) : (
            data.schema.name
          )}

          <span className="tag is-small mx-2 is-info">
            {data.schema.keyType}
          </span>
        </div>
        <details className="has-background-link-light p-2 is-clickable m-4 is-size-6 has-text-weight-light">
          <summary className="has-text-weight-semibold">
            See LSP2 JSON Schema of <code>{data.schema.name}</code>
          </summary>
          <CodeEditor
            sourceCode={JSON.stringify(data.schema, null, 4)}
            readOnly={true}
          />
        </details>
        <ul>
          <li>
            <strong>Key:</strong> <code>{data.schema.key}</code>
          </li>
          <li>
            <strong>Raw value: </strong>
            <span className="tag is-small mx-2 is-link is-light">
              {data.schema.valueType}
            </span>
            <code>{data.value}</code>
          </li>
          <li>
            <strong>Value Content: </strong>
            <span className="tag is-small is-link is-light">
              {data.schema.valueContent}
            </span>
          </li>
          <li>
            <strong>Decoded value: </strong>
            <span className="my-3 mr-3">
              <ValueTypeDecoder
                address={address}
                erc725JSONSchema={data.schema}
                value={data.value}
              />
            </span>
          </li>
          {data.schema.keyType === 'MappingWithGrouping' && (
            <li>
              Mapped address: <code>0x{data.schema.name.split(':').pop()}</code>{' '}
              <AddressButtons
                address={`0x${data.schema.name.split(':').pop()}`}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DataKeyBox;
