import React from 'react';
import { Row } from 'carbon-components-react';
import styles from '../Home.module.css';
import Routes from '../../../navigation/Routes';

function CheckCaseText() {
  return (
    <Row className={styles.CheckCase} data-testid="check-case-text">
      <span className={styles.CheckCaseText}>
        Need to check the previous case?
        <a href={Routes.check}>Check your case</a>
      </span>
    </Row>
  );
}

export default React.memo(CheckCaseText);
