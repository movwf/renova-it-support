import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ReservedRoute from '../../navigation/ReservedRoute';
import Routes from '../../navigation/Routes';
import Check from './Check';
import Repair from './Repair';
import Status from './Status';

function Request() {
  return (
    <>
      <div data-testid="request-page" />
      <Switch>
        {/* Main route redirects to request repair form page */}
        <Route exact path={Routes.request}>
          <Redirect to={Routes.repair} />
        </Route>
        {/* Request check with ID */}
        <Route path={Routes.check} component={Check} />
        {/* Request repair form */}
        <Route path={Routes.repair} component={Repair} />
        {/* Request status page */}
        <ReservedRoute
          path={Routes.status}
          reservedRoutes={[Routes.check]}
          redirect={Routes.check}
          component={Status}
        />
      </Switch>
    </>
  );
}

export default Request;
