import React, { SFC } from 'react';
import classnames from 'classnames';
import styles from './index.scss?modules';

export interface IconProps {
  name: string;
  cname?: string;
}

const Icon: SFC<IconProps> = ({ name, cname }) => {
  return (
    <svg className={classnames(styles.icon, cname)}>
      <use xlinkHref={`#${name.replace('-usage', '')}`} />
    </svg>
  );
};

export default Icon;
