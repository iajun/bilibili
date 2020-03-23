import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import App from './App';
import client from '../lib/graphqlWebClient ';
import { ApolloProvider } from '@apollo/react-common';

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
