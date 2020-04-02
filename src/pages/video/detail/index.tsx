import { Icon } from '@components/index';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { numFormat } from '@util/numFormat';
import { useSelector } from 'react-redux';
import React, { useCallback, useState } from 'react';
import Video from '@model/video';
import classnames from 'classnames';
import moment from 'moment';
import styles from './index.scss?modules';

interface LocationState {
  videoItem: Video;
}

export type VideoDetailProps = RouteComponentProps<{}, {}, LocationState>;

const VideoDetail: React.SFC<VideoDetailProps> = (props) => {
  const [isShowVideoDesc, setShowVideoDesc] = useState(false);
  const curVideo = useSelector<any>((state) => state.currentVideo) as Video;

  const showVideoDesc = useCallback(() => {
    setShowVideoDesc(!isShowVideoDesc);
  }, [isShowVideoDesc]);

  const videoWrapperClass = classnames({
    [styles['video-info-wrapper']]: true,
    [styles['video_show']]: isShowVideoDesc,
    [styles['video_not_show']]: !isShowVideoDesc,
  });

  return (
    <div className={videoWrapperClass}>
      <div className={styles['video-title']}>
        {!isShowVideoDesc ? (
          <Icon name="icon-xialaxiao" onClick={showVideoDesc} />
        ) : (
          <Icon name="icon-shouqida" onClick={showVideoDesc} />
        )}
        <span>{curVideo.title}</span>
      </div>
      <div className={styles['video-data']}>
        <span className={styles['video-author']}>{curVideo.author}</span>
        <span className={styles['video-data']}>
          <em>{`${numFormat(curVideo.play)}次观看`}</em>
          <em>{`${numFormat(curVideo.danmu)}弹幕`}</em>
          <em>{moment(curVideo.ctime).format('MM-DD')}</em>
        </span>
      </div>
      <div>未经作者授权禁止转载</div>
      <div className={styles['video-desc']}>{curVideo.desc}</div>
    </div>
  );
};

export default withRouter(VideoDetail);
