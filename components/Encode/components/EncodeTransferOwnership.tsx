import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Web3 from "web3";
import EncodedPayload from "./EncodedPayload";

// import SaveIcon from "@material-ui/icons/Save";

interface Props {
    web3: Web3;
    erc725Account: any
}

const EncodeTransferOwnership: React.FC<Props> = ({web3, erc725Account}) => {
    const [newOwner, setNewOwner] = useState("");
    const [encodedPayload, setEncodedPayload] = useState("");


    return (
        <>
            <TextField
                label="New owner"
                value={newOwner}
                fullWidth
                onChange={(event) => setNewOwner(event.target.value)}
            />
            <div
                style={{ height: 300, width: "100%", marginBottom: 10, marginTop: 10 }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                        setEncodedPayload(
                            newOwner
                        );
                    }}
                >
                    Encode ABI
                </Button>

                {encodedPayload ? <EncodedPayload encodedPayload={encodedPayload} /> : null}
            </div>
        </>
    )
}

export default EncodeTransferOwnership;