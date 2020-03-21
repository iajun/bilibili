import React, { SFC } from 'react';
import { Switch } from 'react-router-dom';
import { NestedRoute, routes } from '@router/index';
import svgSpriteLoader from './plugins/svg-sprite-loader';

svgSpriteLoader();

const App: SFC<{}> = () => {
  return (
    <Switch>
      {routes.map(route => (
        <NestedRoute {...route} key={route.path as string} />
      ))}
    </Switch>
  );
};

export default App;
