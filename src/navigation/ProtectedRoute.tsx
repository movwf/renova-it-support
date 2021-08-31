import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { IProtectedRoute } from './types/ProtectedRoute.types';

function ProtectedRoute({ component: Component, ...restOfProps }: IProtectedRoute) {
  const { isAuth } = React.useContext(AuthContext);

  return (
    <Route
      {...restOfProps}
      render={(props) => (isAuth ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
}

export default ProtectedRoute;
