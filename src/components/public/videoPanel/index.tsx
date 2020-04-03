import { Panel, PanelProps, VideoItem } from '@components/index';
import LazyLoad from 'react-lazyload';
import React, { SFC } from 'react';
import Video from '@model/video';
import styles from './index.scss?modules';

export interface VideoPanelProps extends PanelProps {
  videoList: Video[];
}

const VideoPanel: SFC<VideoPanelProps> = ({ videoList, title, subTitle, cname }) => {
  return (
    <Panel title={title} subTitle={subTitle} cname={cname}>
      <div className={styles['video-wrapper']}>
        {videoList.map((videoItem) => (
          <LazyLoad key={videoItem.aid} overflow={true} height={200}>
            <VideoItem videoItem={videoItem} />
          </LazyLoad>
        ))}
      </div>
    </Panel>
  );
};

export default VideoPanel;
