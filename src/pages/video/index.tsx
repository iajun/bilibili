import { initialStore } from '@store/reducers';
import { useSelector } from 'react-redux';
import React, { SFC } from 'react';
import VideoDetail from './detail';
import VideoPlayer from './player';
import styles from './index.scss?modules';

const VideoPage: SFC<{}> = () => {
  const curVideo = useSelector<typeof initialStore, typeof initialStore.currentVideo>((state) => state.currentVideo);

  return (
    <div className={styles['main-area-layout']}>
      <VideoPlayer video={curVideo} />
      <VideoDetail video={curVideo} />
    </div>
  );
};

export default VideoPage;
