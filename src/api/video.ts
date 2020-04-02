/* eslint-disable @typescript-eslint/camelcase */
/*
 * @Date: 2020-04-02 00:48:26
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 17:00:02
 */
import URL from './url';
import Video from '@model/video';
import fetch from '@util/fetch';

export async function getRankingIndexVideos() {
  const data: any = await fetch({
    url: URL.VIDEO_RANKING_LIST,
    params: {
      limit: 40,
    },
  });

  return data.map((video: any) => Video.createVideoFromRankingVideos(video));
}

export async function getVideoInfo(params = {}) {
  const data: any = await fetch({
    url: URL.VIDEO_INFO,
    params,
  });

  const tags = (data.videoTags as any[]).map(({ tag_id, tag_name }) => ({
    id: tag_id,
    name: tag_name,
  }));

  data.videoTags = tags;

  return Video.createVideoFromVideoInfo(data);
}
