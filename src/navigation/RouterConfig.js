import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Routes from './Routes';

import Home from '../pages/Home';
import User from '../pages/User';
import Admin from '../pages/Admin';
import Login from '../pages/Login';
import Layout from '../pages/layout';
import Request from '../pages/Request';
import InquiryService from '../pages/InquiryService';
import ProtectedRoute from './ProtectedRoute';

function RouterConfig() {
  return (
    <Switch>
      <Layout>
        <Route exact path={Routes.home} component={Home} />
        <Route exact path={Routes.login} component={Login} />
        <Route path={Routes.request} component={Request} />
        <Route exact path={Routes.inquiry} component={InquiryService} />
        <ProtectedRoute exact path={Routes.user} component={User} />
        <ProtectedRoute exact path={Routes.admin} component={Admin} />
      </Layout>
    </Switch>
  );
}

export default RouterConfig;
