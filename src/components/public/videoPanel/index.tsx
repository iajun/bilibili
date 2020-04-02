import { Panel, PanelProps, VideoItem } from '@components/index';
import React, { SFC } from 'react';
import Video from '@model/video';
import styles from './index.scss?modules';

export interface VideoPanelProps extends PanelProps {
  videoList: Video[];
}

const VideoPanel: SFC<VideoPanelProps> = ({ videoList, title, subTitle }) => {
  return (
    <Panel title={title} subTitle={subTitle}>
      <div className={styles['video-wrapper']}>
        {videoList.map((videoItem) => (
          <VideoItem key={videoItem.aid} videoItem={videoItem} />
        ))}
      </div>
    </Panel>
  );
};

export default VideoPanel;
