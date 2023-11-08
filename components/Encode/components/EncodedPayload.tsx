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

  const tooltipText = isTextCopied ? 'Copied!' : 'Copy to Clipboard';

  return (
    <div className="container">
      <div className="notification">{tooltipText}</div>
      <button className="button is-light" onClick={handleClick} type="button">
        <p className={`is-family-code ${styles.codeBox}`}>{encodedPayload}</p>
      </button>
    </div>
  );
};

export default EncodedPayload;
