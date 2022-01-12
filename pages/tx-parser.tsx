import { Box, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Decode from "../components/Decode";
import Encode from "../components/Encode";
import NavBar from "../components/NavBar";
import useWeb3 from "../hooks/useWeb3";

enum TX_PARSER_MODES {
    ENODE = 'ENCODE',
    DECODE = 'DECODE'
}

const DEFAULT_MODE = TX_PARSER_MODES.ENODE;

const Home: NextPage = () => {
    const router = useRouter();
    const web3 = useWeb3();
    const [mode, setMode] = useState(DEFAULT_MODE);

    return (
        <>
            <NavBar />
            <Box
                sx={{
                    bgcolor: "background.paper",
                    pt: 8,
                    pb: 6,
                }}>

                <Container >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Mode</FormLabel>
                        <RadioGroup row aria-label="mode" name="row-radio-buttons-group" defaultValue={DEFAULT_MODE} onChange={(e) => setMode(e.target.value as TX_PARSER_MODES)}>
                            <FormControlLabel value={TX_PARSER_MODES.ENODE} control={<Radio />} label="Encode" />
                            <FormControlLabel value={TX_PARSER_MODES.DECODE} control={<Radio />} label="Decode" />
                        </RadioGroup>
                    </FormControl>
                </Container>

                <Container>
                    {mode === TX_PARSER_MODES.ENODE ? (<Encode web3={web3} />) : null}
                    {mode === TX_PARSER_MODES.DECODE ? (<Decode web3={web3} />) : null}
                </Container>

            </Box>
        </>
    )
}

export default Home;
