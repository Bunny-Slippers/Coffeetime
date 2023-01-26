import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import { useSelector, useDispatch } from 'react-redux';
import { eventsInit, eventsUpdate, syncEvent } from '../redux/slice';

function CreateForm(props) {
  //useState hooks that saves the input fields data automatically;
  const [event, useEvent] = useState('');
  const [time, useTime] = useState('10:00');
  const isLoggedIn = useSelector((state) => state.global.isLoggedIn);
  const username = useSelector((state) => state.global.user.username);
  const dispatch = useDispatch();

  // handle submit event handler that onlcick of the button, grab host and event and emit it to the backend
  const handleSubmit = (e) => {
    //stop page from refreshing and losing connection to socket
    e.preventDefault();
    const newEvent = {
      host: username,
      created: new Date(),
      eventTime: time,
      details: { title: event },
    };
    //send a newEvent type event to the backend, which knows to add this into the db.
    props.socket.emit('newEvent', newEvent);
    props.socket.emit('sync', (message) => {
      console.log(message);
      dispatch(syncEvent(message));
    });
  };

  function disableHandler(event) {
    if (!event) {
    }
  }

  //onChange lets us dynamically grab the values in the form and send to state
  //handleSubmit will run when we submit and send the data back to db

  return (
    <div id='create-form'>
      <h2>Create an event 🎉</h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {/* <label id='host-input-and-label'> Host
          <input id='host-input' type='text' onChange={(e) => useHost(e.target.value)} value={host} />
        </label>  */}
        <label id='event-input-and-label'>
          Event
          <input
            id='event-input'
            type='text'
            disabled={isLoggedIn ? false : true}
            onChange={(e) => {
              useEvent(e.target.value);
            }}
            value={isLoggedIn ? event : 'Please Log In'}
          />
        </label>
        <div className='submitting'>
          <TimePicker onChange={useTime} value={time} disableClock={true} />
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;
