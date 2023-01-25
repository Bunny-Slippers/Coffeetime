import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  let url = 'http://localhost:3000/user/login';

  async function login() {
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username: user, password: password }),
    // });
    // let result = await response.json();
    // console.log(result);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: user, password: password }),
    })
      .then((response) => console.log(response.json()))
      .catch((err) => console.log(err));
  }

  return (
    <div id='login-form'>
      <h2>Login Here</h2>
      <form id='form'>
        <label id='user'>
          Username
          <input
            id='username-input'
            type='text'
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
        </label>
        <label id='password'>
          Password
          <input
            id='password-input'
            type='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button
          id='login-btn'
          onClick={(e) => {
            login(e);
          }}
        >
          Log in
        </button>
        <Link to='/signup' id='signup-btn'>
          Sign up
        </Link>
      </form>
    </div>
  );
};

export default Login;

//git fetch -v
