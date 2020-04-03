/*
 * @Date: 2020-04-02 00:37:14
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 22:37:15
 */
import { AnyAction, Dispatch } from 'redux';
import { getPartitionList, getRankingIndexVideos } from '@api/index';
import { setPartitionList, setRankingIndexVideos } from '../actions';

export function getIndexPageData() {
  return async (dispatch: Dispatch<AnyAction>) => {
    const [{ data: partitionList }, rankingVideos] = await Promise.all([getPartitionList(), getRankingIndexVideos()]);

    dispatch(setPartitionList(partitionList));
    dispatch(setRankingIndexVideos(rankingVideos));
  };
}
