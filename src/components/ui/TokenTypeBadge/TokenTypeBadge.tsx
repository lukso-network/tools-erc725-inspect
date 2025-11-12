import { LSP4_TOKEN_TYPES } from '@lukso/lsp4-contracts';

import {
  faPalette,
  faCoins,
  faGem,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TokenTypeBadgeProps = {
  value: string | number;
};

const TokenTypeBadge: React.FC<TokenTypeBadgeProps> = ({ value }) => {
  const tokenTypeName = Object.keys(LSP4_TOKEN_TYPES).filter((key) =>
    LSP4_TOKEN_TYPES[key].toString().includes(value.toString()),
  );

  let badgeColour = 'is-danger';
  let icon = <FontAwesomeIcon icon={faQuestionCircle} />;

  if (!tokenTypeName || tokenTypeName.length === 0) {
    return (
      <>
        <code className="mx-1 is-size-5">{value}</code>
        <span className={`icon-text tag is-medium is-light ${badgeColour}`}>
          <span className="icon">{icon}</span>
        </span>
      </>
    );
  }

  switch (tokenTypeName[0]) {
    case 'TOKEN':
      badgeColour = 'is-warning';
      icon = <FontAwesomeIcon icon={faCoins} />;
      break;
    case 'NFT':
      badgeColour = 'is-info';
      icon = <FontAwesomeIcon icon={faPalette} />;
      break;
    case 'COLLECTION':
      badgeColour = 'is-link';
      icon = <FontAwesomeIcon icon={faGem} />;
      break;
  }

  return (
    <>
      <code className="mx-1 is-size-5">{value}</code>
      <span className={`icon-text tag is-medium ${badgeColour}`}>
        <span className="icon">{icon}</span>
        <span>{tokenTypeName[0]} </span>
      </span>
    </>
  );
};

export default TokenTypeBadge;
