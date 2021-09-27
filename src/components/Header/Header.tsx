/**
 * @author Hugo Masclet <git@hugom.xyz>
 */
import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="navbar is-light">
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <a className="navbar-item" href="/">
            ERC725 Inspect 📝🔍
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a
                href="https://github.com/lukso-network/LIPs/tree/master/LSPs"
                className="button is-light"
              >
                LUKSO LSPs
              </a>
            </div>
          </div>

          <div className="navbar-item">
            <div className="buttons">
              <a
                href="https://docs.lukso.tech/networks/l14-testnet"
                className="button is-light"
              >
                Network: LUKSO L14
              </a>
            </div>
          </div>

          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a
                  className="button is-primary"
                  href="https://github.com/Hugoo/erc725-inspect/"
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

export default Header;
