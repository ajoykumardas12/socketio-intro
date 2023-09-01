import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io();

const form = document.getElementById("form");
const msgInput = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (msgInput.value) {
    socket.emit("chat message", msgInput.value);
    msgInput.value = "";
  }
});

socket.on("chat message", (msg) => {
  console.log("new message: " + msg);
});

console.log(form);
