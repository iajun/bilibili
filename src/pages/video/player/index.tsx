import { RouterProps } from '@typings/global';
import { formatSeconds } from '@util/numFormat';
import { getImageSuffix } from '@util/getImageSuffix';
import { initialStore } from '@store/reducers';
import { withRouter } from 'react-router';
import React, { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import fetch from '@util/fetch';
import styles from './index.scss?modules';

export interface VideoPlayerProps extends RouterProps {
  video: typeof initialStore.currentVideo;
}

const URL_PREFIX = process.env.URL_PREFIX;

const VideoPlayer: React.SFC<VideoPlayerProps> = ({ video, staticContext }) => {
  const [hasPlayedVideo, setHasPlayedVideo] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isShowControlLayer, setIsShowCtrlLayer] = useState(false);
  const [playedVideoTime, setPlayedVideoTime] = useState(0);
  const [url, setUrl] = useState(`${URL_PREFIX}/proxy?type=video&url=https:${video.src}`);
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLInputElement>(null);
  const barrageRef = useRef<HTMLCanvasElement>(null);
  const durationRef = useRef<number>(0);

  const barPercentTmp = (playedVideoTime / durationRef.current) * 100;
  const processbarPercent = isNaN(+barPercentTmp) ? 0 : (barPercentTmp | 0) + '%';

  let suffix = '';
  if (staticContext) {
    suffix = staticContext.imageSuffix;
  } else {
    suffix = getImageSuffix();
  }

  useEffect(() => {
    fetch({
      url,
      headers: {
        Range: 'bytes=0-1',
      },
      responseType: 'blob',
    }).then((response) => {
      const url = URL.createObjectURL(response.data);
      setUrl(url);
      setTimeout(() => {
        URL.revokeObjectURL(url);
      });
    });
  }, []);

  function onSetVideoTime($e: ChangeEvent<HTMLInputElement>) {
    $e.stopPropagation();
    videoRef.current!.currentTime = (+$e.target.value / 100) * durationRef.current;
    trackRef.current!.value = $e.target.value;
    trackRef.current!.style.background = `linear-gradient(to right, #de698c 0, #de698c ${processbarPercent}, rgba(256, 256, 256, 0.6) ${processbarPercent}, rgba(256, 256, 256, 0.6) 100%)  no-repeat`;
  }

  function onCanPlayCapture($e: any) {
    durationRef.current = $e.target.duration;
  }

  function showVideoControl($e: any) {
    if ($e.target.nodeName !== 'VIDEO') return;
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

  function toggleVideoPause(toPaused: boolean) {
    setIsVideoPaused(toPaused);
    const el = videoRef.current;

    toPaused ? el!.pause() : el!.play();
  }

  function onStartPlayVideo() {
    setHasPlayedVideo(true);
    toggleVideoPause(false);
  }

  if (trackRef.current) {
    trackRef.current.style.background = `linear-gradient(to right, #de698c 0, #de698c ${processbarPercent}, rgba(256, 256, 256, 0.6) ${processbarPercent}, rgba(256, 256, 256, 0.6) 100%)  no-repeat`;
    trackRef.current.value = '' + (videoRef.current!.currentTime / durationRef.current) * 100;
  }

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
          <source src={`${url}`} type="video/mp4" />
        </video>
        <canvas className={styles['barrage-canvas']} ref={barrageRef}></canvas>
        <div className={styles['video_control_layer']} style={{ display: isShowControlLayer ? 'block' : 'none' }}>
          <div className={styles['video_control_icon']}>
            {isVideoPaused ? (
              <img
                src={`${URL_PREFIX}/proxy?type=image&url=https://s1.hdslb.com/bfs/static/mult/images/TV-Play.png`}
                alt="play-video"
                className={`${styles['icon']} ${styles['icon_play_video']}`}
                onClick={() => toggleVideoPause(false)}
              />
            ) : (
              <img
                src={`${URL_PREFIX}/proxy?type=image&url=https://s1.hdslb.com/bfs/static/mult/images/TV-Pause.png`}
                alt="pause-video"
                className={`${styles['icon']} ${styles['icon_pause_video']}`}
                onClick={() => toggleVideoPause(true)}
              />
            )}
          </div>
          <div className={styles['video_control_bar']}>
            <p className={styles['control_bar_time']}>
              {formatSeconds(playedVideoTime)}/{formatSeconds(durationRef.current)}
            </p>
            <div className={styles['control_process_bar']}>
              {/* <div className={styles['control_process_bar_data']} style={{ width: processbarPercent }}> */}
              <input
                ref={trackRef}
                min="0"
                max="100"
                type="range"
                className={styles['control_process_bar_drag']}
                onInput={onSetVideoTime}
              />
              {/* // <i className={styles['control_process_bar_drag']} draggable="true" onDrag={onSetVideoTime}></i> */}
              {/* </div> */}
            </div>
            <p className={styles['control_bar_icon']}>
              <img
                src={`${URL_PREFIX}/proxy?type=image&url=https://s1.hdslb.com/bfs/static/mult/images/Icon_Barrage-On.png`}
                onClick={exitFullScreen}
              />
              <img
                src={`${URL_PREFIX}/proxy?type=image&url=https://s1.hdslb.com/bfs/static/mult/images/Icon_Fullscreen.png`}
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
            src={`${URL_PREFIX}/proxy?type=image&url=${video.pic}${suffix}`}
            alt="video-cover"
            className={styles['video_cover']}
          />
        </div>
        <div className={styles['load_wrapper']}>
          <p className={styles['video_duration']}>{video.duration}</p>
          <img
            src={`${URL_PREFIX}/proxy?type=image&url=https://s1.hdslb.com/bfs/static/mult/images/TV-Play.png`}
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

export default withRouter(VideoPlayer);
