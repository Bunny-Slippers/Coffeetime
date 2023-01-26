const Event = require('../models/eventModel');

const eventController = {};

eventController.joinEvent = async (req, res, next) => {
  let eventId = req.body.eventId;
  let username = req.body.username;
  // let userId = req.body.userId;
  // let obj = { username, eventId };
  try {
    let event = await Event.findById(eventId);

    if (event.details.attendees.includes(username)) {
      next({ message: 'User Already Joined', status: 400 });
    }
    event.details.attendees.push(username);
    await event.save();
    return next();
  } catch (err) {
    next({ message: 'event not found in db', status: 400 });
  }
};

module.exports = eventController;
