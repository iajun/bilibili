/*
 * @Date: 2020-04-02 00:55:06
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 01:30:59
 */
import * as actionTypes from '../action-types';
import Video from '@model/video';

export function setRankingIndexVideos(videoList: Array<Video>) {
  return {
    type: actionTypes.SET_RANKING_INDEX_VIDEO,
    videoList,
  };
}
