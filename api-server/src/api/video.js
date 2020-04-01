/*
 * @Date: 2020-04-01 22:28:29
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 00:07:45
 */
const fetch = require('../lib/fetch');
const URL = require('./url');
const Err = require('../lib/error');

exports.fetchRankingVideos = async function (params = {}) {
  const { offset = 0, limit = 4 } = params;

  data = await fetch({
    url: URL.RANKING_INDEX,
  });

  if (!data || !data.data || !data.data.list) {
    throw new Error(Err.FETCH_VIDEO_LIST_ERROR);
  }

  const ret = data.data.list || [];

  return ret.length > 3 ? ret.slice(offset, limit) : ret;
};

exports.fetchRankingRegionVideos = async function (params) {
  const reqParams = {
    rid: params.rid,
    day: params.day || 3,
  };
  const { offset = 0, limit = 4 } = params;

  data = await fetch({ url: URL.RANKING_REGION, params: reqParams });

  if (!data || !data.data) {
    throw new Error(Err.FETCH_VIDEO_LIST_ERROR);
  }

  const ret = data.data;

  return ret.length > 4 ? ret.slice(offset, limit) : ret;
};
