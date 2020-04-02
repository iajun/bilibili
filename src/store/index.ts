/*
 * @Date: 2020-03-31 16:26:43
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 11:54:52
 */
import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (initialStore: any) =>
  createStore(
    reducers,
    initialStore,
    compose(applyMiddleware(thunkMiddleware)),
  );
