import { VIDEO_LIST } from '@query/video';
import { VideoPanel } from '@components/index';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';

const Home = () => {
  const { data = { rankingVideos: [] } } = useQuery(VIDEO_LIST, {
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  return (
    <div>
      <VideoPanel
        title="我是乔布斯"
        subTitle={<>查看更多</>}
        videoList={data.rankingVideos}
      />
    </div>
  );
};

export default Home;
