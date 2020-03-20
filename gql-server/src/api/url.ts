/*
 * @Date: 2020-03-19 23:00:30
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-20 12:23:31
 */

// index nav data
export const URL_INDEX = 'https://m.bilibili.com/index.html';
// video data list in index ranking
export const URL_RANKING = 'https://api.bilibili.com/x/web-interface/ranking';
// video list in different regions
export const URL_RANKING_REGION =
  'https://api.bilibili.com/x/web-interface/ranking/region';
// video url (tag)
export const URL_VIDEO = (aid: number | string) =>
  `https://m.bilibili.com/video/av${aid}`;
