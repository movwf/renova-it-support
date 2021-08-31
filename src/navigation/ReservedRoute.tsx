import React from 'react';
import { useHistory, Redirect, Route } from 'react-router-dom';
import { IReservedRoute } from './types/ReservedRoute.types';

function ReservedRoute({
  component: Component,
  path,
  reservedRoutes = [],
  redirect,
  ...restOfProps
}: IReservedRoute) {
  const { location }: any = useHistory();

  if (
    !location.state ||
    !location.state.prevPath ||
    !reservedRoutes?.includes(location.state.prevPath)
  )
    return <Redirect to={redirect} />;

  return <Route {...restOfProps} path={path} render={(props) => <Component {...props} />} />;
}

export default ReservedRoute;
