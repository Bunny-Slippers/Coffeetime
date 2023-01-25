const { Router } = require("express");
// const User = require() need usermodel
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRouter = router();

const SECRET = "BRUH";

// 🆕🆕🆕🆕🆕 SIGNUP ROUTE 🆕🆕🆕🆕🆕🆕🆕🆕🆕
userRouter.post("/signup", async (req, res) => {
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

userRouter.post("/login", async (req, res) => {
  try {
    // check if user exists first
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      // check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign({ username: user.username }, SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesnt match pal" });
      }
    } else {
      res.status(400).json({ error: "User doesnt exist, pal" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = userRouter;
