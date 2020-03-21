import React, { SFC, ReactElement } from 'react';
import classnames from 'classnames';
import styles from './index.scss?modules';

export interface PanelProps {
  title: string;
  subTitle?: ReactElement;
  cname?: string;
}

const Panel: SFC<PanelProps> = ({ title, subTitle, children, cname }) => {
  return (
    <section className={classnames(styles.panel, cname)}>
      <header>
        <h1>{title}</h1>
        {subTitle && <span>{subTitle}</span>}
      </header>
      {children}
    </section>
  );
};

export default Panel;
