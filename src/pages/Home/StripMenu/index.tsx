import React from 'react';
import { Row } from 'carbon-components-react';
import styles from './StripMenu.module.css';
import StripMenuButton from './StripMenuButton';
import Icons from './Icons';

function StripMenu() {
  return (
    <Row className={styles.InnerMenuStrip} data-testid="strip-menu">
      {[
        {
          id: 1,
          icon: Icons.technicalSupport,
          title: 'Technical Support',
          href: '#',
        },
        {
          id: 2,
          icon: Icons.inquiryService,
          title: 'Inquiry Service',
          href: '/service',
        },
        {
          id: 3,
          icon: Icons.downloadCenter,
          title: 'Download Center',
          href: '#',
        },
      ].map((item) => (
        <StripMenuButton key={item.id} {...item} />
      ))}
    </Row>
  );
}

export default React.memo(StripMenu);
