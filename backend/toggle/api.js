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

const users = {}; // Object to keep track of connected users

io.on("connection", (socket) => {
  console.log(`User  connected: ${socket.id}`);

  // Add user to the users object
  users[socket.id] = { id: socket.id, status: "online" };

  // Broadcast the updated user list to all clients
  io.emit("userStatusUpdate", users);

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);

    // Remove user from the users object
    delete users[socket.id];

    // Broadcast the updated user list to all clients
    io.emit("userStatusUpdate", users);
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
