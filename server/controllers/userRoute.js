const { Router } = require("express");
const { login, signup } = require("./userController");

const userRouter = Router();

// const SECRET = "BRUH";

// 🆕🆕🆕🆕🆕 SIGNUP ROUTE 🆕🆕🆕🆕🆕🆕🆕🆕🆕
userRouter.post("/signup", signup, (req, res) => {
  res.status(200).json(res.locals.user);
});

// 🆗🆗🆗🆗🆗🆗 LOGIN ROUTE 🆗🆗🆗🆗🆗🆗🆗🆗

userRouter.post("/login", login, (req, res) => {
  res.status(200).json("Login successfully 😍");
});

module.exports = userRouter;
