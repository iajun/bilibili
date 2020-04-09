import { Partition } from '@api/partition';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { transformPartitionData } from './data';
import { useSelector } from 'react-redux';
import Icon from '@components/core/icon';
import React, { SFC, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import styles from './index.scss?modules';

type BlNavProps = RouteComponentProps;

const BlNav: SFC<BlNavProps> = (props) => {
  const [isDrawerShow, setIsDrawerShow] = useState(false);
  const [curHref, setCurHref] = useState(props.location.pathname);
  const tabBarRef = useRef<HTMLDivElement>(null);

  const partitionListState = useSelector<any>((state) => state.partitionList) as Partition[];

  const partitionList = transformPartitionData(partitionListState);

  // scroll nav tab bar to where the nav item is
  function scrollNavTabBar(href: string) {
    const pageIndex = partitionList.findIndex((partition) => partition.href == href);

    const scrollLeft = pageIndex > 3 ? ((pageIndex - 1) * window.innerWidth * 0.86) / 5 : 0;

    const curScrollLeft = tabBarRef.current!.scrollLeft;
    const innerWidth = window.innerWidth;

    if (Math.abs(curScrollLeft - scrollLeft) > innerWidth) {
      (tabBarRef.current as HTMLDivElement).scrollLeft = scrollLeft;
    }
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
      // hideDrawer();
      scrollNavTabBar(href);
    }
  }

  function createPartitionListTemplate() {
    return (
      <>
        {partitionList.map(({ tid, typename, href }) => (
          <span className={styles['partition_items']} key={tid}>
            <a href={href} className={curHref === href ? styles['partition_items_active'] : ''}>
              {typename}
            </a>
          </span>
        ))}
      </>
    );
  }

  return (
    <>
      <div className={styles['nav-wrapper']}>
        <nav ref={tabBarRef} className={styles.tab_bar} onClick={handlePartitionItemClick}>
          {createPartitionListTemplate()}
        </nav>
        <Icon name="icon-xialaxiao" cname={styles['icon_arrow-down']} onClick={showDrawer} />
      </div>

      <div className={drawerClass}>
        <nav className={styles.tab_bar} onClick={handlePartitionItemClick}>
          {createPartitionListTemplate()}
        </nav>
        <Icon name="icon-shouqida" cname={styles['icon_arrow-up']} onClick={hideDrawer} />
      </div>
    </>
  );
};

export default withRouter(BlNav);
