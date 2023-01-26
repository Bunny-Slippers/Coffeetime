import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  const { handleError, setLoggedIn } = props;
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  let url = "http://localhost:3000/user/login";

  function login(e) {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error) {
          let message = data.error.message;
          console.log(handleError, message);
          handleError(message);
        } else {
          setLoggedIn();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="login-form">
      <h2>Login Here</h2>
      <form id="form">
        <label id="user">
          Username
          <input
            id="username-input"
            type="text"
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
        </label>
        <label id="password">
          Password
          <input
            id="password-input"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button
          id="login-btn"
          onClick={(y) => {
            login(y);
          }}
        >
          Log in
        </button>
        <Link to="/signup" id="signup-btn">
          Sign up
        </Link>
      </form>
    </div>
  );
};

export default Login;

//git fetch -v
