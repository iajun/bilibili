import React, { SFC } from 'react';
import classnames from 'classnames';

export interface IconProps {
  name: string;
  cname?: string;
}

const Icon: SFC<IconProps> = ({ name, cname }) => {
  const context = require.context('../../../assets/icon', true, /\.svg$/);
  const icon = context(`./${name}.svg`).default;

  return (
    <svg viewBox={icon.viewBox} className={classnames(cname)}>
      <use xlinkHref={`#${icon.id}`} />
    </svg>
  );
};

export default Icon;
