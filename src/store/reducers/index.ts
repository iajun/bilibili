/*
 * @Date: 2020-03-31 16:26:43
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 10:53:09
 */
import { combineReducers } from 'redux';
import partitionReducer from './partition';
import videoReducer from './video';

const combinedStore = combineReducers({
  partitionList: partitionReducer,
  videoRankingIndexList: videoReducer,
});

export default combinedStore;
