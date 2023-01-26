//db username: coffeeapp password: codesmith

// const mongoose = require("mongoose");
const mongoose = require("../db/db");
mongoose.set("strictQuery", false);

//const User = require("./userModel.js");

const EventSchema = new mongoose.Schema({
  host: String,
  join: [{ userName: String }],
  created: {
    type: Date,
    required: true,
  },
  eventTime: { type: String },
  details: {
    title: { type: String, required: true },
    // date: { type: Date, required: true },
    description: String,
    attendees: Array,
  },
});
/*click join- client will send userName and event id, server 
will go to datatbase, find event with id, add userName to join.*/

const Event = mongoose.model("Event", EventSchema);

// main()
//   .then(() => console.log("db connected"))
//   .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(
//     "mongodb+srv://coffeeapp:codesmith@cluster0.uvxqper.mongodb.net/?retryWrites=true&w=majority"
//   );
// }

module.exports = Event;
