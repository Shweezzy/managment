const { Schema, model } = require("mongoose");

const employee = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

module.exports = model("Employee", employee);
