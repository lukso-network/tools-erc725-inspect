import { ERC725 } from '@erc725/erc725.js';
import { LUKSO_IPFS_BASE_URL } from '@/constants/links';
import LSP3Schema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

export const fetchProfileMetadataJSON = async (
  address: string,
  rpcUrl: string,
): Promise<any> => {
  const erc725js = new ERC725(LSP3Schema, address, rpcUrl, {
    ipfsGateway: LUKSO_IPFS_BASE_URL + '/',
    gas: 20_000_000, // high gas to fetch large amount of metadata
  });

  const lsp3ProfileValue = await erc725js.fetchData('LSP3Profile');

  if (!lsp3ProfileValue) return null;

  return lsp3ProfileValue;
};
