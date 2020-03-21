/*
 * @Date: 2020-03-20 09:13:30
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 11:27:36
 */

import {
  getRankingVideos,
  getRankingRegionVideos,
  getVideoTags,
  VideoProps,
  Video,
  VideoTag,
} from '../../api/video';

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
      create: ctime,
    }) => {
      return {
        vid,
        author,
        duration,
        pic,
        play,
        title,
        review,
        description,
        ctime,
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

export async function rankingVideos(context: any, params?: VideoProps) {
  const defaultParams = {
    rid: 0,
    day: 3,
  };

  const videos = await getRankingVideos({ ...defaultParams, ...params });

  return mapVideoKeys(videos);
}

export async function rankingRegionVideos(context: any, params: VideoProps) {
  params.day = params.day || 7;
  return mapVideoKeys(await getRankingRegionVideos(params));
}

export async function videoTags(context: any, params: { aid: string }) {
  return mapVideoTagKeys(await getVideoTags(params.aid));
}
