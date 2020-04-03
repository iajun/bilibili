/*
 * @Date: 2020-04-02 11:18:50
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 22:28:42
 */

import { AnyAction, Dispatch } from 'redux';
import { getPartitionList, getRankingIndexVideos } from '@api/index';
import { setChannelVideoList, setPartitionList } from '../actions';

export function getChannelPageData(params: any) {
  return async (dispatch: Dispatch<AnyAction>) => {
    const rid = params.cid;
    const { data: partitionList } = await getPartitionList();

    const curPartition = partitionList.filter(({ tid }) => +tid === +rid)[0];

    // promises

    const typenameList = [curPartition.typename];
    const channelVideoList = [];

    const subPartitionPromises = curPartition.subPartition.map(({ tid, typename }) => {
      typenameList.push(typename);
      return getRankingIndexVideos({ rid: tid, limit: 4 });
    });

    const partitionVideoList = await Promise.all(
      [getRankingIndexVideos({ rid, limit: 4 })].concat(subPartitionPromises),
    );

    for (let idx = 0, len = typenameList.length; idx < len; idx++) {
      channelVideoList.push({
        typename: typenameList[idx],
        videoList: partitionVideoList[idx],
      });
    }

    dispatch(setPartitionList(partitionList));
    dispatch(setChannelVideoList(channelVideoList));
  };
}
