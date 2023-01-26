const mongoose = require("../db/db");
mongoose.set("strictQuery", false);

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  attend: Array,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
