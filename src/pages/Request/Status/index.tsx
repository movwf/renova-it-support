import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Column, Grid, Loading, Row, TextArea } from 'carbon-components-react';

import styles from './Status.module.css';
import PageHeading from '../../../components/PageHeading';
import Divider from '../../../components/Divider';
import ValueText from '../../../components/ValueText';
import ContactInformation from './ContactInformation';
import { checkRequestStatus } from '../../../queries/requestQueries';

function Status() {
  const history = useHistory();
  const { loading, data } = useQuery(checkRequestStatus, {
    variables: {
      // @ts-ignore
      request_id: history.location.state.requestId,
    },
  });

  return loading ? (
    <Loading data-testid="status-page-loading" />
  ) : (
    <Grid fullWidth data-testid="status-page">
      <PageHeading title="Repair Status" desc="Your repair status based on provided ID." />
      <Divider thickness={1} width="90%" marginY={25} color="#E0E0E0" />
      <Column>
        {/* Request Id */}
        <Row className={styles.Property}>
          <ValueText
            propertyWidth="125px"
            propertyText="Request ID"
            valueText={data.requests[0].request_id}
          />
        </Row>
        {/* Status Text */}
        <Row className={styles.Property}>
          <ValueText
            propertyWidth="125px"
            propertyText="Status"
            valueText={data.requests[0].status}
          />
        </Row>
        {/* Service Message */}
        <Row className={styles.ConsultantMessage}>
          <Column>
            <TextArea
              id="consultant-message"
              labelText="Consultant Message"
              value={data.requests[0].service_note}
              contentEditable={false}
            />
          </Column>
        </Row>
        <ContactInformation />
      </Column>
    </Grid>
  );
}

export default Status;
