/*
 * @Date: 2020-03-23 22:20:11
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-23 22:29:47
 */
import { gql } from 'apollo-boost';

export function getPartitionList(id?: string) {
  if (!id) {
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
        partitionList(tid: id) {
          tid
          typename
        }
      }
    `;
  }
}
