import React, { useEffect, useState } from 'react';
import { ERC725JSONSchema } from '@erc725/erc725.js';

// components
import DataKeyBox from '../../ui/DataKeyBox';

// LSP2 schemas
import ProfileSchema from '@/schemas/ProfileSchema.json';
import AssetSchema from '@/schemas/AssetSchema.json';
import LSP8Schema from '@/schemas/LSP8Schema.json';

// utilities
import useWeb3 from '@/hooks/useWeb3';
import { getDataBatch } from '@/utils/web3';

interface Props {
  address: string;
  isErc725Y: boolean;
  isAsset: boolean;
  isLSP8: boolean;
}

const DataKeysTable: React.FC<Props> = ({
  address,
  isErc725Y,
  isAsset,
  isLSP8,
}) => {
  const web3 = useWeb3();

  const [data, setData] = useState<
    {
      key: string;
      value: string | string[];
      schema: ERC725JSONSchema;
    }[]
  >([]);

  useEffect(() => {
    const fetch = async () => {
      if (!web3) return;

      if (!isErc725Y) return;

      const dataResult: {
        key: string;
        value: string;
        schema: ERC725JSONSchema;
      }[] = [];

      try {
        if (isErc725Y) {
          let schemaToLoad = isAsset ? AssetSchema : ProfileSchema;

          if (isLSP8) {
            schemaToLoad = schemaToLoad.concat(LSP8Schema);
          }

          const dataKeys = schemaToLoad.map((schema) => schema.key);

          const result = await getDataBatch(address, dataKeys, web3);
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
  }, [address, web3, isErc725Y, isAsset, isLSP8]);

  if (!web3) return <p>error: could not load provider</p>;

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

export default DataKeysTable;
