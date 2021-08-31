import React from 'react';
import { Row } from 'carbon-components-react';
import styles from '../Home.module.css';

function Banner() {
  return (
    <Row className={styles.Banner} data-testid="banner">
      <div className={styles.BannerDrop}>
        <span>Welcome to Rénova IT Support</span>
        <span className={styles.GreetHeading}>Search for the solution</span>
      </div>
    </Row>
  );
}

export default React.memo(Banner);
