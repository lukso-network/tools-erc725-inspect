import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

import { json as jsonLang } from '@codemirror/lang-json';
import { githubLight } from '@uiw/codemirror-theme-github';
import { EditorView } from '@codemirror/view';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), {
  ssr: false,
});

type CodeEditorProps = {
  sourceCode: string;
  readOnly?: boolean;
  handleChange?: (value: string) => void;
};

const CodeEditor = ({
  sourceCode,
  handleChange,
  readOnly,
}: CodeEditorProps) => {
  // Don't recreate on every render
  const codeEditorJsonExtension = useMemo(() => jsonLang(), []);

  const codeEditorExtensions = useMemo(
    () => [codeEditorJsonExtension, EditorView.lineWrapping],
    [codeEditorJsonExtension],
  );

  return (
    <CodeMirror
      value={sourceCode}
      theme={githubLight}
      readOnly={readOnly}
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
      }}
      extensions={codeEditorExtensions} // JSON syntax highlighting
      onChange={handleChange && ((val) => handleChange(val))}
      style={{ width: '100%' }}
    />
  );
};

export default CodeEditor;
