import { VIDEO_LIST } from '@query/video';
import { VideoPanel } from '@components/index';
import { useQuery } from '@apollo/react-hooks';
import BlNav from '@components/public/nav';
import React from 'react';
import styles from './index.scss?modules';

const Home = () => {
  const { data = { rankingVideos: [] } } = useQuery(VIDEO_LIST, {
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  return (
    <>
      <BlNav />
      <div className={styles['wrapper']}>
        <VideoPanel
          title="我是乔布斯"
          subTitle={<>查看更多</>}
          videoList={data.rankingVideos}
        />
      </div>
    </>
  );
};

export default Home;
