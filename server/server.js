const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
const Event = require('./models/eventModel');

const app = express();
const http = createServer(app);
const io = new Server(http, {});

// added by justin

const morgan = require('morgan');
const { log } = require('mercedLogger');
const cors = require('cors');
const userRouter = require('./controllers/userRoute');
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController');

// ⬇️⬇️⬇️⬇️⬇️⬇️⬇️ Justin/Auth Stuff ⬇️⬇️⬇️⬇️⬇️⬇️⬇️
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

// ROUTES AND ROUTES

app.use('/user', userRouter);

// allows user to be authorized
app.get('/protected', userController.authorization, (req, res) => {
  return res.json({ user: { username: req.username } });
});

// ⬇️⬇️⬇️⬇️⬇️ WEBSOCKET SHIT ⬇️⬇️⬇️⬇️⬇️⬇️⬇️
let initLoad;

io.on('connection', (socket) => {
  // We know websockets are connected
  console.log('Server connected ' + socket.id);
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
  // When connected, fetch the events
  // and send them to the frontend

  socket.on('sync', () => {
    Event.find({}).then((data) => {
      io.emit('sync', data);
    });
  });
  // listen to action 'newEvent',
  // once receive event from client, store it in databasa
  socket.on('newEvent', (newEvent) => {
    //create new event in database
    Event.create(newEvent)
      .then((data) => {
        console.log('data in db');
      })
      .catch((err) => console.log(err));
  });

  socket.on('joinEvent', async (object) => {
    let eventId = object.eventId;
    let username = object.username;
    let event = await Event.findById(eventId);
    console.log('USERNAME from server.js', username);
    if (event.details.attendees.includes(username)) {
      console.log('JOINED from server.js');
      io.emit('joinEvent', 'Joined already');
    } else {
      event.details.attendees.push(username);
      await event.save();
      let newEvent = await Event.findById(eventId);
      console.log(newEvent);
      io.emit('updateEvent', newEvent);
    }
  });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ error: { message: err.message, status: err.status } });
});

http.listen(3000, () => {
  console.log('listening on 3000');
});
