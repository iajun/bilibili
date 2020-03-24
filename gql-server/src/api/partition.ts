/*
 * @Date: 2020-03-19 23:00:51
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-19 23:30:42
 */
import { URL_INDEX } from './url';
import request from '@util/request';

export function getIndexHtml(): Promise<string> {
  return request({ url: URL_INDEX });
}
