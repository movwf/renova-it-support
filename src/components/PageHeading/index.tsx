import React from 'react';
import { Row } from 'carbon-components-react';
import styles from './PageHeading.module.css';
import { IPageHeading } from '../../types/components/PageHeading.types';

function PageHeading({ title, desc }: IPageHeading) {
  return (
    <Row className={styles.PageHeading} data-testid="page-heading">
      <span className={styles.HeadingTitle} data-testid="page-heading-title">
        {title}
      </span>
      {/* If descrpition didn't provided, don't render */}
      {desc && (
        <span className={styles.HeadingDesc} data-testid="page-heading-desc">
          {desc}
        </span>
      )}
    </Row>
  );
}

export default React.memo(PageHeading);
