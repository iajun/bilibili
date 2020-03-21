/*
 * @Date: 2020-03-19 23:00:51
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 11:25:04
 */
import request from '../util/request';
import { URL_INDEX } from './url';

export function getIndexHtml(): Promise<string> {
  return request({ url: URL_INDEX });
}
