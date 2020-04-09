/*
 * @Date: 2020-03-31 15:50:18
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 11:54:09
 */

import { Partition } from '@api/partition';

export interface NavPartitionData extends Partition {
  href: string;
}

const toRouteMap = {
  '-1': '/',
  '-2': '/unknown1',
  '-3': '/unknown2',
};

export function transformPartitionData(
  partitionList: Partition[],
): NavPartitionData[] {
  const idxPartition: Partition[] = [
    {
      tid: '-1',
      typename: '首页',
      subPartition: [],
    },
  ];

  const tailPartition: Partition[] = [
    {
      tid: '-2',
      typename: '直播',
      subPartition: [],
    },
    {
      tid: '-3',
      typename: '相簿',
      subPartition: [],
    },
  ];

  const tmp = idxPartition.concat(partitionList).concat(tailPartition);

  return tmp.map((partition) => {
    if (+partition.tid > 0) {
      return {
        ...partition,
        href: `/channel/${partition.tid}`,
      };
    } else {
      return {
        ...partition,
        href: (toRouteMap as any)[partition['tid']],
      };
    }
  });
}
