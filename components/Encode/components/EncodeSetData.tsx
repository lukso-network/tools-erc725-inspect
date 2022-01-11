import { Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import Web3 from "web3";
import EncodedPayload from "./EncodedPayload";

interface Props {
    web3: Web3;
    erc725Account: any
}

const EncodeSetData: React.FC<Props> = ({ web3 }) => {
    const [encodedPayload, setEncodedPayload] = useState("");
    // const [keys, setKeys] = useState([]);
    // const [values, setValues] = useState([]);
    const [keyValuePairs, setKeyValuePairs] = useState<{ key: string, value: string }[]>([{ key: '', value: '' }]);

    const createInputs = (keyValuePairs: { key: string, value: string }[]) => {
        return keyValuePairs.map((keyValuePair: { key: string, value: string }, index) => {
            return (
                <Grid container spacing={2} key={index}>
                    <Grid item xs={6}>
                        <TextField
                            label="Key"
                            value={keyValuePair.key}
                            fullWidth
                            id="key"
                            onChange={handleChange.bind(this, index)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Value"
                            value={keyValuePair.value}
                            fullWidth
                            id="value"
                            onChange={handleChange.bind(this, index)}
                        />
                    </Grid>
                    <Button onClick={removeKeyValue.bind(this, index)}>Remove</Button>
                </Grid>)
        })
    }

    const addKeyValue = () => {
        setKeyValuePairs([...keyValuePairs, { key: '', value: '' }])
    }

    const removeKeyValue = (index: number) => {
        let vals = [...keyValuePairs];
        console.log(vals);
        vals.splice(index, 1);
        setKeyValuePairs(vals);
    }

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target)
        let newKeyValuePairs = [...keyValuePairs];

        if (!event.target.id in newKeyValuePairs) {
            return;
        }

        newKeyValuePairs[index][event.target.id] = event.target.value;

        setKeyValuePairs(newKeyValuePairs);
    }

    return (
        <>
            {createInputs(keyValuePairs)}

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

                <Button onClick={addKeyValue}>
                    Add Key
                </Button>
                {encodedPayload ? <EncodedPayload encodedPayload={encodedPayload} /> : null}
            </div>
        </>
    )
}


export default EncodeSetData;