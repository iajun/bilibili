import { ApolloProvider } from '@apollo/react-common';
import { BrowserRouter as Router } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import App from './App';
import React from 'react';
import client from '../lib/graphqlWebClient ';

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  );
};

loadableReady(() => {
  hydrate(<Root />, document.getElementById('app') as HTMLElement);
});

if (module.hot) {
  module.hot.accept();
}
