import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateForm from "./CreateForm";
import EventsList from "./EventsList";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import About from "./About";
import { io } from "socket.io-client";
import pic from "../../public/logo.png";
const socket = io();
//this socket is the socket.io connection to the backend. Look into the docs for how it works, but it is basically Node's event listener and after it opens a connection
//you listen for events with .on and send events with .emit, where the first arg is the type of event, and the second arg is the message to send (applies for front and backend)

//create App that passes down the instance of socket to its children. This stops us from opening multiple connections with the server.
function App() {
  // return (
  //   <div id='App'>
  //     <div id='header-container'>
  //       <img id='mole-logo' src={pic}></img>
  //       <h1 id='title'>COFFE TIME</h1>
  //     </div>
  //     <div className='container'>
  //       <div className='wrapper'>
  //         <CreateForm socket={socket} />
  //         <Login />
  //         <EventsList socket={socket} />
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
//npx kill-port 8080
//testing
