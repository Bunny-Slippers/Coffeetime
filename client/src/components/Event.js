import React, { useEffect } from 'react';
import { json } from 'react-router-dom';

//containers for individual events
function Event(props) {
  let eventTime = props.eventTime.slice(0, 2);
  let eventCopy = props.eventTime;
  let attendees = props.attendees;
  let eventId = props._id;
  let username = props.host;
  let socket = props.socket;

  if (Number(eventTime) > 12) {
    let replaceStr = (Number(eventTime) - 12).toString();
    eventCopy = replaceStr + eventCopy.slice(2);
    eventCopy += ' PM';
  } else {
    eventCopy += ' AM';
  }

  const colors = ['#E4C988', '#C27664', '#B05A7A', '#84D2C5'];
  const styleObj = {
    fontSize: ' 52px',
    fontWeight: 500,
    textDecoration: 'underline',
    textDecorationColor: colors[props.colorCounter],
    'text-decoration-thickness': '9px',
    textUnderlinePosition: 'auto',
  };

  let url = 'http://localhost:3000/user/join';
  function joinBtn(e) {
    // Using fetch request
    // fetch(url, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username: username, eventId: eventId }),
    // })
    //   .then((response) => response.json())
    //   .catch((err) => console.log(err));
    // Using Websocket
    console.log('PRESS');
    e.preventDefault();
    socket.emit('joinEvent', { username: username, eventId: eventId });
  }

  return (
    <div className='event'>
      <h3
        className='event-name'
        style={styleObj}
      >{`${props.details} @${eventCopy}`}</h3>
      <div className='host-info'>
        <h4 className='host-label'>with</h4>
        <h5 className='host-name'>{props.host}</h5>
        <button
          className='join-btn'
          onClick={(e) => {
            joinBtn(e);
          }}
        >
          Join
        </button>
        <div>{attendees.length} People Joined!</div>
      </div>
    </div>
  );
}

export default Event;
