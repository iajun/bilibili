import { Icon } from '@components/index';
import { getPartitionList } from '@query/index';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import search from '@icon/search.svg';
import styles from './index.scss?modules';

const Home = () => {
  const { data = { partitionList: [] } } = useQuery(getPartitionList());

  return (
    <div>
      <Icon name={search.id} cname={styles['bili-icon']} />
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
