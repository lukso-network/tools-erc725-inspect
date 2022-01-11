import { Grid, MenuItem, InputLabel, Select, TextField, Button } from "@mui/material";
import { useState } from "react";
import Web3 from "web3";
import EncodedPayload from "./EncodedPayload";

interface Props {
    web3: Web3;
    erc725Account: any
}

const EncodeExecute: React.FC<Props> = ({ web3 }) => {
    const [encodedPayload, setEncodedPayload] = useState("");
    const [operation, setOperation] = useState("0");
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [data, setData] = useState("");

    return (
        <>
            <Grid container justifyContent="center">
                <Grid item md={12}>
                    <InputLabel id="demo-simple-select-label">Operation</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={operation}
                        onChange={(event) => setOperation(event.target.value)}
                    >
                        <MenuItem value={"0"}>CALL</MenuItem>
                        <MenuItem value={"1"}>CREATE</MenuItem>
                        <MenuItem value={"2"}>CREATE2</MenuItem>
                        <MenuItem value={"3"}>STATICCALL</MenuItem>
                        <MenuItem value={"4"}>DELEGATECALL</MenuItem>
                    </Select>
                </Grid>
                <Grid item md={12}>
                    <TextField
                        label="Recipient"
                        value={recipient}
                        fullWidth
                        onChange={(event) => {
                            let input = event.target.value;
                            setRecipient(input);
                        }}
                    />
                </Grid>
                <Grid item md={12}>
                    <TextField
                        label="Amount"
                        value={amount}
                        fullWidth
                        onChange={(event) => {
                            let input = event.target.value;
                            setAmount(input);
                        }}
                    />
                </Grid>
                <Grid item md={12}>
                    <TextField
                        label="Data"
                        value={data}
                        fullWidth
                        onChange={(event) => {
                            let input = event.target.value;
                            setData(input);
                        }}
                    />
                </Grid>
            </Grid>
            <div
                style={{ height: 300, width: "100%", marginBottom: 10, marginTop: 10 }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                        // let weiAmount = web3.utils.toWei(amount);
                        setEncodedPayload(
                            // account.methods
                            //   .execute(operation, recipient, weiAmount, data)
                            //   .encodeABI()
                            '0x'
                        );
                    }}
                >
                    Encode ABI
                </Button>
                {encodedPayload ? <EncodedPayload encodedPayload={encodedPayload} /> : null}
            </div>
        </>
    );
}

export default EncodeExecute;