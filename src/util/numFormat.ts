/*
 * @Date: 2020-03-30 16:39:57
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-30 16:47:18
 */
export function numFormat(num: number) {
  if (num < 10000) {
    return num;
  } else {
    return `${(num / 10000).toFixed(1)}万`;
  }
}