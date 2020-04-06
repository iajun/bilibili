import { formatSeconds } from '@util/numFormat';
import { initialStore } from '@store/reducers';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import fetch from '@util/fetch';
import styles from './index.scss?modules';

export interface VideoPlayerProps {
  video: typeof initialStore.currentVideo;
}

const VideoPlayer: React.SFC<VideoPlayerProps> = ({ video }) => {
  const [hasPlayedVideo, setHasPlayedVideo] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isShowControlLayer, setIsShowCtrlLayer] = useState(false);
  const [playedVideoTime, setPlayedVideoTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef<number>(0);

  function onCanPlayCapture($e: any) {
    durationRef.current = $e.target.duration;
  }

  function showVideoControl() {
    setIsShowCtrlLayer(!isShowControlLayer);
  }

  function toFullScreen() {
    videoRef.current!.requestFullscreen({
      navigationUI: 'show',
    });
  }

  function exitFullScreen() {
    videoRef.current!.webkitExitFullScreen();
  }

  function onPlayCapture($e: SyntheticEvent<HTMLVideoElement, Event>) {
    $e.stopPropagation();
    if (!(videoRef.current as any).timer)
      (videoRef.current as any).timer = setInterval(() => {
        setPlayedVideoTime(videoRef.current!.currentTime);
      }, 1000);
  }

  function onPauseCapture($e: SyntheticEvent<HTMLVideoElement, Event>) {
    $e.stopPropagation();
    clearTimeout((videoRef.current as any).timer);
    (videoRef.current as any).timer = null;
  }

  function toggleVideoPause(toPaused: boolean, $e?: SyntheticEvent) {
    $e?.preventDefault();
    setIsVideoPaused(toPaused);
    const el = videoRef.current;

    toPaused ? el!.pause() : el!.play();
  }

  function onStartPlayVideo() {
    setHasPlayedVideo(true);
    toggleVideoPause(false);
  }

  const barPercentTmp = ((playedVideoTime / durationRef.current) * 100).toFixed(2);
  const processbarPercent = isNaN(+barPercentTmp) ? 0 : barPercentTmp + '%';

  return (
    <div className={styles['player_wrapper']}>
      {/* --------video-layer------------------------play-------------- */}
      <div onClick={showVideoControl} style={{ display: hasPlayedVideo ? 'block' : 'none' }}>
        <video
          className={styles['video_player']}
          preload="auto"
          ref={videoRef}
          onCanPlayCapture={onCanPlayCapture}
          onPauseCapture={onPauseCapture}
          onPlayCapture={onPlayCapture}>
          <source src={`//localhost:3021/proxy?type=video&url=https:${video.src}`} type="video/mp4" />
        </video>
        <div className={styles['video_control_layer']} style={{ display: isShowControlLayer ? 'block' : 'none' }}>
          <div className={styles['video_control_icon']}>
            {isVideoPaused ? (
              <img
                src="//localhost:3021/proxy?type=image&url=https://s1.hdslb.com/bfs/static/mult/images/TV-Play.png"
                alt="play-video"
                className={`${styles['icon']} ${styles['icon_play_video']}`}
                onClick={($e) => toggleVideoPause(false, $e)}
              />
            ) : (
              <img
                src="//localhost:3021/proxy?type=image&url=https://s1.hdslb.com/bfs/static/mult/images/TV-Pause.png"
                alt="pause-video"
                className={`${styles['icon']} ${styles['icon_pause_video']}`}
                onClick={($e) => toggleVideoPause(true, $e)}
              />
            )}
          </div>
          <div className={styles['video_control_bar']}>
            <p className={styles['control_bar_time']}>
              {formatSeconds(playedVideoTime)}/{formatSeconds(durationRef.current)}
            </p>
            <div className={styles['control_process_bar']}>
              <div className={styles['control_process_bar_data']} style={{ width: processbarPercent }}></div>
            </div>
            <p className={styles['control_bar_icon']}>
              <img
                src={`//localhost:3021/proxy?type=image&url=https://s1.hdslb.com/bfs/static/mult/images/Icon_Barrage-On.png`}
                onClick={exitFullScreen}
              />
              <img
                src={`//localhost:3021/proxy?type=image&url=https://s1.hdslb.com/bfs/static/mult/images/Icon_Fullscreen.png`}
                onClick={toFullScreen}
              />
            </p>
          </div>
        </div>
      </div>
      {/* ---------------------------------------------------------------- */}
      {/* --------------------------image-layer----------------------------------- */}
      <div style={{ display: hasPlayedVideo ? 'none' : 'block' }}>
        <div>
          <img
            src={`//localhost:3021/proxy?type=image&url=${video.pic}`}
            alt="video-cover"
            className={styles['video_cover']}
          />
        </div>
        <div className={styles['load_wrapper']}>
          <p className={styles['video_duration']}>{video.duration}</p>
          <img
            src="//localhost:3021/proxy?type=image&url=https://s1.hdslb.com/bfs/static/mult/images/TV-Play.png"
            alt="play-video"
            className={styles['icon_play_video']}
            onClick={onStartPlayVideo}
          />
        </div>
      </div>
      {/* ---------------------------------------------------------------- */}
    </div>
  );
};

export default VideoPlayer;
