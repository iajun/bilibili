import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers/';
import thunkMiddleware from 'redux-thunk';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (initialStore: { firstReducer?: { name?: string } }) =>
  createStore(reducers, initialStore, applyMiddleware(thunkMiddleware));
