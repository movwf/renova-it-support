import React from 'react';
import { Row } from 'carbon-components-react';
import styles from './ContactInformation.module.css';

function ContactInformation() {
  return (
    <Row className={styles.ContactInformation} data-testid="contact-information">
      <span className={styles.Line}>Looking for more information?</span>
      <span className={styles.Line}>Start Conversation</span>
      <span className={styles.Line}>or</span>
      <span className={styles.Line}>call toll-free number</span>
      <span className={styles.Line}>+90(850) 535 95 35</span>
    </Row>
  );
}

export default React.memo(ContactInformation);
