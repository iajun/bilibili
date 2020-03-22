import React, { SFC } from 'react';
import classnames from 'classnames';
import styles from './index.scss?modules';

export interface IconProps {
  name: string;
}

const Icon: SFC<IconProps> = ({ name }) => {
  return (
    <svg className={classnames(styles.icon, `icon-${name}`)}>
      <use xlinkHref={`static/img/sprite.svg#${name}-usage`} />
    </svg>
  );
};

export default Icon;
