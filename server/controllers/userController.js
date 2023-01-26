const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {};

const SECRET = 'BRUH';

userController.login = async (req, res, next) => {
  console.log('GGGGGGGGGG');
  try {
    // check if user exists first
    const user = await User.findOne({ username: req.body.username });
    console.log('FOUND USER', user);
    if (user) {
      // check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign({ username: user.username }, SECRET);
        res.cookie('access_token', token, {
          httpOnly: false,
        });
        res.locals.user = { id: user._id, username: user.username };
        return next();
      } else {
        return next({
          message: 'password does not match!',
          status: 400,
        });
      }
    } else {
      return next({
        message: 'User does not exist!',
        status: 400,
      });
    }
  } catch (error) {
    return next({
      message: error,
      status: 400,
    });
  }
};

userController.signup = async (req, res, next) => {
  try {
    // hashes password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create new user
    const user = await User.create(req.body);
    // send new user as response
    // res.json(user);
    res.locals.user = user;
    return next();
  } catch (error) {
    return next({
      message: error,
      status: 400,
    });
  }
};

userController.userAddEvent = async (req, res, next) => {
  try {
    let username = req.params.username;
    let eventId = req.body.eventId;
    let user = await User.findOne({ username });
    let event = await Event.findById(eventId);
    user.joinedEvents.push(event);
    await user.save();
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = userController;
