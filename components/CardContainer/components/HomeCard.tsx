import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" component="div" fontWeight={600}>
            {fullTitle}
          </Typography>
          <Typography className={styles.description}>{description}</Typography>
          {version && (
            <Typography component="p">
              <code>version: {version}</code>
            </Typography>
          )}
        </CardContent>
      </Card>
    </LinkWrapper>
  );
};

export default HomeCard;
