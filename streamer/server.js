import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// console.log(io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    // Track users in room
    const room = io.sockets.adapter.rooms.get(roomId) || new Set();
    const isFirstUser = room.size === 0;

    socket.join(roomId);
    console.log(`${socket.id} joined ${roomId}, first: ${isFirstUser}`);

    // Notify others (not self)
    socket.to(roomId).emit("user-joined", socket.id);
  });

  socket.on("offer", ({ offer, roomId }) => {
    socket.to(roomId).emit("offer", offer);
  });
  socket.on("answer", ({ answer, roomId }) => {
    socket.to(roomId).emit("answer", answer);
  });
  socket.on("ice-candidate", ({ candidate, roomId }) => {
    console.log("ICE candidate for room:", roomId);
    socket.to(roomId).emit("ice-candidate", candidate);
  });
});

app.get("/health", async (req, res) => {
  res.status(200).json({
    message: "HELLO",
  });
});

const PORT = 5500;
server.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));


