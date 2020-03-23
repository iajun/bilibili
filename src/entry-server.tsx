import React from 'react';
import Root from './App';
import { routes } from '@router/index';
import { StaticRouter as Router } from 'react-router-dom';
import client from '../lib/graphqlClient';
import { ApolloProvider } from '@apollo/react-common';

const createApp = (location: string, context: object = {}) => {
  const App = () => (
    <ApolloProvider client={client}>
      <Router context={context} location={location}>
        <Root />
      </Router>
    </ApolloProvider>
  );
  return <App />;
};

export { createApp, routes, client };
