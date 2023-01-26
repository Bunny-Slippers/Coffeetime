import React from "react";

const Modal = (props) => {
  const { attendees, top, left } = props;

  const elements = [];

  attendees.forEach((att) => {
    if (att) {
      elements.push(<p>{att.username}</p>);
    }
  });

  const divStyle = {
    position: "absolute",
    left: left + "px",
    top: top + "px",
    margin: 0,
    padding: "10px",
    backgroundColor: "#27c2a0",
    borderRadius: "10px",
  };
  return <div style={divStyle}>{elements}</div>;
};

export default Modal;
