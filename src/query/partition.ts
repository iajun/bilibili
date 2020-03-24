/*
 * @Date: 2020-03-23 22:20:11
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-24 14:28:33
 */
import { gql } from 'apollo-boost';

export const PARTITION_LIST = gql`
  query partitionList($tid: ID) {
    partitionList(tid: $tid) {
      tid
      typename
    }
  }
`;
