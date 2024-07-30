/**
 * @author Hugo Masclet <git@hugom.xyz>
 * @author Felix Hildebrandt <fhildeb>
 */
import React, { useState } from 'react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import NetworkSwitch from './components/NetworksSwitch';
import styles from './NavBar.module.scss';
import clsx from 'clsx';

const LinksMenu = ({
  router,
  createLink,
}: {
  router: NextRouter;
  createLink: (path: string) => string;
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={clsx('navbar-item dropdown', isActive && 'is-active')}>
      <div className="dropdown-trigger">
        <a
          className="navbar-link is-flex"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(!isActive)}
        >
          Menu
        </a>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content" style={{ background: '#F0F0F0' }}>
          <Link href={createLink('/inspector')}>
            <a
              className={clsx(
                'dropdown-item',
                router.pathname === '/inspector' && 'has-text-link',
              )}
              onClick={() => setIsActive(false)}
            >
              🔎 Inspector
            </a>
          </Link>
          <Link href={createLink('/lsp-checker')}>
            <a
              className={clsx(
                'dropdown-item',
                router.pathname === '/lsp-checker' && 'has-text-link',
              )}
              onClick={() => setIsActive(false)}
            >
              ✅ LSP Checker
            </a>
          </Link>
          <Link href={createLink('/data-fetcher')}>
            <a
              className={clsx(
                'dropdown-item',
                router.pathname === '/data-fetcher' && 'has-text-link',
              )}
              onClick={() => setIsActive(false)}
            >
              💽 Data Fetcher
            </a>
          </Link>
          <Link href={createLink('/key-manager')}>
            <a
              className={clsx(
                'dropdown-item',
                router.pathname === '/key-manager' && 'has-text-link',
              )}
              onClick={() => setIsActive(false)}
            >
              🔐 Key Manager
            </a>
          </Link>
          <Link href={createLink('/abi-encoder')}>
            <a
              className={clsx(
                'dropdown-item',
                router.pathname === '/abi-encoder' && 'has-text-link',
              )}
              onClick={() => setIsActive(false)}
            >
              📜 ABI Encoder
            </a>
          </Link>
          <Link href={createLink('/lsp2-encoder')}>
            <a
              className={clsx(
                'dropdown-item',
                router.pathname === '/lsp2-encoder' && 'has-text-link',
              )}
              onClick={() => setIsActive(false)}
            >
              📖 LSP2 Encoder
            </a>
          </Link>
          <Link href="/lsp4-metadata-encoder">
            <a
              className={clsx(
                'dropdown-item',
                router.pathname === '/lsp4-metadata-encoder' && 'has-text-link',
              )}
              onClick={() => setIsActive(false)}
            >
              📖 LSP4 Metadata Encoder
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const NavBar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  const createLink = (path: string) => {
    if (typeof window === 'undefined') {
      return path;
    }
    const urlParams = new URLSearchParams(window.location.search);

    const keys = Array.from(urlParams.keys());

    // Remove all page-specific parameters
    for (const key of keys) {
      if (key !== 'network') {
        urlParams.delete(key);
      }
    }

    return `${path}?${urlParams.toString()}`;
  };

  return (
    <nav className="navbar is-light sticky">
      <div className={`navbar-brand ${styles.navbarHeight}`}>
        <Link href={createLink('/')}>
          <a className="navbar-item is-hidden-desktop">🛠 ERC725 Tools</a>
        </Link>
        <a
          role="button"
          className={clsx('navbar-burger burger', isActive && 'is-active')}
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
          <Link href={createLink('/')}>
            <a className={`navbar-item is-hidden-touch ${styles.navbarHeight}`}>
              🛠 ERC725 Tools
            </a>
          </Link>
        </div>

        <div className="navbar-end">
          <LinksMenu router={router} createLink={createLink} />
          <NetworkSwitch />
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
