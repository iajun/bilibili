/*
 * @Date: 2020-04-02 00:37:14
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 17:42:15
 */
import { AnyAction, Dispatch } from 'redux';
import { getPartitionList, getRankingIndexVideos } from '@api/index';
import { setPartitionList, setRankingIndexVideos } from '../actions';

export function getIndexPageData() {
  return async (dispatch: Dispatch<AnyAction>) => {
    const promises = [getPartitionList(), getRankingIndexVideos()];
    let ret1, ret2;

    try {
      [ret1, ret2] = await Promise.all(promises);
    } catch (error) {}

    dispatch(setPartitionList(ret1));
    dispatch(setRankingIndexVideos(ret2));
  };
}
