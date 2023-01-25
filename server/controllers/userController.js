const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userController = {};
const SECRET = 'BRUH';
userController.login = async (req, res, next) => {
  console.log(req.body);
  try {
    // check if user exists first
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      console.log('USER' + user);
      // check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        console.log('RESULT' + result);

        // sign token and send it in response
        const token = await jwt.sign({ username: user.username }, SECRET);
        res.cookie('access_token', token, {
          httpOnly: true,
        });
        return next();
      } else {
        res.status(400).json({ error: "password doesn't match pal" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist, pal" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: 'unknown error caught in userController.login' });
  }
};
userController.signup = async (req, res, next) => {
  console.log(req.body);
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
