import '@scss/layout.scss';
import { VideoPanel } from '@components/index';
import { useSelector } from 'react-redux';
import BlNav from '@components/public/nav';
import React from 'react';
import Video from '@model/video';

const Home = () => {
  const rankingVideos = useSelector<any>((state) => state.videoRankingIndexList) as Video[];
  return (
    <>
      <BlNav />
      <div className="layout-header-nav-main">
        <VideoPanel title="我是乔布斯" subTitle={<>查看更多</>} videoList={rankingVideos} />
      </div>
    </>
  );
};

export default Home;
