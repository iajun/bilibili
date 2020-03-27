import { Header } from '@components/index';
import { NestedRoute, routes } from '@router/index';
import { Switch } from 'react-router-dom';
import React, { Fragment, SFC } from 'react';

const files = require.context('./assets/icon', false, /\.svg$/);
files.keys().forEach(files);

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
