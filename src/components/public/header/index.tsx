import { Icon } from '@components/index';
import { Link } from 'react-router-dom';
import React, { SFC } from 'react';
import logo from '@img/logo.svg';
import styles from './index.scss?modules';

const Header: SFC<{}> = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={logo} alt="logo" className={styles.header_logo} />
      </Link>
      <Link to="/search" className={styles.header_search}>
        <span>
          <Icon name="icon-sousuo" cname={styles.header_search_icon} />
          附近的咖啡咖啡机卡萨丁剪发卡随机发
        </span>
      </Link>
      <Link to="/space">
        <img
          src="//localhost:3020/transfer/img?url=http://i0.hdslb.com/bfs/face/member/noface.jpg@53w_53h.webp"
          className={styles.header_avatar}
        />
      </Link>
      <button className={styles.header_btn}>下载 App</button>
    </header>
  );
};

export default Header;
