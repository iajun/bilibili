import { Icon } from '@components/index';
import { Link, withRouter } from 'react-router-dom';
import { PARTITION_LIST } from '@query/partition';
import { Partition } from '@typings/types';
import { useQuery } from '@apollo/react-hooks';
import React, { SFC, useRef, useState } from 'react';
import logo from '@img/logo.svg';
import styles from './index.scss?modules';

const toRouteMap = {
  '-1': '/',
  '-2': '/',
  '-3': '/',
};

const Header: SFC<{}> = () => {
  const { data, loading } = useQuery(PARTITION_LIST);
  const [currentIndex, setCurrentIndex] = useState('-1');
  const [isDrawerShow, setIsDrawerShow] = useState(false);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  let partitionList: Partition[] = [];

  if (!loading) {
    partitionList = [
      {
        tid: '-1',
        typename: '首页',
        subPartition: [],
      },
    ].concat(data.partitionList);
    partitionList = partitionList.concat([
      {
        tid: '-2',
        typename: '直播',
        subPartition: [],
      },
      {
        tid: '-3',
        typename: '相簿',
        subPartition: [],
      },
    ]);
  }

  function showDrawer() {
    setIsDrawerShow(true);
    (drawerRef.current as HTMLDivElement).style.display = 'block';
    setTimeout(() => {
      (drawerRef.current as HTMLDivElement).style.transform =
        'translate3d(0px, 0px, 0px)';
    }, 0);
  }

  function hideDrawer() {
    setIsDrawerShow(false);
    (drawerRef.current as HTMLDivElement).style.transform =
      'translate3d(0px, -100%, 0px)';
    setTimeout(() => {
      (drawerRef.current as HTMLDivElement).style.display = 'none';
    }, 500);
  }

  function handlePartitionItemClick(tid: string) {
    setCurrentIndex(tid);
    if (isDrawerShow) {
      hideDrawer();
      const pageIndex = partitionList.findIndex(
        (partition) => (partition as any).tid === tid,
      );
      const scrollLeft = pageIndex > 3 ? (pageIndex - 1) * 128 : 0;
      (tabBarRef.current as HTMLDivElement).scrollLeft = scrollLeft;
    }
  }

  function createPartitionListTemplate() {
    const toPath = (tid: string) =>
      +tid < 0 ? (toRouteMap as any)[tid] : `/channel/${tid}`;
    return (
      <>
        {partitionList.map(({ tid, typename }) => (
          <Link
            to={toPath(tid)}
            key={tid}
            className={styles.partition_items}
            onClick={() => handlePartitionItemClick(tid)}>
            <span
              className={
                currentIndex === tid ? styles.partition_items_active : ''
              }>
              {typename}
            </span>
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      <div className={styles.top_wrapper}>
        <header className={styles.header}>
          <Link to="/" className={styles.header_logo}>
            <img src={logo} width="124px" height="56px" alt="logo" />
          </Link>
          <Link to="/search" className={styles.header_search}>
            <span>
              <Icon name="search" cname={styles.header_search_icon} />
              附近的咖啡咖啡机卡萨丁剪发卡随机发
            </span>
          </Link>
          <Link to="/space">
            <Icon name="avatar" cname={styles.header_avatar} />
          </Link>
          <button className={styles.header_btn}>下载 App</button>
        </header>
        <div className={styles.tab_bar_wrapper}>
          <div ref={tabBarRef} className={styles.tab_bar}>
            {createPartitionListTemplate()}
          </div>
          <div className={styles['tab-bar_switch']} onClick={showDrawer}>
            <Icon name="arrow-down" cname={styles['icon_arrow-down']} />
          </div>
        </div>
        <div className={styles.drawer_position}>
          <div ref={drawerRef} className={styles.drawer_wrapper}>
            <div className={styles.drawer}>{createPartitionListTemplate()}</div>
            <div className={styles.drawer_switch} onClick={hideDrawer}>
              <Icon name="arrow-up" cname={styles['icon_arrow-up']} />
            </div>
          </div>
        </div>
      </div>
      <i className={styles.header_position_patch} />
    </>
  );
};

export default withRouter(Header);
