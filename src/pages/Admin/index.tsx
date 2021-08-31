import React from 'react';
import { Button, Column, Grid, Row } from 'carbon-components-react';
import { useQuery } from '@apollo/client';
import { Logout20 } from '@carbon/icons-react';

import RequestTable from '../../components/RequestTable';
import PageHeading from '../../components/PageHeading';
import Divider from '../../components/Divider';
import CountsStrip from './CountsStrip';

import { AuthContext } from '../../contexts/AuthContext';
import { getAllRequests } from '../../queries/requestQueries';
import { IAllRequests } from '../../types/queries/requestQueries.types';

function Admin() {
  const { logout } = React.useContext(AuthContext);
  const { loading, data } = useQuery(getAllRequests);

  const handleLogout = () => logout();

  const serializeRequest = (rawData: IAllRequests, index: number) => ({
    id: (index + 1).toString(),
    product: rawData.product.product_name,
    requestId: rawData.request_id,
    time: rawData.created_At,
    status: rawData.status,
  });

  if (loading) return <span>Loading...</span>;

  return (
    <Grid fullWidth data-testid="admin-page">
      <Column>
        <PageHeading title="Dashboard" />
        <Divider thickness={1} width="90%" marginY={25} color="#E0E0E0" />
        <CountsStrip data={data} />
        <RequestTable.Admin
          rowData={data.requests.map((request: any, index: number) =>
            serializeRequest(request, index)
          )}
        />
        <Row>
          <Column>
            <Button onClick={handleLogout} renderIcon={Logout20}>
              Logout
            </Button>
          </Column>
        </Row>
      </Column>
    </Grid>
  );
}

export default Admin;
