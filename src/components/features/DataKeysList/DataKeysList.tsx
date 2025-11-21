import React, { useContext, useEffect, useState } from 'react';
import { ERC725JSONSchema } from '@erc725/erc725.js';
import type { Hex } from 'viem';

// components
import DataKeyBox from '../../ui/DataKeyBox';

// LSP2 schemas
import {
  UniversalProfileNonDynamicSchemas,
  AssetNonDynamicSchemas,
  LSP8NonDynamicSchemas,
} from '@/constants/schemas';

// utilities
import { getDataBatch } from '@/utils/erc725y';
import { NetworkContext } from '@/contexts/NetworksContext';

interface Props {
  address: string;
  isErc725Y: boolean;
  isAsset: boolean;
  isLSP8: boolean;
}

const DataKeysList: React.FC<Props> = ({
  address,
  isErc725Y,
  isAsset,
  isLSP8,
}) => {
  const { network } = useContext(NetworkContext);

  const [data, setData] = useState<
    {
      key: string;
      value: string | string[];
      schema: ERC725JSONSchema;
    }[]
  >([]);

  useEffect(() => {
    const fetch = async () => {
      if (!network) return;

      if (!isErc725Y) return;

      const dataResult: {
        key: string;
        value: string;
        schema: ERC725JSONSchema;
      }[] = [];

      try {
        if (isErc725Y) {
          let schemaToLoad = isAsset
            ? AssetNonDynamicSchemas
            : UniversalProfileNonDynamicSchemas;

          if (isLSP8) {
            schemaToLoad = schemaToLoad.concat(LSP8NonDynamicSchemas);
          }

          const dataKeys = schemaToLoad.map((schema) => schema.key);

          const result = await getDataBatch(
            address,
            dataKeys as Hex[],
            network,
          );
          result.map((_, i) => {
            dataResult.push({
              key: dataKeys[i],
              value: result[i],
              schema: schemaToLoad[i],
            });
          });
        }
      } catch (err) {
        console.error(err);
      }

      setData(dataResult);
    };

    fetch();
  }, [address, network, isErc725Y, isAsset, isLSP8]);

  if (!network) return <p>error: could not load provider</p>;

  if (!address) {
    return <p>⬆️ enter the address of your UP</p>;
  }

  return (
    <div className="is-multiline">
      {/* Show Standard LSP Data Keys as first section */}
      <h3 className="title is-3 mt-6">LSP Standards Data Keys 🗄️</h3>
      <article className="columns mx-1 message is-info">
        <div className="message-body">
          <p>These are commonly used data keys from the LSP Standards</p>
        </div>
      </article>
      {data.map((data) => {
        return <DataKeyBox key={data.key} address={address} data={data} />;
      })}
    </div>
  );
};

export default DataKeysList;
