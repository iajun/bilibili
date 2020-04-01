import { Link, withRouter } from 'react-router-dom';
import { NavPartitionData, transformPartitionData } from './data';
import { PARTITION_LIST } from '@query/partition';
import { useQuery } from '@apollo/react-hooks';
import Icon from '@components/core/icon';
import React, { SFC, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import styles from './index.scss?modules';

const BlNav: SFC<{}> = (props) => {
  const { data, loading } = useQuery(PARTITION_LIST);
  const [isDrawerShow, setIsDrawerShow] = useState(false);
  const [curHref, setCurHref] = useState('/');
  const tabBarRef = useRef<HTMLDivElement>(null);

  let partitionList: NavPartitionData[] = [];

  // scroll nav tab bar to where the nav item is
  function scrollNavTabBar(href: string) {
    const pageIndex = partitionList.findIndex(
      (partition) => partition.href == href,
    );

    const scrollLeft =
      pageIndex > 3 ? ((pageIndex - 1) * window.innerWidth * 0.86) / 5 : 0;

    (tabBarRef.current as HTMLDivElement).scrollLeft = scrollLeft;
  }

  // where refresh or enter the page, determine where the active nav is
  useEffect(() => {
    const href = props.location.pathname;
    setCurHref(href);
    scrollNavTabBar(href);
  }, [partitionList]);

  // for the drawer nav, show animation
  const drawerClass = classnames({
    [styles['drawer']]: true,
    [styles['drawer-visible']]: isDrawerShow,
    [styles['drawer-invisible']]: !isDrawerShow,
  });

  if (!loading) {
    partitionList = transformPartitionData(data.partitionList);
  }

  function showDrawer() {
    setIsDrawerShow(true);
  }

  function hideDrawer() {
    setIsDrawerShow(false);
  }

  // use event target to reduce event binding
  // then need to see if it is the true target
  function handlePartitionItemClick($e: any) {
    // if it is not the link target but the span
    if (!$e.target.pathname) {
      return;
    }
    const href = $e.target.pathname;
    setCurHref(href);

    if (isDrawerShow) {
      hideDrawer();
      scrollNavTabBar(href);
    }
  }

  function createPartitionListTemplate() {
    return (
      <>
        {partitionList.map(({ tid, typename, href }) => (
          <span className={styles['partition_items']} key={tid}>
            <Link
              to={href}
              className={
                curHref === href ? styles['partition_items_active'] : ''
              }>
              {typename}
            </Link>
          </span>
        ))}
      </>
    );
  }

  return (
    <>
      <div className={styles['nav-wrapper']}>
        <nav
          ref={tabBarRef}
          className={styles.tab_bar}
          onClick={handlePartitionItemClick}>
          {createPartitionListTemplate()}
        </nav>
        <Icon
          name="icon-xialaxiao"
          cname={styles['icon_arrow-down']}
          onClick={showDrawer}
        />
      </div>
      <div className={drawerClass}>
        <nav className={styles.tab_bar} onClick={handlePartitionItemClick}>
          {createPartitionListTemplate()}
        </nav>
        <Icon
          name="icon-shouqida"
          cname={styles['icon_arrow-up']}
          onClick={hideDrawer}
        />
      </div>
    </>
  );
};

export default withRouter(BlNav);
