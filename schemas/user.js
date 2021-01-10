const { Schema, model } = require("mongoose");

const user = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("User", user);
