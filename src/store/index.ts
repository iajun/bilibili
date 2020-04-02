/*
 * @Date: 2020-03-31 16:26:43
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 10:58:45
 */
import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './reducers/';
import thunkMiddleware from 'redux-thunk';

import { Partition } from './actions/partition';
import Video from '@model/video';

export interface DefaultRootStore {
  partitionList: Partition[];
  videoRankingList: Video[];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (initialStore: DefaultRootStore) =>
  createStore(
    reducers,
    initialStore,
    compose(applyMiddleware(thunkMiddleware)),
  );
