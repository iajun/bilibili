import React from 'react';
import Root from './App';
import { routes } from '@router/index';
import { StaticRouter as Router } from 'react-router-dom';

const createApp = (location: string, context: object = {}) => {
  const App = () => (
    <Router context={context} location={location}>
      <Root />
    </Router>
  );
  return <App />;
};

export { createApp, routes };
