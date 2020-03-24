import React, { SFC } from 'react';
import classnames from 'classnames';
import styles from './index.scss?modules';

export interface VideoItemProps {
  pic: string;
  title: string;
  cname?: string;
}

const VideoItem: SFC<VideoItemProps> = ({ pic, title, cname }) => {
  return (
    <article className={classnames(styles.video, cname)}>
      <img src={pic} />
      <p>{title}</p>
    </article>
  );
};

export default VideoItem;
