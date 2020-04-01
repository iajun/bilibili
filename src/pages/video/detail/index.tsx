import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { VideoItemProps } from '@components/index';
import React from 'react';
import styles from './index.scss?modules';

interface LocationState {
  videoItem: VideoItemProps;
}

export interface VideoDetailProps
  extends RouteComponentProps<{}, {}, LocationState> {
  name: string;
}

const VideoDetail: React.SFC<VideoDetailProps> = (props) => {
  console.log(props);
  const { title } = props.location.state.videoItem;

  // console.log(props.location.state.videoItem);

  return (
    <div>
      <span className={styles['video-title']}>{title}</span>
    </div>
  );
};

export default withRouter(VideoDetail);
