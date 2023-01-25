const mongoose = require("mongoose"); //import fresh mongoose object
const { log } = require("mercedlogger"); // import merced logger

//DESTRUCTURE ENV VARIABLES
const DATABASE_URL =
  "mongodb+srv://coffeeapp:codesmith@cluster0.uvxqper.mongodb.net/?retryWrites=true&w=majority";

// CONNECT TO MONGO
mongoose.connect = mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// CONNECTION EVENTS
mongoose.connection
  .on("open", () => log.cyan("DATABASE STATE", "Connection Open"))
  .on("close", () => log.magenta("DATABASE STATE", "Connection Open"))
  .on("error", (error) => log.red("DATABASE STATE", error));

// EXPORT CONNECTION
module.exports = mongoose;
