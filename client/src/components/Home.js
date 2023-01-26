import React, { useState } from "react";
import { Link } from "react-router-dom";
import EventsList from "./EventsList";
import CreateForm from "./CreateForm";
import Login from "./Login";

function Home(props) {
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleError(msg) {
    console.log(msg);
    setError(msg);
  }

  function setLoggedIn() {
    setIsLoggedIn(true);
  }

  return (
    <div>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <div class="home-container">
        <div class="event-create-login-container">
          <EventsList socket={props.socket} />
          <div class="create-login-container">
            <CreateForm socket={props.socket} />
            {!isLoggedIn ? (
              <Login setLoggedIn={setLoggedIn} handleError={handleError} />
            ) : null}
            <Link to="/about">About Team</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
