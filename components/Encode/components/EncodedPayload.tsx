import React, { useEffect, useState } from 'react';
import { Box, Tooltip } from '@mui/material';

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

  return (
    <div className="container">
      <Tooltip
        title={isTextCopied ? 'Copied!' : 'Copy To Clipboard'}
        placement="top"
      >
        <Box
          component="button"
          onClick={handleClick}
          width="100%"
          margin=".5rem 0"
          padding="24px"
          textAlign="left"
          border="0"
          borderRadius="4px"
          data-clipboard-text="album-2"
          type="button"
        >
          <div
            className="is-family-code"
            style={{ cursor: 'pointer', overflowWrap: 'break-word' }}
          >
            {encodedPayload}
          </div>
        </Box>
      </Tooltip>
    </div>
  );
};

export default EncodedPayload;
