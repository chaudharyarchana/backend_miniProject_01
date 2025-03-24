const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/users`);

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  age: Number,
});

module.exports = mongoose.model("user", userSchema);
