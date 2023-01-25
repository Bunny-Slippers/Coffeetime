const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("Event", UserSchema);

module.exports = User;
