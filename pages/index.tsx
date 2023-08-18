import type { NextPage } from 'next';
import Head from 'next/head';
import packageJson from '../package.json';

const ERC725_JS_VERSION = packageJson.dependencies['@erc725/erc725.js'];
const LSP_SMART_CONTRACTS_VERSION =
  packageJson.dependencies['@lukso/lsp-smart-contracts'];

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ERC725 Tools</title>
      </Head>
      <div className="container">
        <div className="content">
          <h1 className="title is-1">🛠 ERC725 Tools</h1>
          <p>
            This website provides debugging tools to interact with ERC725 smart
            contracts.
          </p>
          <h3 className="title is-3">Built with</h3>
          <ul>
            <li>
              <a
                className="has-text-link"
                href="https://docs.lukso.tech/tools/erc725js/getting-started"
              >
                erc725.js
              </a>
              &nbsp;(version: {ERC725_JS_VERSION})
              <li>
                <a
                  className="has-text-link"
                  href="https://docs.lukso.tech/tools/lsp-smart-contracts/getting-started"
                >
                  lsp-smart-contracts&nbsp;
                </a>
                (version: {LSP_SMART_CONTRACTS_VERSION})
              </li>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
