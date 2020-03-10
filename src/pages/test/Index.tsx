import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.scss?modules';

const Test = () => {
  return (
    <div className={style.item}>
      dsfsd
      <p>
        <Link to="/">go to index page</Link>
      </p>
    </div>
  );
};

export default Test;
