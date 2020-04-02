/*
 * @Date: 2020-03-31 16:26:43
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 01:35:59
 */
import * as actionTypes from '../action-types';
import { AnyAction, Reducer } from 'redux';
import { Partition } from '../actions/partition';

const partitionReducer: Reducer<Partition[]> = (
  initialState = [],
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.SET_PARTITION_LIST:
      return action.partitions;
    default:
      return initialState;
  }
};

export default partitionReducer;