import { Icon, VideoPanel } from '@components/index';
import { initialStore } from '@store/reducers';
import { numFormat } from '@util/numFormat';
import React, { useCallback, useRef, useState } from 'react';
import moment from 'moment';
import styles from './index.scss?modules';

export type VideoDetailProps = {
  video: typeof initialStore.currentVideo;
};

const { URL_PREFIX } = process.env;

const VideoDetail: React.SFC<VideoDetailProps> = ({ video }) => {
  const [isShowVideoDesc, setShowVideoDesc] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  const showVideoDesc = useCallback(() => {
    setShowVideoDesc(!isShowVideoDesc);
    detailRef.current!.style.height = !isShowVideoDesc ? detailRef.current!.scrollHeight + 'px' : '100px';
  }, [isShowVideoDesc]);

  return (
    <>
      <section className={styles['video-info-wrapper']} ref={detailRef}>
        <div className={styles['video-title']}>
          {!isShowVideoDesc ? (
            <Icon name="icon-xialaxiao" onClick={showVideoDesc} />
          ) : (
            <Icon name="icon-shouqida" onClick={showVideoDesc} />
          )}
          <p style={{ whiteSpace: isShowVideoDesc ? 'pre-wrap' : 'nowrap' }}>{video.title}</p>
        </div>
        <div className={styles['video-data']}>
          <span>{video.author}</span>
          <span>
            <em>{`${numFormat(video.play)}次观看`}</em>
            <em>{`${numFormat(video.danmu)}弹幕`}</em>
            <em>{moment(video.ctime).format('MM-DD')}</em>
          </span>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles['icon-forbidden']}
            viewBox="0 0 16 16"
            fill="#ff6262">
            <title>info_prohibit</title>
            <path d="M3.42 4.13l.71-.71a6 6 0 0 1 8.46 8.46l-.71.71a6 6 0 0 1-8.46-8.46zm.71.71a5 5 0 0 0 7 7l-7-7zm.71-.71l7 7a5 5 0 0 0-7-7z"></path>
          </svg>
          <span>未经作者授权禁止转载</span>
        </div>
        <div className={styles['video-desc']}>{video.desc}</div>
        <div className={styles['video-tags']}>
          {video.tags.map(({ name, id }) => (
            <span key={id}>{name}</span>
          ))}
        </div>
      </section>
      <section>
        <div className={styles['video-comment-wrapper']}>
          <div className={styles['video-comment-svgs']}>
            <svg data-name="\u56FE\u5C42 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#757575">
              <defs></defs>
              <title>icon_fav</title>
              <path
                data-name="icon fav-copy"
                className="cls-1"
                d="M14.61 6.31a2.57 2.57 0 0 1-1.95-1.5l-1.49-3.12a1.31 1.31 0 0 0-2.4 0L7.34 4.81a2.68 2.68 0 0 1-1.95 1.5L2 6.83A1.29 1.29 0 0 0 1.3 9l2.53 2.6a2.64 2.64 0 0 1 .71 2.28L4 17.56a1.32 1.32 0 0 0 1.95 1.37l2.86-1.56a2.52 2.52 0 0 1 2.53 0l2.86 1.56a1.33 1.33 0 0 0 1.95-1.37l-.65-3.64a2.64 2.64 0 0 1 .71-2.28L18.7 9a1.29 1.29 0 0 0-.7-2.17z"></path>
            </svg>
            <span>收藏</span>
            <svg data-name="\u56FE\u5C42 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#757575">
              <defs></defs>
              <title>icon_download</title>
              <path
                data-name="icon download"
                className="cls-1"
                d="M6.64 1.36h6.71a5.28 5.28 0 0 1 5.28 5.28v6.71a5.28 5.28 0 0 1-5.28 5.28H6.64a5.28 5.28 0 0 1-5.28-5.28V6.64a5.28 5.28 0 0 1 5.28-5.28zm2.88 13.89a.7.7 0 0 0 1 0l4.74-4.2c.64-.61-.35-1.57-1-1l-3.54 3.18V5.21a.71.71 0 0 0-1.41 0v8.07l-3.54-3.11c-.64-.61-1.69.34-1 1z"></path>
            </svg>
            <span>缓存</span>
            <svg data-name="\u56FE\u5C42 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#757575">
              <defs></defs>
              <title>icon_share</title>
              <path
                className="cls-1"
                d="M8.88 7V2.91A1.14 1.14 0 0 1 10.76 2l8.31 7a1.32 1.32 0 0 1 .17 1.86l-.17.17-8.31 7a1.14 1.14 0 0 1-1.88-.88v-3.83c-4 0-5.75 1.52-8 4.48-.08.1-.45.21-.45-.26C.45 11.81 2 7 8.88 7z"></path>
            </svg>
            <span>分享</span>
          </div>
          <div>
            <img src={`${URL_PREFIX}/proxy?type=image&url=https://s1.hdslb.com/bfs/static/mult/images/comment.png`} />
            <span>{video.review} 评论</span>
          </div>
        </div>
      </section>
      <section>
        <VideoPanel videoList={video.relatedList} title="" cname={styles['video-related-panel']} />
      </section>
    </>
  );
};

export default VideoDetail;
