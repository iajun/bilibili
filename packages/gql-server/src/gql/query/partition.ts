/*
 * @Date: 2020-03-19 22:54:47
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 11:26:07
 */
import { getIndexHtml } from '../../api/index';
import extractState from '../../util/extractState';

interface PartitionListArgs {
  tid?: string;
}

export async function partitionList(context: any, args: PartitionListArgs) {
  const store = extractState(await getIndexHtml());
  const partitionList = store.partitionList || [];
  if (!args.tid) return partitionList[0] || [];
  return partitionList[args.tid] || [];
}
