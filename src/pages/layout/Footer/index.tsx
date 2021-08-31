import React from 'react';
import { LogoGithub20 } from '@carbon/icons-react';
import styles from '../Layout.module.css';

function Footer() {
  return (
    <footer className={styles.Footer} data-testid="footer">
      <LogoGithub20 aria-label="Add Icon" className={styles.FooterGithubLogo} />
      <a href="https://github.com/movwf">movwf - 2021</a>
    </footer>
  );
}

export default React.memo(Footer);
