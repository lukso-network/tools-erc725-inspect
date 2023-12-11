/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Felix Hildebrandt <fhildeb>
 */
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NetworkSwitch from './components/NetworksSwitch';
import styles from './NvaBar.module.scss';

const NavBar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar is-light sticky">
      <div className={`navbar-brand ${styles.navbarHeight}`}>
        <Link href="/">
          <a className="navbar-item is-hidden-desktop">🛠 ERC725 Tools</a>
        </Link>
        <a
          role="button"
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={toggleNavbar}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-start ml-3">
          <Link href="/">
            <a className={`navbar-item is-hidden-touch ${styles.navbarHeight}`}>
              🛠 ERC725 Tools
            </a>
          </Link>
          <Link href="/inspector">
            <a
              className={`navbar-item ${
                router.pathname === '/inspector' && 'has-text-link'
              }`}
            >
              🔎 Inspector
            </a>
          </Link>
          <Link href="/data-fetcher">
            <a
              className={`navbar-item ${
                router.pathname === '/data-fetcher' && 'has-text-link'
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
          <Link href="/abi-encoder">
            <a
              className={`navbar-item ${
                router.pathname === '/abi-encoder' && 'has-text-link'
              }`}
            >
              📜 ABI Encoder
            </a>
          </Link>
          <Link href="/lsp2-encoder">
            <a
              className={`navbar-item ${
                router.pathname === '/lsp2-encoder' && 'has-text-link'
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
              <a
                href="https://docs.lukso.tech/"
                className="button"
                target="_blank"
                rel="noreferrer"
              >
                DOCS ↗
              </a>
              <a
                className="button"
                href="https://github.com/lukso-network/tools-erc725-inspect"
                target="_blank"
                rel="noreferrer"
              >
                GITHUB ↗
              </a>
            </div>
          </div>

          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control"></p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
