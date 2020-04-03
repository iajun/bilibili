/*
 * @Date: 2020-03-31 16:26:43
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 18:22:26
 */
import * as actionTypes from './action-types';
import { AnyAction, Reducer } from 'redux';
import { Partition } from '@api/partition';
import { combineReducers } from 'redux';
import Video from '@model/video';

export const initialStore = {
  partitionList: [],
  videoRankingIndexList: [],
  currentVideo: {
    aid: '',
    bid: '',
    cid: '',
    title: '',
    author: '',
    coins: 0,
    duration: '',
    pic: '',
    play: 0,
    review: 0,
    danmu: 0,
    src: '',
    ctime: '',
    desc: '',
    relatedList: [],
    tags: [],
  },
};

const partitionReducer: Reducer<Partition[]> = (state = initialStore.partitionList, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.SET_PARTITION_LIST:
      return action.partitions;
    default:
      return state;
  }
};

const videoReducer: Reducer<Video[]> = (state = initialStore.videoRankingIndexList, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.SET_RANKING_INDEX_VIDEO:
      return action.videoList;
    default:
      return state;
  }
};

const currentVideoReducer: Reducer<typeof initialStore.currentVideo> = (
  state = initialStore.currentVideo,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_VIDEO_INFO:
      return { ...state, ...action.videoInfo };
    case actionTypes.SET_CURRENT_RELATED_VIDEO:
      return { ...state, relatedList: action.relatedList };

    default:
      return state;
  }
};

const combinedStore = combineReducers({
  // nav partitions
  partitionList: partitionReducer,
  // index page of videos
  videoRankingIndexList: videoReducer,
  // video play page
  currentVideo: currentVideoReducer,
});

export default combinedStore;
