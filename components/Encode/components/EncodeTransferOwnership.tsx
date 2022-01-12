import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Web3 from "web3";
import EncodedPayload from "./EncodedPayload";
import ERC725Account from "../../../abis/ERC725Account.json"
import ErrorMessage from "../../ErrorMessage";

interface Props {
    web3: Web3;
}

const EncodeTransferOwnership: React.FC<Props> = ({ web3 }) => {
    const [newOwner, setNewOwner] = useState("");
    const [encodedPayload, setEncodedPayload] = useState("");
    const [encodingError, setEncodingError] = useState({ isError: false, message: "" });


    const encodeABI = () => {
        const erc725Account = new web3.eth.Contract(ERC725Account.abi as any);

        try {
            setEncodedPayload(
                erc725Account.methods
                    .transferOwnership(newOwner)
                    .encodeABI()
            );

            setEncodingError({ isError: false, message: '' });
        } catch (error) {
            setEncodingError({ isError: true, message: error.message });
            setEncodedPayload('')
        }
    }

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
                    onClick={encodeABI}
                >
                    Encode ABI
                </Button>

                {encodedPayload ? <EncodedPayload encodedPayload={encodedPayload} /> : null}
                {encodingError.isError ? <ErrorMessage header='ABI Encoding Error!' message={encodingError.message} /> : null}
            </div>
        </>
    )
}

export default EncodeTransferOwnership;