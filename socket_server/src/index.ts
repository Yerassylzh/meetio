import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/health", (req: Request, res: Response) => {
  res.send("Socket.io server is running!");
});

interface TokenUser {
  name: string;
  email: string;
}

let socketToUser: { [k: string]: TokenUser } = {};
let peerToUser: { [k: string]: TokenUser } = {};
let emailToPeerId: { [k: string]: string } = {};

io.on("connection", (socket) => {
  socket.on("register-user", (userPeerId, userName, userEmail) => {
    const user = { name: userName, email: userEmail };
    socketToUser[socket.id] = user;
    peerToUser[userPeerId] = user;
    emailToPeerId[user.email] = userPeerId;
  });

  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    const user = socketToUser[socket.id];
    const peerId = emailToPeerId[user.email];
    socket.broadcast
      .to(roomId)
      .emit("user-joined", peerId, user.name, user.email);

    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", user.email);
    });

    socket.on("mic-on", (user: TokenUser, roomId) => {
      socket.broadcast.to(roomId).emit("mic-on", user);
    });

    socket.on("mic-off", (user: TokenUser, roomId) => {
      socket.broadcast.to(roomId).emit("mic-off", user);
    });

    socket.on("camera-on", (user: TokenUser, roomId) => {
      socket.broadcast.to(roomId).emit("camera-on", user);
    });

    socket.on("camera-off", (user: TokenUser, roomId) => {
      socket.broadcast.to(roomId).emit("camera-off", user);
    });
  });
});

server.listen(3001, () => {
  console.log("Socket.IO server is running on http://localhost:3001");
});
