import type { NextPage } from 'next';
import Head from 'next/head';
import packageJson from '../package.json';
import CardContainer from '../components/HomeCards/CardContainer';

const ERC725_JS_VERSION = packageJson.dependencies['@erc725/erc725.js'];
const LSP_SMART_CONTRACTS_VERSION =
  packageJson.dependencies['@lukso/lsp-smart-contracts'];

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ERC725 Tools</title>
      </Head>
      <div className="home-container container">
        <div className="content">
          <h1 className="title is-1">Welcome to ERC725 Tools</h1>
          <p>
            This website provides debugging tools to interact with ERC725 smart
            contracts.
          </p>
          <CardContainer
            cardData={[
              {
                title: '🔎 Inspector',
                description:
                  'Check the data keys and interfaces of smart contract.',
                link: '/inspector',
                isExternal: false,
              },
              {
                title: '💽 Data Fetcher',
                description:
                  'Retrieve the contents of the smart contract data keys.',
                link: '/data-fetcher',
              },
              {
                title: '🔐 Key Manager',
                description:
                  'Encode and decode smart contract permissions of the key manager.',
                link: '/key-manager',
              },
              {
                title: '📜 ABI Encoder',
                description:
                  'Encode and decode smart contract transaction data.',
                link: '/abi-encoder',
              },
              {
                title: '📖 LSP2 Encoder ',
                description:
                  'Encode and decode storage information based on the JSON schema.',
                link: 'lsp2-encoder',
              },
            ]}
          ></CardContainer>
          <h3 className="title is-4">External Developer Resources</h3>
          <p>
            Start integrating ERC725 and LSP smart contracts into your own
            projects by diving into the following apps and libraries:
          </p>
          <CardContainer
            cardData={[
              {
                title: 'up-test-dapp',
                description:
                  'The UP Test dApp demonstrates the deployment and interactions with Universal Profiles and LSPs. You can create token, upload assets, edit profile storage, or build transactions.',
                link: 'https://up-test-dapp.lukso.tech/',
                isExternal: true,
              },
              {
                title: 'erc-725.js',
                description:
                  'The ERC725 library allows seamless interaction of smart contract schemas and contracts to simpify ERC725 integration.',
                link: 'https://docs.lukso.tech/tools/erc725js/getting-started',
                isExternal: true,
                version: ERC725_JS_VERSION,
              },
              {
                title: 'lsp-smart-contracts',
                description:
                  'The LSP library includes Solidity code, JSON ABIs, and constants, to streamline your LSP smart contract development.',
                link: 'https://docs.lukso.tech/tools/lsp-smart-contracts/getting-started',
                isExternal: true,
                version: LSP_SMART_CONTRACTS_VERSION,
              },
            ]}
          ></CardContainer>
        </div>
      </div>
    </>
  );
};

export default Home;
