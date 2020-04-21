/* eslint-disable @typescript-eslint/camelcase */
/*
 * @Date: 2020-04-02 00:48:26
 * @Author: Sharp
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-21 16:04:44
 */
import URL from './url';
import Video from '@model/video';
import fetch from '@util/fetch';

export async function getRankingIndexVideos(params = {}): Promise<Video[]> {
  const data = await fetch({
    url: URL.VIDEO_RANKING_LIST,
    params: {
      limit: 40,
      ...params,
    },
  });

  return data.data.map((video: any) => Video.createVideoFromRankingVideos(video));
}

export async function getVideoInfo(params = {}): Promise<Video> {
  const data = await fetch({
    url: URL.VIDEO_INFO,
    params,
  });

  let tags: any[] = [];
  if (data.data.videoTags && Array.isArray(data.data.videoTags)) {
    tags = (data.data.videoTags as any[]).map(({ tag_id, tag_name }) => ({
      id: tag_id,
      name: tag_name,
    }));
  }

  return Video.createVideoFromVideoInfo({
    videoInfo: data.data.videoInfo,
    videoTags: tags,
  });
}

export async function getVideoRelatedList(params = {}): Promise<Video[]> {
  const data = await fetch({
    url: URL.VIDEO_RELATED,
    params,
  });

  return data.data.map((videoInfo: any) => Video.createVideoFromVideoInfo({ videoInfo }));
}

export interface Barrage {
  type: number;
  text: string;
  time: number;
  sendTime: number;
  color: string;
}

export async function getVideoBarrageList(cid: string): Promise<Barrage[]> {
  const data = await fetch({
    url: URL.VIDEO_BARRAGE,
    params: {
      cid,
    },
  });

  return data.data;
}
