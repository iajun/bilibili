/*
 * @Date: 2020-03-23 22:20:11
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-24 01:13:30
 */
import { QueryPartitionListArgs } from '../../typings/types';
import { gql } from 'apollo-boost';

export function getPartitionList(args?: QueryPartitionListArgs) {
  if (!args || !args.tid) {
    return gql`
      {
        partitionList {
          tid
          typename
        }
      }
    `;
  } else {
    return gql`
      {
        partitionList(tid: arg.tid) {
          tid
          typename
        }
      }
    `;
  }
}
