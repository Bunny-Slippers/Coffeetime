import React, { useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
=======
import { useSelector, useDispatch } from "react-redux";
import { logIn, setError } from "../redux/slice";
>>>>>>> dev

const Login = (props) => {
  const { handleError, setLoggedIn } = props;
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
=======
  const dispatch = useDispatch();
>>>>>>> dev

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
          dispatch(setError(message));
        } else {
          console.log(data);
          dispatch(logIn(data.username));
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
