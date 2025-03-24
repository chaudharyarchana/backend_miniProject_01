const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/login`);

const loginSchema = mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model("login", loginSchema);
