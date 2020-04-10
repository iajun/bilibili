import { Icon } from '@components/index';
import React, { SFC } from 'react';
import logo from '@img/logo.svg';
import styles from './index.scss?modules';

const URL_PREFIX = process.env.URL_PREFIX;

const Header: SFC<{}> = () => {
  return (
    <header className={styles.header}>
      <a href="/">
        <img src={logo} alt="logo" className={styles.header_logo} />
      </a>
      <a href="/search" className={styles.header_search}>
        <span>
          <Icon name="icon-sousuo" cname={styles.header_search_icon} />
          附近的咖啡咖啡机卡萨丁剪发卡随机发
        </span>
      </a>
      <a href="/space">
        <img
          src={`${URL_PREFIX}/proxy?type=image&url=http://i0.hdslb.com/bfs/face/member/noface.jpg`}
          className={styles.header_avatar}
        />
      </a>
      <button className={styles.header_btn}>下载 App</button>
    </header>
  );
};

export default Header;
