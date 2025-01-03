const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  // roomId: {
  //   type: String,
  // },
  receiver: {
    type: String,
  },
  sender: {
    type: String,
  },
  message: {
    type: String,
  },
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
