/*
 * @Date: 2020-03-19 22:54:47
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-24 12:21:44
 */
import { getIndexHtml } from '@api/index';
import extractState from '@util/extractState';

interface PartitionListArgs {
  tid?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function partitionList(context: any, args: PartitionListArgs) {
  const store = extractState(await getIndexHtml());
  const partitionList = store.partitionList || [];
  if (!args.tid) return partitionList[0] || [];
  return partitionList[args.tid] || [];
}
