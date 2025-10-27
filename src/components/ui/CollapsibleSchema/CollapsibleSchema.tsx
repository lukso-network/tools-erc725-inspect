import { ERC725JSONSchema } from '@erc725/erc725.js';
import React from 'react';
import CodeEditor from '../CodeEditor';

type CollapsibleSchemaProps = {
  schema: ERC725JSONSchema;
};

const CollapsibleSchema: React.FC<CollapsibleSchemaProps> = ({ schema }) => (
  <details className="has-background-link-light p-2 is-clickable m-4 is-size-6 has-text-weight-light">
    <summary className="has-text-weight-semibold">
      See LSP2 JSON Schema of <code>{schema.name}</code>
    </summary>
    <CodeEditor sourceCode={JSON.stringify(schema, null, 4)} readOnly={true} />
  </details>
);

export default CollapsibleSchema;
