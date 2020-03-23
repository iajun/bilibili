import { ApolloProvider } from '@apollo/react-common';
import { StaticRouter as Router } from 'react-router-dom';
import { routes } from '@router/index';
import React from 'react';
import Root from './App';
import client from '../lib/graphqlClient';

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
