import * as React from 'react';
import Link from 'next/link';
import styles from './HomeCard.module.scss';

interface CardProps {
  title: string;
  description: string;
  link: string;
  isExternal: boolean;
  version: string;
  isBeta?: boolean;
}

const HomeCard: React.FC<CardProps> = ({
  title,
  description,
  link,
  isExternal,
  version,
  isBeta = false,
}) => {
  const fullTitle = isExternal ? `${title} ↗` : title;

  const LinkWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
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
          <h3 className={styles.cardContent}>
            {fullTitle}
            {isBeta && (
              <button
                className="button is-rounded is-small is-warning is-outlined is-light mx-2 px-2"
                style={{ display: 'inline-block' }}
              >
                beta
              </button>
            )}
          </h3>

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
