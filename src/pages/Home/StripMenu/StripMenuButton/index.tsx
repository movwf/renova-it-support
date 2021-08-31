import React from 'react';
import styles from '../StripMenu.module.css';

export interface IStripMenuButton {
  icon: JSX.Element;
  title: string;
  href: string;
}

function StripMenuButton({ icon, title, href }: IStripMenuButton) {
  return (
    <a className={styles.StripMenuItem} href={href} data-testid="strip-menu-link">
      <div className={styles.StripMenuItemIcon} data-testid="strip-menu-icon">
        {icon}
      </div>
      <div className={styles.StripMenuItemTitle} data-testid="strip-menu-title">
        {title}
      </div>
    </a>
  );
}

export default React.memo(StripMenuButton);
