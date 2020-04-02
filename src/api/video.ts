/*
 * @Date: 2020-04-02 00:48:26
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 12:20:21
 */
import URL from './url';
import Video from '@model/video';
import fetch from '@util/fetch';

export async function getRankingIndexVideos() {
  const data: any = await fetch({
    url: URL.VIDEO_RANKING_INDEX,
    params: {
      limit: 40,
    },
  });

  return data.map((video: any) => Video.createVideoFromRankingVideos(video));
}
