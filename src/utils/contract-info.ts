import {
  Address,
  createPublicClient,
  decodeAbiParameters,
  Hex,
  http,
  parseAbiParameters,
} from 'viem';
import { INetwork } from '@/types/network';

// utils
import { getChainByNetworkName } from '@/config/wagmi';

// constants
import { versionAbi } from '@/constants/abi';
import { GNOSIS_SAFE, GNOSIS_SAFE_PROXY_BYTECODE, MINIMAL_PROXY_RUNTIME_BYTECODE_PREFIX, MINIMAL_PROXY_RUNTIME_BYTECODE_SUFFIX } from '@/constants/contracts';

export async function isGnosisSafeProxy(
  address: string,
  network: INetwork,
): Promise<{ isGnosisSafe: boolean; version?: string }> {
  const publicClient = createPublicClient({
    chain: getChainByNetworkName(network.name),
    transport: http(network.rpcUrl),
  });

  const codeAt = await publicClient.getCode({
    address: address as Address,
  });

  if (codeAt !== GNOSIS_SAFE_PROXY_BYTECODE) {
    return { isGnosisSafe: false };
  }

  // in the Solidity code of the Gnosis Safe proxy, the address of the singleton (= implementation)
  // is always the first declared variable. This variable is set to `internal` and does not have a getter
  // to reduce deployment costs.
  //
  // example: https://explorer.execution.mainnet.lukso.network/address/0x14C2041eD166e00A8Ed2adad8c9C7389b3Dd87fb?tab=contract
  const valueAtStorageSlot0 = await publicClient.getStorageAt({
    address: address as Address,
    slot: '0x0',
  });

  if (!valueAtStorageSlot0) {
    return { isGnosisSafe: false };
  }

  const [implementationAddress] = decodeAbiParameters(
    parseAbiParameters('address'),
    valueAtStorageSlot0,
  );

  const safeImplementation = GNOSIS_SAFE.find(
    (safeVersion) => safeVersion.address === implementationAddress,
  );

  if (!safeImplementation) {
    return { isGnosisSafe: false };
  }

  return {
    isGnosisSafe: true,
    version: safeImplementation.version,
  };
}

export const getVersion = async (
  address: string,
  network: INetwork,
): Promise<string> => {
  const publicClient = createPublicClient({
    chain: getChainByNetworkName(network.name),
    transport: http(network.rpcUrl),
  });

  try {
    const result = await publicClient.readContract({
      address: address as Address,
      abi: versionAbi,
      functionName: 'VERSION',
    });
    if (result === '') {
      return 'unknown';
    }
    return result;
  } catch (error) {
    console.warn(
      'Could not fetch smart contract version for contract at address ',
      address,
    );
    return 'unknown';
  }
};

export async function isMinimalProxyContract(
  address: string,
  network: INetwork,
): Promise<boolean> {
  const publicClient = createPublicClient({
    chain: getChainByNetworkName(network.name),
    transport: http(network.rpcUrl),
  });

  const bytecode = await publicClient.getCode({
    address: address as Address,
  });

  if (!bytecode || bytecode === '0x') return false;

  return isMinimalProxyBytecode(bytecode);
}

export function isMinimalProxyBytecode(bytecode: string): boolean {
  if (!bytecode) {
    return false;
  }

  const normalizedBytecode = bytecode.toLowerCase();

  return normalizedBytecode.startsWith(MINIMAL_PROXY_RUNTIME_BYTECODE_PREFIX) && normalizedBytecode.endsWith(MINIMAL_PROXY_RUNTIME_BYTECODE_SUFFIX);
}

export function extractImplementationAddressFromMinimalProxyBytecode(
  bytecode: Hex,
): string | null {
  if (!isMinimalProxyBytecode(bytecode)) return null;
  
  const implementationHex = bytecode.slice(
    MINIMAL_PROXY_RUNTIME_BYTECODE_PREFIX.length,
    bytecode.length - MINIMAL_PROXY_RUNTIME_BYTECODE_SUFFIX.length,
  );

  if (implementationHex.length !== 40) return null;

  return `0x${implementationHex}`;
}
