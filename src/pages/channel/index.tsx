import '@scss/layout.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { VideoPanel } from '@components/index';
import { initialStore } from '@store/reducers';
import { useSelector } from 'react-redux';
import BlNav from '@components/public/nav';
import React, { SFC } from 'react';

type ChannelProps = RouteComponentProps<{ cid: string }>;

const Channel: SFC<ChannelProps> = () => {
  const channelVideoList = useSelector<typeof initialStore, typeof initialStore.channelVideoList>(
    (state) => state.channelVideoList,
  );

  return (
    <>
      <BlNav />
      <div className="layout-header-nav-main">
        {channelVideoList.map(({ typename, videoList }) => (
          <VideoPanel key={typename} videoList={videoList} title={typename} />
        ))}
      </div>
    </>
  );
};

export default withRouter(Channel);
