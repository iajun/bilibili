import { Link } from 'react-router-dom';
import { numFormat } from '@util/numFormat';
import Icon from '@components/core/icon';
import React, { SFC } from 'react';
import classnames from 'classnames';
import styles from './index.scss?modules';

export interface VideoItemProps {
  vid: number;
  pic: string;
  title: string;
  cname?: string;
  play: number;
  review: number;
}

export interface CVideoItemProps {
  videoItem: VideoItemProps;
}

const VideoItem: SFC<CVideoItemProps> = ({ videoItem }) => {
  const { vid, pic, title, cname, play, review } = videoItem;
  return (
    <article className={classnames(styles.video, cname)}>
      <Link
        to={{
          pathname: `/video/av${vid}`,
          state: {
            videoItem,
          },
        }}>
        <img src={pic} className={styles['video-image']} />
      </Link>
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
