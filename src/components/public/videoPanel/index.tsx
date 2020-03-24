import {
  Panel,
  PanelProps,
  VideoItem,
  VideoItemProps,
} from '@components/index';
import React, { SFC } from 'react';
import styles from './index.scss?modules';

export interface VideoPanelProps extends PanelProps {
  videoList: Array<VideoItemProps>;
}

const VideoPanel: SFC<VideoPanelProps> = ({ videoList, title, subTitle }) => {
  return (
    <Panel title={title} subTitle={subTitle}>
      <div className={styles['video-wrapper']}>
        {videoList.map(({ pic, title }) => (
          <VideoItem key={title} pic={pic} title={title} />
        ))}
      </div>
    </Panel>
  );
};

export default VideoPanel;
