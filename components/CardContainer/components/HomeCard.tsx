import * as React from 'react';
import Link from 'next/link';
import styles from './HomeCard.module.scss';

interface CardProps {
  title: string;
  description: string;
  link: string;
  isExternal: boolean;
  version: string;
}

const HomeCard: React.FC<CardProps> = ({
  title,
  description,
  link,
  isExternal,
  version,
}) => {
  const fullTitle = isExternal ? `${title} ↗` : title;

  const LinkWrapper: React.FC = ({ children }) => {
    if (isExternal) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={link} passHref>
        {children}
      </Link>
    );
  };

  return (
    <LinkWrapper>
      <div className={styles.card}>
        <div>
          <h3 className={styles.cardContent}>{fullTitle}</h3>
          <div className={styles.description}>{description}</div>
          {version && (
            <p className={styles.versionTag}>
              <code>version: {version}</code>
            </p>
          )}
        </div>
      </div>
    </LinkWrapper>
  );
};

export default HomeCard;
