import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, Column, Grid, Row } from 'carbon-components-react';
import { Logout20 } from '@carbon/icons-react';

import QuestionTitle from '../Request/Repair/FormPages/components/QuestionTitle';
import RequestTable from '../../components/RequestTable';
import PageHeading from '../../components/PageHeading';
import Divider from '../../components/Divider';
import { AuthContext } from '../../contexts/AuthContext';
import { getUserRequests } from '../../queries/requestQueries';
import { IUserRequest } from '../../types/queries/requestQueries.types';

function User() {
  const { logout, user } = React.useContext(AuthContext);
  const { loading, data } = useQuery(getUserRequests, {
    variables: {
      email: user ? user?.users?.[0].email : null,
    },
  });

  const handleLogout = () => logout();

  const serializeUserRequest = (rawData: IUserRequest, index: number) => ({
    id: (index + 1).toString(),
    product: rawData.product.product_name,
    requestId: rawData.request_id,
    time: rawData.created_At,
    status: rawData.status,
  });

  if (loading) return <span data-tesid="user-page-fallback">Loading!</span>;

  return (
    <Grid fullWidth data-testid="user-page">
      <Column>
        <PageHeading
          title={`Hi, ${user.users[0].username}`}
          desc="Welcome to Rénova profile page "
        />
        <Divider thickness={1} width="90%" marginY={25} color="#E0E0E0" />
        <QuestionTitle title="Your support requests" description="Support request history" />
        <RequestTable
          rowData={data.requests.map((request: any, index: number) =>
            serializeUserRequest(request, index)
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

export default User;
