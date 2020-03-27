import React, { MouseEventHandler, SFC } from 'react';
import classnames from 'classnames';
import styles from './index.scss?modules';

export interface IconProps {
  name: string;
  cname?: string;
  onClick?: MouseEventHandler<SVGElement>;
}

const Icon: SFC<IconProps> = ({ name, cname, onClick }) => {
  return (
    <svg
      className={classnames(styles.icon, cname)}
      onClick={onClick || undefined}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default Icon;
