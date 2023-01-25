import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EventsList from './EventsList';
import CreateForm from './CreateForm';
import Login from './Login';

function Home(props) {
  const [user, setUser] = useState('');

  return (
    <div>
      <Link to='/about'>About Team</Link>
      <CreateForm socket={props.socket} />
      <Login setUser={setUser} />
      <EventsList socket={props.socket} user={user} />
    </div>
  );
}

export default Home;
