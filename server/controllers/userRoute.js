const { Router, json } = require('express');
const { login, signup } = require('./userController');
const { joinEvent } = require('./eventController');

const userRouter = Router();

// const SECRET = "BRUH";

// 🆕🆕🆕🆕🆕 SIGNUP ROUTE 🆕🆕🆕🆕🆕🆕🆕🆕🆕
userRouter.post('/signup', signup, (req, res) => {
  res.status(200).json(res.locals.user);
});

// 🆗🆗🆗🆗🆗🆗 LOGIN ROUTE 🆗🆗🆗🆗🆗🆗🆗🆗

userRouter.post('/login', login, (req, res) => {
  res.status(200).json(res.locals.user);
});

userRouter.patch('/join', joinEvent, (req, res) => {
  res.send(200).json('joined event');
});

module.exports = userRouter;
