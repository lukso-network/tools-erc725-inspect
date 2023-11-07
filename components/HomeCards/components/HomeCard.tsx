import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const HomeCard = ({ title, description, link, isExternal, version }) => {
  if (isExternal) {
    const fullTitle = isExternal ? `${title} ↗` : title;
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Card className="styledCard">
          <CardContent>
            <Typography variant="h5" component="div" fontWeight={600}>
              {fullTitle}
            </Typography>
            <Typography className="description">{description}</Typography>
            {version && (
              <Typography component="p">
                <code>version: {version}</code>
              </Typography>
            )}
          </CardContent>
        </Card>
      </a>
    );
  }
  return (
    <Link href={link} passHref>
      <Card className="styledCard">
        <CardContent>
          <Typography variant="h5" component="div" fontWeight={600}>
            {title}
          </Typography>
          <Typography className="description">{description}</Typography>
          {version && (
            <Typography component="p">
              <code>version: {version}</code>
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default HomeCard;
