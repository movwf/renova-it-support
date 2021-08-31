import React from 'react';
import { Row } from 'carbon-components-react';
import styles from './StripMenu.module.css';
import Icons from './Icons';
import StripMenuButton from './StripMenuButton';
import Routes from '../../../navigation/Routes';

function StripMenu() {
  return (
    <Row className={styles.StripMenu} data-testid="strip-menu">
      {[
        {
          id: 1,
          icon: Icons.repair,
          label: 'Request Repair',
          href: Routes.repair,
        },
        {
          id: 2,
          icon: Icons.document,
          label: 'Request Information',
          href: '#',
        },
      ].map((item) => (
        <StripMenuButton key={item.id} {...item} />
      ))}
    </Row>
  );
}

export default StripMenu;
