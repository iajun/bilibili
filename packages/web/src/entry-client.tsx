import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import App from './App';

const Root = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

loadableReady(() => {
  hydrate(<Root />, document.getElementById('app') as HTMLElement);
});

if (module.hot) {
  module.hot.accept();
}
