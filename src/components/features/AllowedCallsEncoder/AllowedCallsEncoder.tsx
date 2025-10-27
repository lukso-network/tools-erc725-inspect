import React, { useState } from 'react';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import { hexToBigInt, pad, toHex } from 'viem';
import { CALLTYPE } from '@lukso/lsp-smart-contracts';

import CollapsibleSchema from '@/components/ui/CollapsibleSchema';
import ToolInfos from '@/components/layout/ToolInfos';

import { LSP_DOCS_URL } from '@/constants/links';
import ERC725, { ERC725JSONSchema } from '@erc725/erc725.js';

const AllowedCallsSchema: ERC725JSONSchema | undefined = LSP6Schema.find(
    (schema) => schema.name.startsWith('AddressPermissions:AllowedCalls:'),
);

const AllowedCallsEncoder: React.FC = () => {
    const [controllerAddress, setControllerAddress] = useState('');
    const [encodedAllowedCall, setEncodedAllowedCall] = useState<`0x${string}`>('0x');

    // Row 1: Allowed call types
    const [allowedCallTypes, setAllowedCallTypes] = useState<
        Record<string, boolean>
    >({
        VALUE: false,
        CALL: false,
        STATICCALL: false,
        DELEGATECALL: false,
    });

    // Row 2: Allowed Standards (interface IDs)
    const [allowedStandardsMode, setAllowedStandardsMode] = useState<
        'any' | 'custom'
    >('any');
    const [allowedStandardsValue, setAllowedStandardsValue] = useState<`0x${string}`>('0x00000002');

    // Row 3: Allowed Address
    const [allowedAddressMode, setAllowedAddressMode] = useState<
        'any' | 'custom'
    >('any');
    const [allowedAddressValue, setAllowedAddressValue] = useState<`0x${string}`>('0xffffffffffffffffffffffffffffffffffffffff');

    // Row 4: Allowed Function
    const [allowedFunctionMode, setAllowedFunctionMode] = useState<
        'any' | 'custom'
    >('any');
    const [allowedFunctionValue, setAllowedFunctionValue] = useState<`0x${string}`>('0xfffffff');

    // Function to compute bitwise OR of selected call types
    const computeCallTypeBits = (callTypes: Record<string, boolean>): string => {
        let result = hexToBigInt("0x00000000");

        // Convert hex strings to BigInt and perform bitwise OR
        Object.entries(callTypes).forEach(([type, isEnabled]) => {
            if (isEnabled && CALLTYPE[type as keyof typeof CALLTYPE]) {
                const hexValue = CALLTYPE[type as keyof typeof CALLTYPE];
                const value = hexToBigInt(hexValue);
                result = result | value;
            }
        });

        // Convert back to hex string with proper padding
        const hexResult = toHex(result);
        return pad(hexResult, { size: 4, dir: 'left' });
    };

    const handleCallTypeToggle = (type: string) => {
        const updatedCallTypes = {
            ...allowedCallTypes,
            [type]: !allowedCallTypes[type],
        };

        setAllowedCallTypes(updatedCallTypes);
    };

    const handleEncodingClick = () => {
        if (!controllerAddress || !encodedAllowedCall) {
            alert('Please enter a controller address and encoded allowed call');
            return;
        }

        if (!AllowedCallsSchema) {
            alert('AllowedCalls schema not found');
            return;
        }

        try {
            // Compute and log the result
            const callTypeBitsAsHex = computeCallTypeBits(allowedCallTypes);

            console.log('Selected call types:', allowedCallTypes);
            console.log('Call Type Bits as Hex (after bitwise OR):', callTypeBitsAsHex);

            const result = ERC725.encodeData(
                [
                    {
                        keyName: 'AddressPermissions:AllowedCalls:<address>',
                        dynamicKeyParts: controllerAddress,
                        value: [
                            [
                                callTypeBitsAsHex, // CALL only
                                allowedAddressValue,
                                allowedStandardsValue,
                                allowedFunctionValue,
                            ],
                        ] as any // TODO: there is a bug in the typing of erc725.js
                    },
                ],
                [AllowedCallsSchema],
            );

            console.log("result: ", result)
            setEncodedAllowedCall(result.values[0] as `0x${string}`);
        } catch (error) {
            console.error('Error encoding allowed calls:', error);
        }
    }

    return (
        <div className="container container-key-manager">
            <h2 className="title is-2">Allowed Calls</h2>
            <ToolInfos
                erc725jsMethod={['encodeData']}
                description={
                    <>
                        Encode{' '}
                        <a
                            href={`${LSP_DOCS_URL.LSP6}#allowed-calls`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            allowed calls
                        </a>{' '}
                        to restrict controllers to call only specific addresses, types of
                        contracts or functions on a target contract.
                        <br />
                        This feature provides fine grained control over a Universal
                        Profile using the{' '}
                        <a href={LSP_DOCS_URL.LSP6} target="_blank" rel="noreferrer">
                            LSP6 Key Manager
                        </a>{' '}
                        standard.
                    </>
                }
            />

            <div className="columns mx-1 p-4 has-background-light">
                <div className="column">
                    <h5 className="title is-5">Encoded Data Key / Value Allowed Calls</h5>
                    {AllowedCallsSchema && (
                        <CollapsibleSchema schema={AllowedCallsSchema} />
                    )}
                    <div className="field">
                        <label className="label is-normal">Controller Address</label>
                        <div className="control">
                            <input
                                className="input is-normal"
                                type="text"
                                placeholder="enter controller address"
                                value={controllerAddress}
                                onChange={(e) => setControllerAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label is-normal">Encoded Allowed Call</label>
                        <div className="control">
                            <textarea
                                className="textarea is-normal"
                                style={{ minHeight: '150px' }}
                                placeholder="select the configuration below to generate the bytes of the encoded allowed call"
                                value={encodedAllowedCall}
                            />
                        </div>
                    </div>
                </div>
                <div className="column">
                    <button className="button is-primary" type="button" onClick={handleEncodingClick}>
                        Encode Allowed Calls
                    </button>
                </div>
            </div>

            <div className="columns">
                <div className="column is-two-thirds">
                    <table className="table is-fullwidth mb-4">
                        <thead>
                            <tr>
                                <th>Restriction</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Row 1: Allowed call types */}
                            <tr>
                                <td>
                                    <strong className="mb-2">Allowed call types</strong>
                                </td>
                                <td>
                                    <div className="buttons">
                                        {Object.keys(allowedCallTypes).map((type) => {

                                            const btnClass = type === 'DELEGATECALL' ? 'is-red' : type === 'STATICCALL' ? 'is-blue' : 'is-yellow';
                                            const isOutlined = !allowedCallTypes[type] ? 'is-outlined' : '';

                                            return (
                                                // TODO: could be re-used as a component
                                                <button
                                                    key={type}
                                                    className={`button ${btnClass} ${isOutlined}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleCallTypeToggle(type);
                                                    }}
                                                >
                                                    {type}
                                                </button>
                                            )
                                        }
                                        )}
                                    </div>
                                </td>
                            </tr>

                            {/* Row 2: Allowed Address */}
                            <tr>
                                <td>
                                    <strong className="mb-2">Allowed Address</strong>
                                </td>
                                <td>
                                    <div className="field has-addons">
                                        <div className="control">
                                            <button
                                                className={`button ${allowedAddressMode === 'any'
                                                    ? 'is-info'
                                                    : 'is-info is-outlined'
                                                    }`}
                                                onClick={() => { setAllowedAddressMode('any'); setAllowedAddressValue('0xffffffffffffffffffffffffffffffffffffffff'); }}
                                            >
                                                Any
                                            </button>
                                        </div>
                                        <div className="control">
                                            <button
                                                className={`button ${allowedAddressMode === 'custom'
                                                    ? 'is-info'
                                                    : 'is-info is-outlined'
                                                    }`}
                                                onClick={() => setAllowedAddressMode('custom')}
                                            >
                                                Custom
                                            </button>
                                        </div>
                                        {allowedAddressMode === 'custom' && (
                                            <div className="control" style={{ width: '100%' }}>
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder="0x..."
                                                    value={allowedAddressValue}
                                                    onChange={(e) =>
                                                        setAllowedAddressValue(e.target.value as `0x${string}`)
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>

                            {/* Row 3: Allowed Standards (interface IDs) */}
                            <tr>
                                <td>
                                    <strong className="mb-2">
                                        Allowed Standards (interface IDs)
                                    </strong>
                                </td>
                                <td>
                                    <div className="field has-addons">
                                        <div className="control">
                                            <button
                                                className={`button ${allowedStandardsMode === 'any'
                                                    ? 'is-info'
                                                    : 'is-info is-outlined'
                                                    }`}
                                                onClick={() => { setAllowedStandardsMode('any'); setAllowedStandardsValue('0xffffffff'); }}
                                            >
                                                Any
                                            </button>
                                        </div>
                                        <div className="control">
                                            <button
                                                className={`button ${allowedStandardsMode === 'custom'
                                                    ? 'is-info'
                                                    : 'is-info is-outlined'
                                                    }`}
                                                onClick={() => setAllowedStandardsMode('custom')}
                                            >
                                                Custom
                                            </button>
                                        </div>
                                        {allowedStandardsMode === 'custom' && (
                                            <div className="control" style={{ width: '100%' }}>
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder="0x..."
                                                    value={allowedStandardsValue}
                                                    onChange={(e) =>
                                                        setAllowedStandardsValue(e.target.value as `0x${string}`)
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>



                            {/* Row 4: Allowed Function */}
                            <tr>
                                <td>
                                    <strong className="mb-2">Allowed Function</strong>
                                </td>
                                <td>
                                    <div className="field has-addons">
                                        <div className="control">
                                            <button
                                                className={`button ${allowedFunctionMode === 'any'
                                                    ? 'is-info'
                                                    : 'is-info is-outlined'
                                                    }`}
                                                onClick={() => { setAllowedFunctionMode('any'); setAllowedFunctionValue('0xfffffff'); }}
                                            >
                                                Any
                                            </button>
                                        </div>
                                        <div className="control">
                                            <button
                                                className={`button ${allowedFunctionMode === 'custom'
                                                    ? 'is-info'
                                                    : 'is-info is-outlined'
                                                    }`}
                                                onClick={() => { setAllowedFunctionMode('custom'); setAllowedFunctionValue('0xfffffff'); }}
                                            >
                                                Custom
                                            </button>
                                        </div>
                                        {allowedFunctionMode === 'custom' && (
                                            <div className="control" style={{ width: '100%' }}>
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder="0x..."
                                                    value={allowedFunctionValue}
                                                    onChange={(e) =>
                                                        setAllowedFunctionValue(e.target.value as `0x${string}`)
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllowedCallsEncoder;
