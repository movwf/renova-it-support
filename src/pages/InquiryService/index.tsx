import React from 'react';
import { Grid } from 'carbon-components-react';
import Divider from '../../components/Divider';
import PageHeading from '../../components/PageHeading';
import CheckCaseText from '../Home/CheckCaseText';
import StripMenu from './StripMenu';

function InquiryService() {
  return (
    <Grid fullWidth data-testid="inquiry-service">
      <PageHeading title="Inquiry Service" desc="Please select the service you need to inquire." />
      <Divider thickness={1} width="90%" marginY={15} color="#E0E0E0" />
      <StripMenu />
      <CheckCaseText />
    </Grid>
  );
}

export default React.memo(InquiryService);
