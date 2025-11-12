import { LSP8_TOKEN_ID_FORMAT } from '@lukso/lsp8-contracts';

import {
  faListOl,
  faHashtag,
  faFingerprint,
  faQuestionCircle,
  faInfoCircle,
  faFileAlt,
  faFont,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TokenIdFormatBadgeProps = {
  value: string | number;
};

const TokenIdFormatBadge: React.FC<TokenIdFormatBadgeProps> = ({ value }) => {
  const tokenIdFormatName = Object.keys(LSP8_TOKEN_ID_FORMAT).filter((key) =>
    LSP8_TOKEN_ID_FORMAT[key].toString().includes(value.toString()),
  );

  let badgeColour = 'is-danger';
  let icon = <FontAwesomeIcon icon={faQuestionCircle} />;

  if (!tokenIdFormatName || tokenIdFormatName.length === 0) {
    return (
      <>
        <code className="mx-1 is-size-5">{value}</code>
        <span className={`icon-text tag is-medium is-light ${badgeColour}`}>
          <span className="icon">{icon}</span>
        </span>
      </>
    );
  }

  switch (tokenIdFormatName[0]) {
    case 'NUMBER':
      badgeColour = 'is-info';
      icon = <FontAwesomeIcon icon={faListOl} />;
      break;
    case 'STRING':
      badgeColour = 'is-primary';
      icon = <FontAwesomeIcon icon={faFont} />;
      break;
    case 'ADDRESS':
      badgeColour = 'is-link';
      icon = <FontAwesomeIcon icon={faFileAlt} />;
      break;
    case 'UNIQUE_ID':
      badgeColour = 'is-dark';
      icon = <FontAwesomeIcon icon={faFingerprint} />;
      break;
    case 'HASH':
      badgeColour = 'is-black';
      icon = <FontAwesomeIcon icon={faHashtag} />;
      break;
    case 'MIXED_DEFAULT_NUMBER':
    case 'MIXED_DEFAULT_NUMBER':
    case 'MIXED_DEFAULT_STRING':
    case 'MIXED_DEFAULT_ADDRESS':
    case 'MIXED_DEFAULT_UNIQUE_ID':
    case 'MIXED_DEFAULT_HASH':
      badgeColour = 'is-white';
      icon = <FontAwesomeIcon icon={faInfoCircle} />;
      break;
    // when the token ID format is set but not found in the list of formats
    default:
      badgeColour = 'is-info is-light';
      icon = <FontAwesomeIcon icon={faQuestionCircle} />;
      break;
  }

  return (
    <>
      <code className="mx-1 is-size-5">{value}</code>
      <span className={`icon-text tag is-medium ${badgeColour}`}>
        <span className="icon">{icon}</span>
        <span>{tokenIdFormatName[0]} </span>
      </span>
    </>
  );
};

export default TokenIdFormatBadge;
