/*
 * @Date: 2020-04-01 22:28:29
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 17:27:35
 */
const fetch = require('../lib/fetch');
const URL = require('./url');
const Err = require('../lib/error');
const { extractState } = require('../lib/util');

async function fetchRankingIndexVideos(params = {}) {
  const { offset = 0, limit = 20 } = params;

  const data = await fetch({
    url: URL.RANKING_INDEX,
  });

  if (!data || !data.data || !data.data.data || !data.data.data.list) {
    throw new Error(Err.FETCH_VIDEO_LIST_ERROR);
  }

  const ret = data.data.data.list || [];

  return ret.length > 3 ? ret.slice(offset, limit) : ret;
}

// index ranking videos
async function fetchRankingRegionVideos(params = {}) {
  const reqParams = {
    rid: params.rid,
    day: params.day || 3,
  };
  const { offset = 0, limit = 4 } = params;

  const data = await fetch({ url: URL.RANKING_REGION, params: reqParams });

  if (!data || !data.data || !data.data.data) {
    throw new Error(Err.FETCH_VIDEO_LIST_ERROR);
  }

  const ret = data.data.data;

  return ret.length > 4 ? ret.slice(offset, limit) : ret;
}

exports.fetchVideoList = async function (params = {}) {
  if (params.rid) {
    return fetchRankingRegionVideos(params);
  } else {
    return fetchRankingIndexVideos(params);
  }
};

// video play info in detail
exports.fetchVideoInfo = async function (aid) {
  const data = await fetch({ url: URL.VIDEO_PLAY + aid });

  if (!data.data) {
    throw new Error(Err.FETCH_VIDEO_INFO_ERROR);
  }

  return extractState(data.data);
};

exports.fetchRelatedVideo = async function (aid) {
  const data = await fetch({ url: URL.VIDEO_RELATED, params: { aid } });

  if (!data.data) {
    throw new Error(Err.VIDEO_INFO_AID_ERROR);
  }
  return data.data.data;
};
