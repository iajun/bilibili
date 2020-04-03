/*
 * @Date: 2020-03-30 16:39:57
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 12:20:39
 */
import moment from 'moment';
export function numFormat(num: number) {
  if (num < 10000) {
    return num;
  } else {
    return `${(num / 10000).toFixed(1)}万`;
  }
}

export function formatSeconds(seconds: number | string) {
  const duration = moment.duration(seconds, 'seconds');
  const formatDuration = (du: number) => (du < 10 ? '0' + du : '' + du);
  return `${formatDuration(duration.get('m'))}:${formatDuration(duration.get('s'))}`;
}
