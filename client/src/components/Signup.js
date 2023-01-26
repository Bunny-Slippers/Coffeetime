import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [signUser, setSignUser] = useState('');
  const [signPassword, setSignPassword] = useState('');
  let navigate = useNavigate();

  let url = 'http://localhost:3000/user/signup';
  function signup(userInfo) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: signUser, password: signPassword }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    return navigate('/');
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
            onChange={(e) => {
              setSignUser(e.target.value);
            }}
          />
        </label>
        <label id='signup-password'>
          Password
          <input
            id='password-signup'
            type='password'
            onChange={(e) => {
              setSignPassword(e.target.value);
            }}
          />
        </label>
        <button
          id='confirm-btn'
          onClick={(e) => {
            signup(e);
          }}
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Signup;
