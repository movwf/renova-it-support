import React from 'react';
import { useLocation } from 'react-router-dom';
import { Column, CopyButton, Row } from 'carbon-components-react';
import { CheckmarkOutline32 } from '@carbon/icons-react';
import styles from './Submit.module.css';

function Submit() {
  const location = useLocation();

  const handleCopy = (id: string) => {
    const text = document.getElementById(id);

    // @ts-ignore
    navigator.clipboard.writeText(text?.innerText);
  };

  return (
    <Column data-testid="submit-page">
      <Row>
        <span className={styles.Heading}>Thank you for your time!</span>
      </Row>
      <Row>
        <span className={styles.StatusInfo}>Your request is submitted succesfully.</span>
      </Row>
      <Row>
        <CheckmarkOutline32 aria-label="Success Logo" className={styles.Checkmark} />
      </Row>
      <Row className={styles.RequestInfo}>
        <span className={styles.RequestId}>
          Your request id is :{' '}
          <span id="request-id" data-testid="request-id-text">
            {location.state
              ? // @ts-ignore
                location.state.request_id
              : 'xxxx-xxxx-xx'}
          </span>
        </span>
        <CopyButton onClick={() => handleCopy('request-id')} data-testid="submit-copy-button" />
      </Row>
      <Row>
        <span className={styles.RequestIdInfo}>
          You can check your repair status with this id. Please note it for further use.
        </span>
      </Row>
    </Column>
  );
}

export default Submit;
