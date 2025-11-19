const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ath",
    required: true,
  },
});

const noteModel = mongoose.model("not", noteSchema);

module.exports = noteModel;
