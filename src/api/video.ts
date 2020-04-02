/*
 * @Date: 2020-04-02 00:48:26
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-04-02 10:10:03
 */
import URL from './url';
import Video from '@model/video';
import fetch from '@util/fetch';

export async function getRankingIndexVideos() {
  const data: any = await fetch({
    url: URL.VIDEO_RANKING_INDEX,
  });

  return data.map((video: any) => Video.createVideoFromRankingVideos(video));
}
