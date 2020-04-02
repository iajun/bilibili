import { Provider } from 'react-redux';
import { StaticRouter as Router } from 'react-router-dom';
import { routes } from '@router/index';
import React from 'react';
import Root from './App';
import createStore from '@store/index';

const createApp = (location: string, context: object = {}, store: any) => {
  const App = () => (
    <Provider store={store}>
      <Router context={context} location={location}>
        <Root />
      </Router>
    </Provider>
  );
  return <App />;
};

export { createApp, routes, createStore };
