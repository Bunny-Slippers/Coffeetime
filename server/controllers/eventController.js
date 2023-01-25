const Event = require("../models/eventModel");

const eventController = {};

eventController.joinEvent = async (req, res, next) => {
  let eventId = req.body.eventId;
  let username = req.body.username;
  let userId = req.body.userId;
  let obj = { username, userId };
  try {
    let event = await Event.findById(eventId);
    event.details.attendees.push(obj);
    await event.save();
    return next();
  } catch (err) {
    next({ message: "event not found in db", status: 400 });
  }
};

module.exports = eventController;
