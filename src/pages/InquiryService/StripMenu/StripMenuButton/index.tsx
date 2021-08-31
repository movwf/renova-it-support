import React from 'react';
import styles from '../StripMenu.module.css';

export interface IStripMenuButton {
  icon: JSX.Element;
  label: string;
  href: string;
}

function StripMenuButton({ icon, label, href }: IStripMenuButton) {
  return (
    <a className={styles.StripMenuItem} href={href} data-testid="strip-menu-link">
      <div className={styles.StripMenuItemIcon} data-testid="strip-menu-icon">
        {icon}
      </div>
      <div className={styles.StripMenuItemLabel} data-testid="strip-menu-label">
        {label}
      </div>
    </a>
  );
}

export default React.memo(StripMenuButton);
