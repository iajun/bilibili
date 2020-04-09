import { numFormat } from '@util/numFormat';
import Icon from '@components/core/icon';
import React, { SFC } from 'react';
import Video from '@model/video';
import classnames from 'classnames';
import styles from './index.scss?modules';

export interface VideoItemProps {
  videoItem: Video;
  cname?: string;
}

const URL_PREFIX = process.env.URL_PREFIX;

const VideoItem: SFC<VideoItemProps> = ({ videoItem, cname }) => {
  const { aid: vid, pic, title, play, review } = videoItem;
  return (
    <article className={classnames(styles.video, cname)}>
      <a href={`/video/av${vid}`}>
        <img src={`${URL_PREFIX}/proxy?type=image&url=${pic}`} className={styles['video-image']} />
      </a>
      <figure className={styles['video-banner']}>
        <span>
          <Icon name="icon-bofangshu" />
          {numFormat(play)}
        </span>
        <span>
          <Icon name="icon-danmushu" />
          {numFormat(review)}
        </span>
      </figure>
      <p>{title}</p>
    </article>
  );
};

export default VideoItem;
