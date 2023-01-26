import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EventsList from './EventsList';
import CreateForm from './CreateForm';
import Login from './Login';

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
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      <Link to='/about'>About Team</Link>
      <CreateForm socket={props.socket} />
      {!isLoggedIn ? (
        <Login setLoggedIn={setLoggedIn} handleError={handleError} />
      ) : null}
      <EventsList socket={props.socket} />
    </div>
  );
}

export default Home;
