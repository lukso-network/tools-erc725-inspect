/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NetworkSwitch from './components/NetworksSwitch';

const NavBar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="navbar is-light">
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <Link href="/">
            <a className="navbar-item">🛠 ERC725 Tools</a>
          </Link>
          <a
            href="https://up-test-dapp.lukso.tech/"
            rel="noreferrer"
            className="navbar-item"
          >
            🎯 Test dApp
          </a>
          <Link href="/inspect">
            <a
              className={`navbar-item ${
                router.pathname === '/inspect' && 'has-text-link'
              }`}
            >
              🔎 Inspector
            </a>
          </Link>
          <Link href="/getData">
            <a
              className={`navbar-item ${
                router.pathname === '/getData' && 'has-text-link'
              }`}
            >
              💽 Data Fetcher
            </a>
          </Link>
          <Link href="/key-manager">
            <a
              className={`navbar-item ${
                router.pathname === '/key-manager' && 'has-text-link'
              }`}
            >
              🔐 Key Manager
            </a>
          </Link>
          <Link href="/abi-coder">
            <a
              className={`navbar-item ${
                router.pathname === '/abi-coder' && 'has-text-link'
              }`}
            >
              📜 ABI Encoder
            </a>
          </Link>
          <Link href="/lsp2-coder">
            <a
              className={`navbar-item ${
                router.pathname === '/lsp2-coder' && 'has-text-link'
              }`}
            >
              📖 LSP2 Encoder
            </a>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <NetworkSwitch />
          </div>
          <div className="navbar-item">
            <div className="buttons">
              <a href="https://docs.lukso.tech/" className="button is-light">
                DOCS
              </a>
            </div>
          </div>

          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a
                  className="button is-primary"
                  href="https://github.com/lukso-network/tools-erc725-inspect"
                >
                  <span>GitHub</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
