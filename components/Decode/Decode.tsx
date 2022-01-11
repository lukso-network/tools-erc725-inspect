import { Alert, Box, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextareaAutosize, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Transaction, TRANSACTION_PARAMETERS, TRANSACTION_SELECTORS, TRANSACTION_TYPES } from "../../interfaces/transaction";

interface Props {
    web3: Web3;
}

const Decode: React.FC<Props> = ({web3}) => {
    const [transactionData, setTransactionData] = useState<Transaction | null>(null);
    const [abiError, setABIError] = useState({ error: false, message: "" });

    const handleChange = (input: string) => {
        if (input.slice(0, 2) !== "0x") {
            setABIError({
                error: true,
                message: "Invalid payload. Missing `0x` prefix for hexadecimal",
              });
              return;
        }

        let selector = input.slice(2, 10);
        let payload = input.slice(10);

        let transaction: Transaction;

        switch (selector) {
            case (TRANSACTION_SELECTORS.SET_DATA): {
                const result = web3.eth.abi.decodeParameters(TRANSACTION_PARAMETERS.SET_DATA, payload);

                transaction = {
                    type: TRANSACTION_TYPES.SET_DATA,
                    data: {
                        keys: result[0],
                        values: result[1]
                    }
                }
                
                break;
            }
            case (TRANSACTION_SELECTORS.EXECUTE): {
                const result = web3.eth.abi.decodeParameters(TRANSACTION_PARAMETERS.EXECUTE, payload);

                transaction = {
                    type: TRANSACTION_TYPES.EXECUTE,
                    data: {
                        operation: result[0],
                        recipient: result[1],
                        amount: result[2],
                        data: result[3] ? result[3] : '0x'
                    }
                }

                break;
            }
            case (TRANSACTION_SELECTORS.TRANSFER_OWNERSHIP): {
                const result = web3.eth.abi.decodeParameters(TRANSACTION_PARAMETERS.TRANSFER_OWNERSHIP, payload);

                transaction = {
                    type: TRANSACTION_TYPES.TRANSFER_OWNERSHIP,
                    data: {
                        newOwner: result[0]
                    }
                }

                break;
            }
            default: {
                setABIError({
                    error: true,
                    message: "Unrecognised ERC725 transaction selector",
                  });
                return;
            }
        }

        setABIError({ error: false, message: "" });
        setTransactionData(transaction as Transaction);
    }

    return (<>
        <TextareaAutosize
            minRows={8}
            maxRows={8}
            placeholder="Paste your abi here..."
            onChange={(e) => handleChange(e.target.value as string)}
        />

        {abiError.error ? <Alert severity="error">{abiError.message}</Alert> : ""}

        <div>{transactionData?.type}</div>
        <ul>{transactionData?.data ? 
            Object.keys(transactionData?.data).map(function(keyName, keyIndex) {
                return (
                    <li key={keyName}>
                        {keyName}: {transactionData?.data[keyName]}
                    </li>
                )
            }) : null}
	    </ul>
    </>);
}


export default Decode;
