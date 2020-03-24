/*
 * @Date: 2020-03-24 00:44:52
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-24 09:52:27
 */

import { QueryRankingVideosArgs } from '../../typings/types';
import { gql } from 'apollo-boost';

export function getVideoList(args?: QueryRankingVideosArgs) {
  if (!args || !args.rid) {
    return gql`
      {
        rankingVideos {
          vid
        }
      }
    `;
  } else {
    return gql`
      {
        rankingVideos(rid: 0, day: 3) {
          vid
          author
          duration
          pic
          play
          title
          review
          ctime
        }
      }
    `;
  }
}
