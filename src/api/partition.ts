/*
 * @Date: 2020-04-02 00:42:00
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 11:23:18
 */
import { AxiosPromise } from 'axios';
import URL from './url';
import fetch from '@util/fetch';

export interface Partition {
  tid: string;
  typename: string;
  subPartition: Partition[];
}

export function getPartitionList(): AxiosPromise<Partition[]> {
  return fetch({
    url: URL.PARTITION,
  });
}
