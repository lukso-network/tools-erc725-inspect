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
import { menuItems } from '@/constants/menu';
import { MenuItem } from '@/types/menu';

const LinksMenu = ({
  id,
  router,
  createLink,
  menuText,
  linkItems,
  activeMenu,
  setActiveMenu,
}: {
  id: string;
  router: NextRouter;
  createLink: (path: string) => string;
  menuText: string;
  linkItems: MenuItem[];
  activeMenu: string | null;
  setActiveMenu: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const isActive = activeMenu === id;

  const { pathname } = router;

  const toggleMenu = () => {
    setActiveMenu(isActive ? null : id); // open me, close others
  };

  return (
    <>
      {/* Desktop menu */}
      <div
        className={clsx(
          'navbar-item has-dropdown is-hidden-touch',
          isActive && 'is-active',
        )}
        onMouseEnter={() => setActiveMenu(id)}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <a className="navbar-link is-flex">{menuText}</a>

        <div className="navbar-dropdown">
          {linkItems.map(({ link, title, isBeta }) => (
            <Link key={title} href={createLink(link)}>
              <a
                className={clsx(
                  'navbar-item',
                  pathname === link && 'has-text-link',
                )}
                onClick={() => setActiveMenu(null)} // close menu after click
              >
                {title}
                {isBeta && (
                  <button
                    className="button is-rounded is-small is-warning is-outlined is-light mx-2 px-2"
                    style={{ fontSize: '0.5rem' }}
                  >
                    beta
                  </button>
                )}
              </a>
            </Link>
          ))}
          {/* </div> */}
        </div>
      </div>

      {/* Mobile menu */}
      <div className="navbar-item has-dropdown is-hidden-desktop">
        <a className="navbar-link" onClick={toggleMenu}>
          {menuText}
        </a>
        {isActive && (
          <div className="navbar-dropdown">
            {linkItems.map(({ title, link, isBeta }) => (
              <Link key={title} href={createLink(link)}>
                <a
                  className={clsx(
                    'navbar-item',
                    pathname === link && 'has-text-link',
                  )}
                  onClick={() => setActiveMenu(null)}
                >
                  {title}
                  {isBeta && (
                    <span className="tag is-warning is-light is-rounded is-small ml-2">
                      beta
                    </span>
                  )}
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const NavBar: React.FC = () => {
  // controls which dropdown is open
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // controls mobile hamburger toggle
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const router = useRouter();

  const inspectorMenuItems = menuItems.filter(
    ({ category }) => category === 'inspector',
  );
  const encoderMenuItems = menuItems.filter(
    ({ category }) => category === 'encoder',
  );

  const toggleNavbar = () => setIsMobileOpen((prev) => !prev);

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
          <a className="navbar-item is-hidden-desktop">Home</a>
        </Link>
        <a
          role="button"
          className={clsx('navbar-burger burger', isMobileOpen && 'is-active')}
          aria-label="menu"
          aria-expanded={isMobileOpen}
          onClick={toggleNavbar}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={clsx('navbar-menu', isMobileOpen && 'is-active')}>
        <div className="navbar-start">
          <Link href={createLink('/')}>
            <a className={`navbar-item is-hidden-touch ${styles.navbarHeight}`}>
              Home
            </a>
          </Link>
          <LinksMenu
            id="inspector"
            router={router}
            createLink={createLink}
            linkItems={inspectorMenuItems}
            menuText="🔍 Inspector Tools"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
          <LinksMenu
            id="encoder"
            router={router}
            createLink={createLink}
            linkItems={encoderMenuItems}
            menuText="🛠️ Encoder Tools"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        </div>

        <div className="navbar-end">
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
