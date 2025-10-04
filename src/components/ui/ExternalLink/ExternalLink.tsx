import React from 'react';
import styles from './ExternalLink.module.scss';

type ExternalLinkProps = {
  url: string;
  text: string;
};

// TODO: refactor to use `children` prop instead of `text` prop
// Looks cleaner that way in code
const ExternalLink = ({ url, text }: ExternalLinkProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`${styles.homeLink} mr-1`}
    >
      {text}
    </a>
  );
};

export default ExternalLink;
