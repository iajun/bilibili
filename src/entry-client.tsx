import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import App from './App';
import React from 'react';
import createStore from '@store/index';

const Root = () => {
  const initialState = (window as any).__INITIAL_STATE__;
  const store = createStore(initialState);
  console.log(store.getState());
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

loadableReady(() => {
  hydrate(<Root />, document.getElementById('app') as HTMLElement);
});

if (module.hot) {
  module.hot.accept();
}
