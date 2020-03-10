import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (initialStore: { firstReducer?: { name?: string } }) =>
  createStore(reducers, initialStore, applyMiddleware(thunkMiddleware));
