const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ["beginner", "intermediate", "advanced"],
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: Number, // index of correct answer
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
