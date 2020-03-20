/*
 * @Date: 2020-03-20 09:09:05
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-20 12:40:02
 */
import { URL_RANKING, URL_RANKING_REGION, URL_VIDEO } from './url';
import request from '@util/request';
import extractState from '@util/extractState';

export interface VideoProps {
  rid: number;
  day: number;
}

export interface VideoTag {
  tag_id: number;
  tag_name: string;
  cover: string;
  head_cover: string;
  content: string;
  short_content: string;
  type: number;
  state: number;
  ctime: number;
  count: { view: number; use: number; atten: number };
  is_atten: number;
  likes: number;
  hates: number;
  attribute: number;
  liked: number;
  hated: number;
}

export interface Video {
  aid: number;
  author: string;
  duration: string;
  pic: string;
  play: number;
  title: string;
  video_review: number;
  description: string;
  create: string;
}

export async function getRankingVideos(params?: VideoProps): Promise<Video[]> {
  const url = params && params.rid ? `${URL_RANKING}/region` : URL_RANKING;

  const ret = await request({
    url,
    params,
  });

  if (ret.code !== 0 || !ret.data || !ret.data.list) {
    return [];
  }

  return ret.data.list || [];
}

export async function getRankingRegionVideos(
  params: VideoProps,
): Promise<Video[]> {
  const ret = await request({
    url: URL_RANKING_REGION,
    params,
  });

  if (ret.code !== 0 || !ret.data) {
    return [];
  }

  return ret.data || [];
}

export async function getVideoTags(aid: string): Promise<VideoTag[]> {
  const data = extractState(
    await request({
      url: URL_VIDEO(aid),
    }),
  );
  if (!data.reduxAsyncConnect || !data.reduxAsyncConnect.videoTag) {
    return [];
  }
  return data.reduxAsyncConnect.videoTag;
}
