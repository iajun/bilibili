/*
 * @Date: 2020-03-19 22:40:13
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 11:19:36
 */

import * as path from 'path';

export function resolveFromRoot(...relativePaths: string[]) {
  return path.resolve(__dirname, '../..', ...relativePaths);
}

export function resolveFromSrc(...relativePaths: string[]) {
  return path.resolve(__dirname, '..', ...relativePaths);
}
