/*
 * @Date: 2020-03-24 00:44:52
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-24 15:09:21
 */
import { gql } from 'apollo-boost';

export const VIDEO_LIST = gql`
  query videoList($rid: ID, $day: Int, $offset: Int, $limit: Int) {
    rankingVideos(rid: $rid, day: $day, offset: $offset, limit: $limit) {
      vid
      author
      duration
      pic
      play
      title
      review
    }
  }
`;
