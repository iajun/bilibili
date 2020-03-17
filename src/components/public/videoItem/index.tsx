import React, { SFC } from 'react';
import classnames from 'classnames';
import styles from './index.scss?modules';

export interface VideoItemProps {
  src: string;
  title: string;
  cname?: string;
}

const VideoItem: SFC<VideoItemProps> = ({ src, title, cname }) => {
  return (
    <article className={classnames(styles.video, cname)}>
      <img src={src} />
      <p>{title}</p>
    </article>
  );
};

export default VideoItem;
