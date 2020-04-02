/*
 * @Date: 2020-03-31 16:26:43
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 10:19:21
 */
import * as actionTypes from '../action-types';
import { AnyAction, Reducer } from 'redux';
import Video from '@model/video';

const videoReducer: Reducer<Video[]> = (
  initialState = [],
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.SET_RANKING_INDEX_VIDEO:
      return action.videoList;
    default:
      return initialState;
  }
};

export default videoReducer;
