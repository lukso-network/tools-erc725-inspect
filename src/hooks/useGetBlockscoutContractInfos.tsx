import { NetworkContext } from "@/contexts/NetworksContext";
import { AddressDocument } from "@/generated/graphql";
import { useQuery } from "@tanstack/react-query";
import request from 'graphql-request';
import { useContext, useEffect, useState } from "react";
import { isAddress } from "viem";
import { extractImplementationAddressFromMinimalProxyBytecode, isMinimalProxyBytecode, isMinimalProxyContract } from "@/utils/contract-info";

export type BlockscoutContractInfosResult = {
    isContract: boolean;
    contractName: string | undefined;
    abi: any[] | undefined;
}

export function useGetBlockscoutContractInfos(address: string): BlockscoutContractInfosResult {
    const { network } = useContext(NetworkContext);

    const [isContract, setIsContract] = useState(false);
    const [contractName, setContractName] = useState<string>();
    const [abi, setAbi] = useState([]);

    const result = useQuery({
        queryKey: ['blockscout_data', address, network?.name],
        queryFn: async () => {
            if (!network || !isAddress(address)) return null;

            const { address: blockscoutData } = await request(
            network.explorerBaseUrl
              ? network.explorerBaseUrl.endsWith('/')
                ? `${network.explorerBaseUrl}api/v1/graphql`
                : `${network.explorerBaseUrl}/api/v1/graphql`
              : 'https://explorer.execution.mainnet.lukso.network/api/v1/graphql',
            AddressDocument,
            {
              address,
            },
          );

          console.log("blockscout data: ", blockscoutData)

          // Detect if the contract is a minimal proxy. If it is extract implementation address from the bytecode.
          if (!isMinimalProxyBytecode(blockscoutData?.contractCode)) return blockscoutData;

          const implementationAddress = extractImplementationAddressFromMinimalProxyBytecode(
            blockscoutData?.contractCode,
          );

          if (implementationAddress && isAddress(implementationAddress)) {
            const { address: blockscoutDataImplementation } = await request(
                network.explorerBaseUrl
                  ? network.explorerBaseUrl.endsWith('/')
                    ? `${network.explorerBaseUrl}api/v1/graphql`
                    : `${network.explorerBaseUrl}/api/v1/graphql`
                  : 'https://explorer.execution.mainnet.lukso.network/api/v1/graphql',
                AddressDocument,
                {
                    address: implementationAddress,
                },
              );
              return blockscoutDataImplementation;
          }

          return blockscoutData;
        },
      });

    useEffect(() => {
        if (result.data?.contractCode && typeof result.data.contractCode === 'string') {
            setIsContract(result.data.contractCode.length > 0);
          }
          if (
            result.data?.smartContract?.name &&
            typeof result.data.smartContract.name === 'string'
          ) {
            setContractName(result.data.smartContract.name);
          }
          if (
            result.data?.smartContract?.abi &&
            typeof result.data.smartContract.abi === 'string'
          ) {
            setAbi(JSON.parse(result.data.smartContract.abi));
          }

    }, [result])

    return {
        isContract,
        contractName,
        abi,
    };

}