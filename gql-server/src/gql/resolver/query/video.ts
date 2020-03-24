/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Date: 2020-03-20 09:13:30
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-24 16:11:37
 */

import {
  Video,
  VideoTag,
  getRankingRegionVideos,
  getRankingVideos,
  getVideoTags,
} from '@api/video';

import { QueryRankingVideosArgs } from '../../../../typings/types';
import config from '../../../config';

const {
  apiServer: { host },
} = config;

function mapVideoKeys(params: Video[]) {
  return params.map(
    ({
      aid: vid,
      author,
      duration,
      pic,
      play,
      title,
      video_review: review,
      description,
    }) => {
      return {
        vid,
        author,
        duration,
        pic: `//${host}/transfer/img?url=${pic}`,
        play,
        title,
        review,
        description,
      };
    },
  );
}

function mapVideoTagKeys(params: VideoTag[]) {
  return params.map(({ tag_id: tid, tag_name: name, cover, type }) => ({
    tid,
    name,
    cover,
    type,
  }));
}

async function _getRankingIndexVideos(context: any, params?: any) {
  const defaultParams = {
    rid: 0,
    day: 3,
  };

  const videos = await getRankingVideos(Object.assign(defaultParams, params));

  return mapVideoKeys(videos).slice(params.offset, params.limit);
}

async function _getRankingRegionVideos(context: any, params: any) {
  params.day = params.day || 7;
  return mapVideoKeys(
    await getRankingRegionVideos({
      day: params.day || 7,
      rid: Number(params.rid),
    }),
  ).slice(params.offset, params.limit);
}

export async function rankingVideos(
  context: any,
  params?: QueryRankingVideosArgs,
) {
  params = params || {};
  params = { offset: 0, limit: 10, ...params };
  if (!params.rid) {
    return await _getRankingIndexVideos(context, params);
  } else {
    return await _getRankingRegionVideos(context, params);
  }
}

export async function videoTags(context: any, params: { aid: string }) {
  return mapVideoTagKeys(await getVideoTags(params.aid));
}
