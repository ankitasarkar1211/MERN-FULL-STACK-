const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  room: { type: String, required: true },
  user: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);