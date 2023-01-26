import React, { useState } from "react";
import { Link } from "react-router-dom";
import EventsList from "./EventsList";
import CreateForm from "./CreateForm";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";

function Home(props) {
  let isLoggedIn = useSelector((state) => state.global.isLoggedIn);
  let error = useSelector((state) => state.global.errorMessage);
  let user = useSelector((state) => state.global.user);

  return (
    <div>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <Link to="/about">About Team</Link>
      <CreateForm socket={props.socket} />
      {!isLoggedIn ? <Login /> : <p>Welcome {user.username}</p>}
      <EventsList socket={props.socket} />
    </div>
  );
}

export default Home;
