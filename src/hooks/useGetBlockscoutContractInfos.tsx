import { NetworkContext } from "@/contexts/NetworksContext";
import { AddressDocument } from "@/generated/graphql";
import { useQuery } from "@tanstack/react-query";
import request from 'graphql-request';
import { useContext, useEffect, useState } from "react";
import { isAddress } from "viem";

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
        queryKey: ['blockscout_data', address],
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