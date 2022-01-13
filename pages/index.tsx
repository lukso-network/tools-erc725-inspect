import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
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
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
