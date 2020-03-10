import React, { SFC } from 'react';
import { Route, RouteProps } from 'react-router-dom';

const NestedRoute: SFC<RouteProps> = route => {
  return (
    <Route path={route.path} exact={route.exact} component={route.component} />
  );
};

export default NestedRoute;
