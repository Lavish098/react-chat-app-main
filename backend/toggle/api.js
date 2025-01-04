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
});
app.locals.io = io;

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(authRoute);
app.use(chatRoute);

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("message", (message) => {
    console.log(message);

    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
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
