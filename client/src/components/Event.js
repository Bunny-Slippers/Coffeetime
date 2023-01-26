import React, { useEffect } from "react";
import Modal from "./Modal";
import { json } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { eventsUpdate, openModal, closeModal } from "../redux/slice";

//containers for individual events
function Event(props) {
  let eventTime = props.eventTime.slice(0, 2);
  let eventCopy = props.eventTime;
  let attendees = props.attendees;
  let eventId = props._id;
  let socket = props.socket;
  const username = useSelector((state) => state.global.user.username);
  const modal = useSelector((state) => state.global.modalState);

  const dispatch = useDispatch();

  const handleOpenModal = (e) => {
    const left = e.pageX;
    const top = e.pageY;
    const id = eventId;
    const value = attendees;
    dispatch(openModal({ left, top, id, value }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  if (Number(eventTime) > 12) {
    let replaceStr = (Number(eventTime) - 12).toString();
    eventCopy = replaceStr + eventCopy.slice(2);
    eventCopy += " PM";
  } else {
    eventCopy += " AM";
  }

  const colors = ["#E4C988", "#C27664", "#B05A7A", "#84D2C5"];
  const styleObj = {
    fontSize: " 52px",
    fontWeight: 500,
    textDecoration: "underline",
    textDecorationColor: colors[props.colorCounter],
    "text-decoration-thickness": "9px",
    textUnderlinePosition: "auto",
  };

  let url = "http://localhost:3000/user/join";
  function joinBtn(e) {
    console.log(username);
    e.preventDefault();
    socket.emit("joinEvent", { username: username, eventId: eventId });
    socket.on("updateEvent", (updatedEvent) => {
      dispatch(eventsUpdate(updatedEvent));
    });
  }

  return (
    <div className="event">
      <h3
        className="event-name"
        style={styleObj}
      >{`${props.details} @${eventCopy}`}</h3>
      <div className="host-info">
        <h4 className="host-label">with</h4>
        <h5 className="host-name">{props.host}</h5>
        <button
          className="join-btn"
          onClick={(e) => {
            joinBtn(e);
          }}
        >
          Join
        </button>
        {modal.open && modal.id === eventId && attendees.length > 0 && (
          <Modal
            attendees={attendees}
            left={modal.position.left}
            top={modal.position.top}
          />
        )}
        <div
          onMouseEnter={(e) => handleOpenModal(e)}
          onMouseLeave={handleCloseModal}
          id="number-joined"
        >
          {attendees.length} People Joined!
        </div>
      </div>
    </div>
  );
}

export default Event;
