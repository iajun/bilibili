/*
 * @Date: 2020-03-24 13:22:12
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-24 14:04:45
 */
import { partitionList } from '../query/partition';

export function subPartition(_: any) {
  return partitionList(null, { tid: _.tid });
}
