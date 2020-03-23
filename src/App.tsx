import { NestedRoute, routes } from '@router/index';
import { Switch } from 'react-router-dom';
import React, { SFC } from 'react';

const App: SFC<{}> = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <NestedRoute {...route} key={route.path as string} />
      ))}
    </Switch>
  );
};

export default App;
