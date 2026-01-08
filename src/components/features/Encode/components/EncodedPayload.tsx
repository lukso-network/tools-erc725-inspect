import React, { useEffect, useState } from 'react';
import styles from './EncodedPayload.module.scss';
interface Props {
  encodedPayload: string;
}

const EncodedPayload: React.FC<Props> = ({ encodedPayload }) => {
  const [isTextCopied, setIsTextCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(encodedPayload);
    setIsTextCopied(true);
  };

  useEffect(() => {
    setIsTextCopied(false);
  }, [encodedPayload]);

  const copyText = isTextCopied ? 'Copied!' : 'Copy to Clipboard';

  return (
    <div className="container">
      <div className="is-flex is-align-items-center">
        <p className="my-2 has-text-weight-bold">Encoded Payload:</p>
        <button
          className="button is-small is-info ml-2"
          onClick={handleClick}
          type="button"
        >
          {copyText}
        </button>
      </div>
      <div>
        <pre className={`is-family-code ${styles.codeBox}`}>
          {encodedPayload}
        </pre>
      </div>
    </div>
  );
};

export default EncodedPayload;
