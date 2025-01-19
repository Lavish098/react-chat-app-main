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

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("registerUser", (userId) => {
    onlineUsers[userId] = socket.id;

    socket.broadcast.emit("userStatus", { userId, online: true });
  });

  socket.on("message", (message) => {
    console.log(message);

    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");

    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];

        socket.broadcast.emit("userStatus", { userId, online: false });
        break;
      }
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
