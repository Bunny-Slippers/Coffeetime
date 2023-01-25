import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
      <div>
        <Link to='/'>Home Page</Link>
      </div>
      <div>Anna</div>
      <div>Patrice</div>
      <div>Justin</div>
      <div>Garrett</div>
    </div>
  );
}

export default About;
