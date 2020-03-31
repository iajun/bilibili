import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './reducers/';
import thunkMiddleware from 'redux-thunk';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (initialStore: any) =>
  createStore(
    reducers,
    initialStore,
    compose(applyMiddleware(thunkMiddleware)),
  );
