const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const Event = require("./models/eventModel");

const app = express();
const http = createServer(app);
const io = new Server(http, {});

// added by justin
const morgan = require("morgan");
const { log } = require("mercedLogger");
const cors = require("cors");
const userRouter = require("./controllers/userController");

// ⬇️⬇️⬇️⬇️⬇️⬇️⬇️ Justin/Auth Stuff ⬇️⬇️⬇️⬇️⬇️⬇️⬇️
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

// ROUTES AND ROUTES

app.use("/user", userRouter);

// ⬇️⬇️⬇️⬇️⬇️ WEBSOCKET SHIT ⬇️⬇️⬇️⬇️⬇️⬇️⬇️
let initLoad;

io.on("connection", (socket) => {
  // We know websockets are connected
  console.log("Server connected " + socket.id);
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
  // When connected, fetch the events
  // and send them to the frontend

  socket.on("initialLoad", () => {
    Event.find({}).then((data) => {
      initLoad = data;
      console.log("initLoad: ", initLoad);
      io.emit("initialLoad", data);
    });
  });
  // listen to action 'newEvent',
  // once receive event from client, store it in databasa
  socket.on("newEvent", (newEvent) => {
    console.log("incoming event is: ", newEvent);
    //create new event in database
    Event.create(newEvent).then((data) => {
      console.log("new Event is: ", newEvent);
      io.emit("loadEvents", [newEvent]);
    });
  });
});

http.listen(3000, () => {
  console.log("listening on 3000");
});
