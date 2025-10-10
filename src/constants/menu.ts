import { MenuItem } from '@/types/menu';

export const menuItems: MenuItem[] = [
  {
    title: '🔎 Inspector',
    description: 'Check the data keys and interfaces of smart contract.',
    link: '/inspector',
    isExternal: false,
    category: 'inspector',
  },
  {
    title: '➡️ Data Fetcher',
    description: 'Retrieve the contents of the smart contract data keys.',
    link: '/data-fetcher',
    category: 'inspector',
  },
  {
    title: '🔐 Key Manager',
    description:
      'Encode and decode smart contract permissions of the key manager.',
    link: '/key-manager',
    category: 'encoder',
  },
  {
    title: '⛓️ Transaction Encoder',
    description: 'Encode and decode smart contract transaction data.',
    link: '/abi-encoder',
    category: 'encoder',
  },
  {
    title: '🗄️ Metadata Encoder',
    description:
      'Encode and decode storage information based on any LSP2 ERC725Y JSON schema.',
    link: '/lsp2-encoder',
    category: 'encoder',
    isBeta: true,
  },
  {
    title: '✅ LSP Checker',
    description:
      'Check that your 🆙, Token or NFT is compliant with the LSP Standards.',
    link: '/lsp-checker',
    category: 'inspector',
    isExternal: false,
    isBeta: true,
  },
];
