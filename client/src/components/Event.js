import React, { useEffect } from 'react';
import { json } from 'react-router-dom';

//containers for individual events
function Event(props) {
  let eventTime = props.eventTime.slice(0, 2);
  let eventCopy = props.eventTime;

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
  function likeBtn() {
    fetch(url, {
      methods: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: props.user, eventId: props._id }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
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
        <button className='like-btn'>
          <span className='like-icon-default'></span>
          <span className='like-icon-liked'></span>
          Join
        </button>
      </div>
    </div>
  );
}

export default Event;

<button class='btn btn-like'>
  <span class='btn-icon btn--icon-default'>
    <span class='fa fa-heart'></span>
  </span>
  <span class='btn-icon btn--icon-liked'>
    <span class='fa fa-heart'></span>
  </span>
  <span class='btn-content  btn-content--liked'>Liked</span>
  <span class='btn-content btn-content--default'>Like</span>
</button>;
