import React from 'react';
import { Icon } from '@components/index';
import styles from './index.scss?modules';
import address from '@icon/address.svg';

const Home = () => (
  <div>
    <Icon name={address.id} cname={styles['bili-icon']} />
  </div>
);

export default Home;
