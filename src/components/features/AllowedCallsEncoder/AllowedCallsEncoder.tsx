import React, { useEffect, useMemo, useState } from 'react';
import { isAddress, zeroAddress } from 'viem';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';
import ERC725, { ERC725JSONSchema } from '@erc725/erc725.js';
const { encodeAllowedCalls } = require('@lukso/lsp-utils');

import CollapsibleSchema from '@/components/ui/CollapsibleSchema';
import ToolInfos from '@/components/layout/ToolInfos';
import CodeEditor from '@/components/ui/CodeEditor';

import { LSP_DOCS_URL } from '@/constants/links';
import { computeCallTypeBits, isBytes4Hex } from '@/utils/encoding';
import { CallType } from '@/types/erc725js';
import ButtonCallType from '@/components/ui/ButtonCallType';

const AllowedCallsSchema: ERC725JSONSchema | undefined = LSP6Schema.find(
    (schema) => schema.name.startsWith('AddressPermissions:AllowedCalls:'),
);

const AllowedCallsEncoder: React.FC = () => {
    const [controllerAddress, setControllerAddress] = useState('');
    const [encodedAllowedCall, setEncodedAllowedCall] = useState<`0x${string}`>('0x');

    // Display of data key / value pair
    const [encodedDataKeyValues, setEncodedDataKeyValues] =
        useState<{ key: string; value: string } | string>();

    // Row 1: Allowed call types
    const [allowedCallTypes, setAllowedCallTypes] = useState<
        Record<CallType, boolean>
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
    const [allowedStandardsValue, setAllowedStandardsValue] = useState<`0x${string}`>('0x');

    // Row 3: Allowed Address
    const [allowedAddressMode, setAllowedAddressMode] = useState<
        'any' | 'custom'
    >('any');
    const [allowedAddressValue, setAllowedAddressValue] = useState<`0x${string}`>('0x');

    // Row 4: Allowed Function
    const [allowedFunctionMode, setAllowedFunctionMode] = useState<
        'any' | 'custom'
    >('any');
    const [allowedFunctionValue, setAllowedFunctionValue] = useState<`0x${string}`>('0x');

    const allowedValuesToEncode = useMemo(() => {

        const allowedAddressToEncode =
            allowedAddressMode === 'any'
                ? '0xffffffffffffffffffffffffffffffffffffffff'
                : isAddress(allowedAddressValue) ? allowedAddressValue : zeroAddress;

        const allowedStandardToEncode =
            allowedStandardsMode === 'any'
                ? '0xffffffff'
                : isBytes4Hex(allowedStandardsValue) ? allowedStandardsValue : '0x00000000';

        const allowedFunctionToEncode =
            allowedFunctionMode === 'any'
                ? '0xffffffff'
                : isBytes4Hex(allowedFunctionValue) ? allowedFunctionValue : '0x00000000';

        const callTypeBitsAsHex = computeCallTypeBits(allowedCallTypes);

        return {
            allowedAddressToEncode,
            allowedStandardToEncode,
            allowedFunctionToEncode,
            callTypeBitsAsHex,
        };
    }, [
        allowedAddressMode,
        allowedAddressValue,
        allowedCallTypes,
        allowedFunctionMode,
        allowedFunctionValue,
        allowedStandardsMode,
        allowedStandardsValue,
    ]);

    useEffect(() => {
        if (!AllowedCallsSchema) {
            console.warn('Internal error: AddressPermissions:AllowedCalls schema not found');
            setEncodedAllowedCall('0x');
            return;
        }

        const {
            callTypeBitsAsHex,
            allowedAddressToEncode,
            allowedStandardToEncode,
            allowedFunctionToEncode,
        } = allowedValuesToEncode;

        try {
            const encodedAllowedCall = encodeAllowedCalls(
                [callTypeBitsAsHex],
                [allowedAddressToEncode],
                [allowedStandardToEncode],
                [allowedFunctionToEncode],
            )

            setEncodedAllowedCall(encodedAllowedCall as `0x${string}`);

        } catch (error) {
            console.error('Error encoding allowed calls:', error);
            // Set empty result on error to indicate invalid configuration
            setEncodedAllowedCall('0x');
        }
    }, [allowedValuesToEncode, AllowedCallsSchema]);

    const handleEncodeDataKeyValue = () => {
        if (!controllerAddress || !encodedAllowedCall) {
            alert('Please enter a controller address and encoded allowed call');
            return;
        }

        if (!AllowedCallsSchema) {
            alert('Internal error: AddressPermissions:AllowedCalls schema not found');
            return;
        }

        try {
            const {
                callTypeBitsAsHex,
                allowedAddressToEncode,
                allowedStandardToEncode,
                allowedFunctionToEncode,
            } = allowedValuesToEncode;

            const result = ERC725.encodeData(
                [
                    {
                        keyName: 'AddressPermissions:AllowedCalls:<address>',
                        dynamicKeyParts: controllerAddress,
                        value: [
                            [
                                callTypeBitsAsHex, // CALL only
                                allowedAddressToEncode,
                                allowedStandardToEncode,
                                allowedFunctionToEncode,
                            ],
                        ] as any // TODO: there is a bug in the typing of erc725.js,
                    },
                ],
                [AllowedCallsSchema]
            );

            setEncodedDataKeyValues({
                key: result.keys[0],
                value: result.values[0],
            });
        } catch (error) {
            alert(`Error encoding allowed calls: ${error}`);
        }
    }

    const handleCallTypeToggle = (type: string) => {
        const updatedCallTypes = {
            ...allowedCallTypes,
            [type]: !allowedCallTypes[type],
        };

        setAllowedCallTypes(updatedCallTypes);
    };

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
                    <button className="button is-primary" type="button" onClick={handleEncodeDataKeyValue} disabled={!controllerAddress || !encodedAllowedCall}>
                        Encode Data Key / Value
                    </button>
                    {encodedDataKeyValues && (
                        <div className="mt-4">
                            <h6 className="title is-6">Encoded Result:</h6>
                            <CodeEditor
                                sourceCode={JSON.stringify(
                                    encodedDataKeyValues,
                                    null,
                                    2,
                                )}
                                readOnly
                            />
                        </div>
                    )}
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
                                        {Object.keys(allowedCallTypes).map((type) => (
                                            <ButtonCallType
                                                key={type}
                                                callType={type as CallType}
                                                isActive={allowedCallTypes[type as CallType]}
                                                onClick={() => handleCallTypeToggle(type as CallType)}
                                            />
                                        ))}
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
                                                onClick={() => {
                                                    setAllowedAddressMode('any');
                                                }}
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
                                                onClick={() => {
                                                    setAllowedAddressMode('custom')
                                                }}
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
                                                    onChange={(e) => {
                                                        // Allow incremental typing - always update state
                                                        setAllowedAddressValue(e.target.value as `0x${string}`)
                                                    }}
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
                                                onClick={() => {
                                                    setAllowedStandardsMode('any');
                                                }}
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
                                                onClick={() => {
                                                    setAllowedStandardsMode('custom')
                                                }}
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
                                                    onChange={(e) => {
                                                        // Allow incremental typing - always update state
                                                        setAllowedStandardsValue(e.target.value as `0x${string}`)
                                                    }}
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
                                                onClick={() => {
                                                    setAllowedFunctionMode('any');
                                                }}
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
                                                onClick={() => {
                                                    setAllowedFunctionMode('custom');
                                                }}
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
                                                    onChange={(e) => {
                                                        // Allow incremental typing - always update state
                                                        setAllowedFunctionValue(e.target.value as `0x${string}`)
                                                    }}
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
