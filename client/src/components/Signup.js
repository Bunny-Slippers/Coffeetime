import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = (props) => {
  const { signUser, setSignUser } = useState('');
  const { signPassword, setSignPassword } = useState('');

  let url = 'http://localhost:3000';
  function signup(userInfo) {
    fetch(url, { method: 'POST', body: JSON.stringify(userInfo) })
      .then((response) => response.json())
      .then((response) => console.log(response));
  }

  return (
    <div id='signup-form'>
      <Link to='/'>Home Page</Link>
      <h2>Please Signup</h2>
      <form id=''>
        <label id='signup-user'>
          Username
          <input
            id='username-signup'
            type='text'
            onChange={(e) => setSignUser(e.target.value)}
          />
        </label>
        <label id='signup-password'>
          Password
          <input
            id='password-signup'
            type='password'
            onChange={(e) => setSignPassword(e.target.value)}
          />
        </label>
        <button id='confirm-btn'>Confirm</button>
      </form>
    </div>
  );
};

export default Signup;
