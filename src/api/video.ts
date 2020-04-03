/* eslint-disable @typescript-eslint/camelcase */
/*
 * @Date: 2020-04-02 00:48:26
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-03 22:43:27
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

  const tags = (data.data.videoTags as any[]).map(({ tag_id, tag_name }) => ({
    id: tag_id,
    name: tag_name,
  }));

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

  return data.data.data.map((videoInfo: any) => Video.createVideoFromVideoInfo({ videoInfo }));
}
