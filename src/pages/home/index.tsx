import React from 'react';
import { Icon } from '@components/index';
import styles from './index.scss?modules';
import addressIcon from '@icon/address.svg';

const Home = () => (
  <div>
    <Icon name="add-to-list" cname={styles['bili-icon']} />
    <p className={styles['icon']}></p>
    <embed src={addressIcon} width="300" height="100" type="image/svg+xml" />
    <object data={addressIcon} width="300" height="100" type="image/svg+xml" />
    <img src={addressIcon} width="200px" height="200px" alt="" />
  </div>
);

export default Home;
