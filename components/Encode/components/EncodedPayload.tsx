import React, { useState } from "react";
import { Grid, Box, Typography, Tooltip } from "@mui/material";
import Web3 from "web3";

interface Props {
  encodedPayload: string
}

const EncodedPayload: React.FC<Props> = ({ encodedPayload }) => {

  return (
    <>
      <Grid item component={Box} paddingLeft="15px" paddingRight="15px">
        <Box
          component="button"
          fontFamily="inherit"
          fontSize="16px"
          fontWeight="400"
          lineHeight="1.25"
          display="inline-block"
          width="80%"
          margin=".5rem 0"
          padding="24px"
          textAlign="left"
          border="0"
          borderRadius="4px"
          data-clipboard-text="album-2"
          type="button"
        >
          <div>
            <Typography style={{ wordWrap: "break-word" }}>
              {encodedPayload}
            </Typography>
          </div>
        </Box>
      </Grid>
    </>
  )
}

export default EncodedPayload;