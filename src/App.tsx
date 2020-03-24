import { Header } from '@components/index';
import { NestedRoute, routes } from '@router/index';
import { Switch } from 'react-router-dom';
import React, { Fragment, SFC } from 'react';

const App: SFC<{}> = () => {
  return (
    <Fragment>
      <Header />
      <Switch>
        {routes.map((route) => (
          <NestedRoute {...route} key={route.path as string} />
        ))}
      </Switch>
    </Fragment>
  );
};

export default App;
