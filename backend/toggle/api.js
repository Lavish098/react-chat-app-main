const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./src/routes/authRoutes");
const chatRoute = require("./src/routes/ChatRoutes");
const dotenv = require("dotenv");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // React app URL
    methods: ["GET", "POST"],
    credentials: true,
  },
  maxHttpBufferSize: 1e8,
});
app.locals.io = io;

dotenv.config();

const corsOptions = (req, callback) => {
  const origin = req.header("Origin");
  const allowedOrigins = [
    "https://react-chat-app-main-nine.vercel.app",
    "http://localhost:5173",
  ];

  if (allowedOrigins.includes(origin)) {
    callback(null, { origin: true });
  } else {
    callback(null, { origin: false });
  }
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(authRoute);
app.use(chatRoute);

const connectedUsers = {}; // Map username -> socket ID

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Track username when a user joins
  socket.on("join", (username) => {
    connectedUsers[username] = socket.id;
    console.log(`${username} connected with socket ID: ${socket.id}`);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    for (const [username, socketId] of Object.entries(connectedUsers)) {
      if (socketId === socket.id) {
        delete connectedUsers[username];
        console.log(`${username} disconnected`);
        break;
      }
    }
    console.log("Socket disconnected: ", socket.id);
  });

  // Listen for messages
  socket.on("message", ({ sender, receiver, message }) => {
    console.log(`Message from ${sender} to ${receiver}: ${message}`);

    const receiverSocketId = connectedUsers[receiver];
    if (receiverSocketId) {
      // Emit message to the specific receiver
      io.to(receiverSocketId).emit("message", { sender, message });
    } else {
      console.log(`Receiver ${receiver} is not online.`);
    }
  });
});

app.get("/", async (req, res) => {
  res.status(200).json("Welcome to CHAT API!");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(() => {
    console.log("Connection failed");
  });
