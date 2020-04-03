/*
 * @Date: 2020-04-02 14:57:01
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 17:42:38
 */

import * as actionTypes from './action-types';
import { Partition } from '@api/partition';
import Video from '@model/video';

// index ranking videos
export function setRankingIndexVideos(videoList: Array<Video>) {
  return {
    type: actionTypes.SET_RANKING_INDEX_VIDEO,
    videoList,
  };
}

// current playing video
export function setCurrentVideoInfo(videoInfo: Video) {
  return {
    type: actionTypes.SET_CURRENT_VIDEO_INFO,
    videoInfo,
  };
}

// current related video
export function setCurrentRelatedVideoList(relatedList: Video[]) {
  return {
    type: actionTypes.SET_CURRENT_RELATED_VIDEO,
    relatedList,
  };
}

// nav partitions
export function setPartitionList(partitions: Partition[]) {
  return {
    type: actionTypes.SET_PARTITION_LIST,
    partitions,
  };
}
