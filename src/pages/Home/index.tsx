import React from 'react';
import { Row, Column, Grid } from 'carbon-components-react';

import Banner from './Banner';
import StripMenu from './StripMenu';
import CheckCaseText from './CheckCaseText';
import SupportInfoBox from '../../components/SupportInfoBox';

function Home() {
  return (
    <Grid fullWidth data-testid="home">
      <Banner />
      <StripMenu />
      <CheckCaseText />
      <Row>
        <Column sm={4} md={4} lg={4}>
          <SupportInfoBox
            title="Product Information"
            desc="Quickly find information about your product"
            links={[
              { title: 'Find Model name', url: '#' },
              { title: 'Find Serial Number', url: '#' },
            ]}
          />
        </Column>
        <Column sm={4} md={4} lg={4}>
          <SupportInfoBox
            title="Service Policy"
            desc="Important information of service policy"
            links={[{ title: 'Rénova Premium Care', url: '#' }]}
          />
        </Column>
        <Column sm={4} md={4} lg={4}>
          <SupportInfoBox
            title="Contact US"
            desc="Contact with Rénova IT Support "
            links={[
              { title: 'Rénova Call Center', url: '#' },
              { title: 'info@renova.com', url: '#' },
            ]}
          />
        </Column>
      </Row>
    </Grid>
  );
}

export default Home;
