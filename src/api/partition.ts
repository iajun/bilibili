/*
 * @Date: 2020-04-02 00:42:00
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 22:37:59
 */
import { AxiosPromise } from 'axios';
import URL from './url';
import fetch from '@util/fetch';

export interface Partition {
  tid: string | number;
  typename: string;
  subPartition: Partition[];
}

export function getPartitionList(): AxiosPromise<Partition[]> {
  const ret = fetch({
    url: URL.PARTITION,
  });
  return ret;
}
