import React, { SFC } from 'react';
import {
  Panel,
  VideoItem,
  VideoItemProps,
  PanelProps,
} from '@components/index';
import styles from './index.scss?modules';

export interface VideoPanelProps extends PanelProps {
  videoList: Array<VideoItemProps>;
}

const VideoPanel: SFC<VideoPanelProps> = ({ videoList, title, subTitle }) => {
  return (
    <Panel title={title} subTitle={subTitle}>
      <div className={styles['video-wrapper']}>
        {videoList.map(({ src, title }) => (
          <VideoItem
            src={src}
            title={title}
            key={src}
            cname={styles['video-item']}
          />
        ))}
      </div>
    </Panel>
  );
};

export default VideoPanel;
