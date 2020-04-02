import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import React from 'react';
import Video from '@model/video';
import styles from './index.scss?modules';

interface LocationState {
  videoItem: Video;
}

export type VideoDetailProps = RouteComponentProps<{}, {}, LocationState>;

const VideoDetail: React.SFC<VideoDetailProps> = (props) => {
  const { title } = props.location.state.videoItem;

  // console.log(props.location.state.videoItem);

  return (
    <div>
      <span className={styles['video-title']}>{title}</span>
    </div>
  );
};

export default withRouter(VideoDetail);
