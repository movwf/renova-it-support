import React from 'react';

import { ISupportInfoBox } from '../../types/components/SupportInfoBox.types';
import Divider from '../Divider';
import styles from './SupportInfoBox.module.css';

function SupportInfoBox({ title, desc, links }: ISupportInfoBox) {
  return (
    <div className={styles.SupportInfoBox} data-testid="support-info-box">
      <span className={styles.SupportInfoTitle} data-testid="support-info-box-title">
        {title}
      </span>
      <span className={styles.SupportInfoDesc} data-testid="support-info-box-desc">
        {desc}
      </span>
      <Divider thickness={1} width="80%" marginY={30} color="#e0e0e0" />
      {/* Support Info Links */}
      {links.map((link, index) => (
        <a
          key={link.title}
          href={link.url}
          className={styles.SupportInfoLink}
          data-testid={`support-info-box-link-${index}`}
        >
          {link.title}
        </a>
      ))}
    </div>
  );
}

export default React.memo(SupportInfoBox);
