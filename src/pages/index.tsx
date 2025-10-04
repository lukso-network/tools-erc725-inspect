import type { NextPage } from 'next';
import Head from 'next/head';
import Card from '@/components/ui/Card';
import { menuItems } from '@/constants/menu';
import styled from '@emotion/styled';
import { LSP_DOCS_URL } from '@/constants/links';

// Since we are in the `pages/` folder, just use CSS-in-JS here for simplicity
// to avoid creating a new css file just for one class
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
`;

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
            This website provides debugging tools to interact with{' '}
            <a
              href={LSP_DOCS_URL.ERC725}
              target="_blank"
              rel="noreferrer"
              className="home-link mr-1"
            >
              ERC725
            </a>
            smart contracts.
          </p>
          <CardsContainer>
            {menuItems.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </CardsContainer>
          <h3 className="title is-3">External Developer Resources</h3>
          <p>
            Start integrating{' '}
            <a
              href={LSP_DOCS_URL.ERC725}
              target="_blank"
              rel="noreferrer"
              className="home-link mr-1"
            >
              ERC725
            </a>
            and
            <a
              href="https://docs.lukso.tech/standards/introduction"
              target="_blank"
              rel="noreferrer"
              className="home-link mx-1"
            >
              LSP
            </a>
            smart contracts into your own projects by diving into the following
            apps and libraries:
          </p>
          <CardsContainer>
            {[
              {
                title: 'up-test-dapp',
                description:
                  'The UP Test dApp demonstrates the deployment and interactions with Universal Profiles and LSPs. You can create token, edit profile storage, connect and sign messages, or build transactions.',
                link: 'https://up-test-dapp.lukso.tech/',
                isExternal: true,
              },
              {
                title: 'erc725.js',
                description:
                  'The ERC725 library allows seamless interaction of smart contract schemas and contracts to simpify ERC725 integration.',
                link: 'https://docs.lukso.tech/tools/erc725js/getting-started',
                isExternal: true,
              },
              {
                title: 'lsp-smart-contracts',
                description:
                  'The LSP library includes Solidity code, JSON ABIs, and constants, to streamline your LSP smart contract development.',
                link: 'https://docs.lukso.tech/tools/lsp-smart-contracts/getting-started',
                isExternal: true,
              },
            ].map((item, index) => (
              <Card
                key={index}
                title={item.title}
                description={item.description}
                link={item.link}
                isExternal={item.isExternal}
              />
            ))}
          </CardsContainer>
        </div>
      </div>
    </>
  );
};

export default Home;
