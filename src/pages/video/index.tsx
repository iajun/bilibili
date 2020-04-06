import '@scss/layout.scss';
import { initialStore } from '@store/reducers';
import { useSelector } from 'react-redux';
import React, { SFC } from 'react';
import VideoDetail from './detail';
import VideoPlayer from './player';

const VideoPage: SFC<{}> = () => {
  const curVideo = useSelector<typeof initialStore, typeof initialStore.currentVideo>((state) => state.currentVideo);

  return (
    <div className="layout-header-main">
      <VideoPlayer video={curVideo} />
      <VideoDetail video={curVideo} />
    </div>
  );
};

export default VideoPage;
