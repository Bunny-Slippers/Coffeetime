import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Event from './Event';
import { syncEvent, eventsUpdate, addEvent } from '../redux/slice';

function EventsList(props) {
  const events = useSelector((state) => state.global.events);
  const dispatch = useDispatch();

  const eventEls = events.map((elem) => {
    colorCounter = 0;
    if (!elem.eventTime) elem.eventTime = 'TBD';
    if (colorCounter > 3) colorCounter = 0;
    return (
      <Event
        socket={props.socket}
        host={elem.host}
        details={elem.details.title}
        colorCounter={colorCounter}
        eventTime={elem.eventTime}
        key={elem._id}
        user={props.user}
        _id={elem._id}
        attendees={elem.details.attendees}
      />
    );
  });
  let colorCounter = 0;

  //useEffect here is for loading events on the first load of the page (dependancy is [])
  useEffect(() => {
    //we emit an event of loadEvents to the server, which will query the DB and send back all events with the same event type of loadEvents
    props.socket.emit('sync', 'testMessage');
    props.socket.on('sync', (message) => {
      console.log(events);
      dispatch(syncEvent(message));
    });
  }, []);

  //useEffect here runs on every reload, it grabs the response from the server each time we add or load the page
  // useEffect(() => {
  //   colorCounter = 0;
  //   props.socket.on('loadEvents', (message) => {
  //     parseInput(eventsInit(message));
  //   });
  // });

  return <div id='events-list'>{eventEls}</div>;
}

export default EventsList;
