import React, { useState, useEffect } from 'react';
import Event from './Event';

function EventsList(props) {
  let colorCounter = 0;

  const parseInput = (message) => {
    console.log(message);
    colorCounter = 0;
    const res = [];
    if (Array.isArray(message)) {
      for (const elem of message) {
        if (!elem.eventTime) elem.eventTime = 'TBD';
        if (colorCounter > 3) colorCounter = 0;
        res.push(
          <Event
            socket={props.socket}
            host={elem.host}
            details={elem.details.title}
            colorCounter={colorCounter}
            eventTime={elem.eventTime}
            key={elem.details.title}
            user={props.user}
            _id={elem._id}
            attendees={elem.details.attendees}
          />
        );
        setEvents([...events, ...res]);
        colorCounter++;
      }
    }
  };

  const updateEvents = (updatedEvent) => {
    const id = updatedEvent._id;
    setEvents((prevEvents) => {
      const updatedSet = prevEvents.map((prevE) => {
        if (id === prevE._id) {
          return { ...prevE, ...updatedEvent };
        } else {
          return prevE;
        }
      });
      return updatedSet;
    });
  };

  const [events, setEvents] = useState([]);
  //useEffect here is for loading events on the first load of the page (dependancy is [])
  useEffect(() => {
    //we emit an event of loadEvents to the server, which will query the DB and send back all events with the same event type of loadEvents
    props.socket.emit('initialLoad', 'testMessage');
    props.socket.on('initialLoad', (message) => {
      console.log(message);
      parseInput(message);
    });
  }, []);

  //useEffect here runs on every reload, it grabs the response from the server each time we add or load the page
  useEffect(() => {
    colorCounter = 0;
    props.socket.on('loadEvents', (message) => {
      parseInput(message);
    });
  });

  return <div id='events-list'>{events}</div>;
}

export default EventsList;
