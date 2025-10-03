// components/ToolInfos.tsx
import React from 'react';
import { ERC725JS_DOCS, NPM_URL } from '@/constants/links';
import { Erc725JsMethod } from '@/types/erc725js';

interface ToolInfosProps {
  description: string | React.ReactNode;
  erc725jsMethod: Erc725JsMethod | Erc725JsMethod[];
}

// Display pattern: `getData(…)`, `fetchData(…)` and `decodeData(…)`
const ListFunctions: React.FC<{ methods: Erc725JsMethod[] }> = ({
  methods,
}) => {
  return (
    <>
      {methods.map((method, index) => {
        const link = ERC725JS_DOCS[method];
        const isLast = index === methods.length - 1;
        const isSecondLast = index === methods.length - 2;

        return (
          <span key={method}>
            <a href={link} target="_blank" rel="noreferrer">
              <code>{method}(…)</code>
            </a>
            {/*
             * if it's the last item = just display a space: `[...] decodeData(…)`
             * if it's the second last item = display ' and ': `[...] fetchData(…) and decodeData(…)`
             * else display a comma separator: `getData(…), fetchData(…) [...]`
             */}
            {isSecondLast ? ' and ' : isLast ? ' ' : ', '}
          </span>
        );
      })}
    </>
  );
};

const ToolInfos: React.FC<ToolInfosProps> = ({
  description,
  erc725jsMethod,
}) => {
  const methods = Array.isArray(erc725jsMethod)
    ? erc725jsMethod
    : [erc725jsMethod];

  return (
    <article className="message is-info content">
      <div className="message-body">
        <p>{description}</p>

        <p>
          It uses the <ListFunctions methods={methods} />
          function{methods.length > 1 && 's'} of the{' '}
          <a href={NPM_URL.erc725js} target="_blank" rel="noreferrer">
            erc725.js
          </a>{' '}
          library.
        </p>
      </div>
    </article>
  );
};

export default ToolInfos;
