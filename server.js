import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import route from "./router/router.js";
import { Server } from "socket.io";
import http from 'http';
import User from "./models/User.js";
import jwt from "jsonwebtoken";

const app = express();
import("./database/connection.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "application/form-data",
    "multipart/form-data"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/api", route)

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", async (socket) => {
  console.log(`a user connected ${socket.id}`);
  console.log(socket.handshake.query.stock_auth)
  if (socket.handshake.query.stock_auth) {
    try {
      const decode = jwt.verify(
        socket.handshake.query.stock_auth,
        process.env.JWT_SECRET
      );
      console.log(decode)
      socket.userId = decode.data && decode.data.id;
      await User.updateOne({ _id: socket.userId }, { $set: { socketId: socket.id } })
    } catch { }
  }


  //join room
  socket.on('joinRoom', (data) => {
    console.log(data)
    socket.join(data.groupId);
    io.in(data.groupId).emit('joinRoomMessage', 'User has Joined')
  })

  //room message
  socket.on('roomMessage', (data) => {
    console.log(data)
    socket.broadcast.to(data.groupId).emit('roomMessageData', data.message)
  })

  //private message
  socket.on('privateMessage', async (data) => {
    console.log(data)
    const receiveSocketId = await User.findOne({ userName: data.userName })
    console.log(receiveSocketId.socketId)
    socket.broadcast.to(receiveSocketId.socketId).emit('privateMessage', data.message);
  })

});
const port = process.env.PORT || 3008;
server.listen(port, () => {
  console.log("listening on *:" + port);
});
