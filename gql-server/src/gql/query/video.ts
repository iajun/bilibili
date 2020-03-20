/*
 * @Date: 2020-03-20 09:13:30
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-20 11:19:32
 */

import {
  getRankingVideos,
  getRankingRegionVideos,
  VideoProps,
  Video,
} from '@api/video';

function mapKeys(params: Video[]) {
  return params.map(
    ({
      aid: vid,
      author,
      duration,
      pic,
      play,
      title,
      video_review: review,
    }) => {
      return { vid, author, duration, pic, play, title, review };
    },
  );
}

export async function rankingVideos(context: any, params?: VideoProps) {
  const defaultParams = {
    rid: 0,
    day: 3,
  };

  const videos = await getRankingVideos({ ...defaultParams, ...params });

  return mapKeys(videos);
}

export async function rankingRegionVideos(context: any, params: VideoProps) {
  params.day = params.day || 7;
  return mapKeys(await getRankingRegionVideos(params));
}
