import React from 'react';
import { Icon } from '@components/index';
import styles from './index.scss?modules';
import address from '@icon/address.svg';
import { useQuery } from '@apollo/react-hooks';
import { getPartitionList } from '@query/index';

const Home = () => {
  const { data = { partitionList: [] } } = useQuery(getPartitionList());

  return (
    <div>
      <Icon name={address.id} cname={styles['bili-icon']} />
      {data.partitionList.map(({ tid, typename }) => (
        <ul key={tid}>
          <li>{tid}</li>
          <li>{typename}</li>
        </ul>
      ))}
    </div>
  );
};

export default Home;
