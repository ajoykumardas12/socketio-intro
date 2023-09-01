const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  io.emit("user-connected", socket.id);

  socket.on("chat message", (message) => {
    socket.broadcast.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    io.emit("user-disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
