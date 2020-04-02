/*
 * @Date: 2020-04-02 00:21:24
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 11:23:59
 */
import * as actionTypes from '../action-types';
import { Partition } from '@api/partition';

export function setPartitionList(partitions: Partition[]) {
  return {
    type: actionTypes.SET_PARTITION_LIST,
    partitions,
  };
}
