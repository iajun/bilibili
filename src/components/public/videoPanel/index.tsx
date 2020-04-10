import { Panel, PanelProps, VideoItem } from '@components/index';
import { RouterProps } from '@typings/global';
import { getImageSuffix } from '@util/getImageSuffix';
import { withRouter } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import React, { SFC } from 'react';
import Video from '@model/video';
import styles from './index.scss?modules';

export interface VideoPanelProps extends RouterProps, PanelProps {
  videoList: Video[];
}

const VideoPanel: SFC<VideoPanelProps> = ({ videoList, title, subTitle, cname, staticContext }) => {
  let suffix = '';
  if (staticContext) {
    suffix = staticContext.imageSuffix;
  } else {
    suffix = getImageSuffix();
  }

  return (
    <Panel title={title} subTitle={subTitle} cname={cname}>
      <div className={styles['video-wrapper']}>
        {videoList.map((videoItem) => (
          <LazyLoad key={videoItem.aid} overflow={true} height={200}>
            <VideoItem key={videoItem.aid} videoItem={videoItem} suffix={suffix} />
          </LazyLoad>
        ))}
      </div>
    </Panel>
  );
};

export default withRouter(VideoPanel);
