/*
 * @Date: 2020-03-20 09:09:05
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-20 11:17:03
 */
import { URL_RANKING, URL_RANKING_REGION } from './url';
import request from '@util/request';

export interface VideoProps {
  rid: number;
  day: number;
}

export interface Video {
  aid: number;
  author: string;
  duration: string;
  pic: string;
  play: number;
  title: string;
  video_review: number;
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
