const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  user: String,
  level: String,
  score: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Result", resultSchema);
