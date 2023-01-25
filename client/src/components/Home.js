import React from 'react';
import { Link } from 'react-router-dom';
import EventsList from './EventsList';
import CreateForm from './CreateForm';
import Login from './Login';

function Home(props) {
  return (
    <div>
      <Link to='/about'>About Team</Link>
      <CreateForm socket={props.socket} />
      <Login />
      <EventsList socket={props.socket} />
    </div>
  );
}

export default Home;
