const Chat = require("../models/chat.model");
const User = require("../models/user.model");

const getUser = async (req, res) => {
  const query = req.query.username;
  try {
    const user = await User.find({ username: query });
    if (user) return res.status(200).json(user);
    res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const sendMessage = async (req, res) => {
  const { sender, receiver, message } = req.body;
  const newMessage = new Chat({ sender, receiver, message });
  await newMessage.save();
  const io = req.app.locals.io;

  // io.to(receiver).emit("message", newMessage); // Emit to the specific receiver
  res.status(201).json(newMessage);
};

const getMessage = async (req, res) => {
  const { username } = req.params;
  const { user } = req.query;

  const messages = await Chat.find({
    $or: [
      { sender: user, receiver: username },
      { sender: username, receiver: user },
    ],
  }).sort({ timestamp: "asc" });
  res.json(messages);
};
module.exports = { getUser, sendMessage, getMessage };
