const { Router } = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {};

const SECRET = 'BRUH';

// 🆕🆕🆕🆕🆕 SIGNUP ROUTE 🆕🆕🆕🆕🆕🆕🆕🆕🆕
userRouter.post('/signup', async (req, res) => {
  try {
    // hashes password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create new user
    const user = await User.create(req.body);
    // send new user as response
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// 🆗🆗🆗🆗🆗🆗 LOGIN ROUTE 🆗🆗🆗🆗🆗🆗🆗🆗

userRouter.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    // check if user exists first
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      // check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign({ username: user.username }, SECRET);
        res.cookie("access_token", token, {
          httpOnly: true,
        });
        return next();
      } else {
        res.status(400).json({ error: 'password doesnt match pal' });
      }
    } else {
      res.status(400).json({ error: 'User doesnt exist, pal' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "unknown error caught in userController.login" });
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
    res.status(400).json({ error });
  }
};

module.exports = userController;
