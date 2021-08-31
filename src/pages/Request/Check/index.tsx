import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Column, Form, Grid, Row, TextInput } from 'carbon-components-react';
import { Login20 } from '@carbon/icons-react';
import { useForm } from 'react-hook-form';

import PageHeading from '../../../components/PageHeading';
import Divider from '../../../components/Divider';
import styles from './Check.module.css';
import Routes from '../../../navigation/Routes';
import { REQUEST_ID_VALIDATE_MESSAGE, REQUEST_ID_REGEX } from '../../../configs/settings';

interface IRequestID {
  [key: string]: any;
}

const requestIDValidateOptions = {
  pattern: {
    value: REQUEST_ID_REGEX, // 0000-0000-00 Like pattern
    message: REQUEST_ID_VALIDATE_MESSAGE,
  },
};

function Check() {
  const history = useHistory();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const checkRequest = ({ requestId }: IRequestID) => {
    console.log('Check status : ', requestId);

    // Navigate to status page with requestId, prevPath state
    history.replace(Routes.status, { prevPath: location.pathname, requestId });
  };

  const redirectToLogin = () => {
    history.replace(Routes.login);
  };

  return (
    <Grid fullWidth data-testid="check-page">
      <PageHeading title="Case Inquiry" desc="Check the case record here or from your account." />
      <Divider thickness={1} width="90%" marginY={25} color="#E0E0E0" />
      <Column className={styles.CheckRequest}>
        <Row className={styles.RequestIDHeading}>Request ID</Row>
        <Row className={styles.RequestIDDescription}>Enter ID to show your request status.</Row>
        {/* Request ID Input */}
        <Row className={styles.RequestIDForm}>
          <Form onSubmit={handleSubmit((data) => checkRequest(data))}>
            <TextInput
              id="check-request-id"
              className={styles.RequestIDInput}
              hideLabel
              labelText="Request"
              invalid={errors?.requestId && true}
              invalidText={errors?.requestId?.message}
              placeholder="Eg. 1234-5678-01"
              data-testid="request-id-input"
              {...register('requestId', requestIDValidateOptions)}
            />
          </Form>
        </Row>
        <Row className={styles.RequestIDOr}>or</Row>
        {/* Login Button */}
        <Row className={styles.LoginButton}>
          <Button onClick={redirectToLogin} renderIcon={Login20} data-testid="redirect-to-login">
            Login
          </Button>
        </Row>
        <Row className={styles.LoginDescription}>for your case history.</Row>
      </Column>
    </Grid>
  );
}

export default Check;
