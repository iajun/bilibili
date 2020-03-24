import { Icon } from '@components/index';
import { Link, withRouter } from 'react-router-dom';
import { PARTITION_LIST } from '@query/partition';
import { useQuery } from '@apollo/react-hooks';
import React, { Fragment, SFC, useRef, useState } from 'react';
import arrowDown from '@icon/arrow-down.svg';
import arrowUp from '@icon/arrow-up.svg';
import avatar from '@icon/avatar.svg';
import logo from '@img/logo.svg';
import search from '@icon/search.svg';
import styles from './index.scss?modules';

const Header: SFC<{}> = () => {
  const { data = { partitionList: [] } } = useQuery(PARTITION_LIST);
  const [currentIndex, setCurrentIndex] = useState('-1');
  const [isDrawerShow, setIsDrawerShow] = useState(false);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

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
      const scrollLeft = +tid > 3 ? +tid * 64 : 0;
      (tabBarRef.current as HTMLDivElement).scrollLeft = scrollLeft;
    }
  }

  function createPartitionListTemplate() {
    return (
      <Fragment>
        <Link
          to="/"
          className={styles.partition_items}
          onClick={() => handlePartitionItemClick('-1')}>
          <span
            className={
              currentIndex === '-1' ? styles.partition_items_active : ''
            }>
            首页
          </span>
        </Link>
        {data.partitionList.map(({ tid, typename }) => (
          <Link
            to={`/channel/${tid}`}
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
      </Fragment>
    );
  }

  return (
    <div className={styles.top_wrapper}>
      <header className={styles.header}>
        <Link to="/" className={styles.header_logo}>
          <img src={logo} width="124px" height="56px" alt="logo" />
        </Link>
        <Link to="/space" className={styles.header_avatar}>
          <Icon name={avatar.id} />
        </Link>
        <Link to="/search" className={styles.header_search}>
          <Icon name={search.id} />
        </Link>
      </header>
      <div className={styles.tab_bar_wrapper}>
        <div ref={tabBarRef} className={styles.tab_bar}>
          {createPartitionListTemplate()}
        </div>
        <div className={styles['tab-bar_switch']} onClick={showDrawer}>
          <Icon name={arrowDown.id} cname={styles['icon_arrow-down']} />
        </div>
      </div>
      <div className={styles.drawer_position}>
        <div ref={drawerRef} className={styles.drawer_wrapper}>
          <div className={styles.drawer}>{createPartitionListTemplate()}</div>
          <div className={styles.drawer_switch} onClick={hideDrawer}>
            <Icon name={arrowUp.id} cname={styles['icon_arrow-up']} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
