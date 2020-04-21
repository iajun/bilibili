/*
 * @Date: 2020-04-02 00:37:14
 * @Author: Sharp
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-21 15:44:06
 */
import { AnyAction, Dispatch } from 'redux';
import { getPartitionList, getRankingIndexVideos } from '@api/index';
import { setPartitionList, setRankingIndexVideos } from '../actions';

export function getIndexPageData() {
  return async (dispatch: Dispatch<AnyAction>) => {
    const [{ data: partitionList }, rangkingVideos] = await Promise.all([getPartitionList(), getRankingIndexVideos()]);

    dispatch(setPartitionList(partitionList));
    dispatch(setRankingIndexVideos(rangkingVideos));
  };
}
