const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

let users = {}; // For storing online users

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("join", ({ token }) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      users[socket.id] = decoded.userId;
      io.emit("message", "A new user has joined the chat");
    } catch (err) {
      console.error("Invalid token");
    }
  });

  socket.on("chatMessage", (message) => {
    io.emit("message", message); // Broadcast message to all users
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("message", "A user has left the chat");
  });
});

app.get("/", (req, res) => {
  res.send("hey ram");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
