import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    Home: index page
    <p>
      <Link to="/test">go to test page</Link>
    </p>
  </div>
);

export default Home;
