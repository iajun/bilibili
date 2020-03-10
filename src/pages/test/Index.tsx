import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.scss?modules';

const Test = () => {
  return (
    <div>
      <p className={style.item}>dsfsd</p>
      <a>fdsfsj</a>
      <p>
        <Link to="/">go to index page</Link>
      </p>
    </div>
  );
};

export default Test;
