/*
 * @Date: 2020-04-02 11:18:50
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 11:27:05
 */

import { AnyAction, Dispatch } from 'redux';
import { getPartitionList } from '@api/index';
import { setPartitionList } from '../actions';

export function getChannelPageData() {
  return async (dispatch: Dispatch<AnyAction>) => {
    const promises = [getPartitionList()];
    let ret1;

    try {
      [ret1] = await Promise.all(promises);
    } catch (error) {
      ret1 = [];
    }

    dispatch(setPartitionList(ret1 as any));
  };
}
