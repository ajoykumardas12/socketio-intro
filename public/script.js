import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io();

const form = document.getElementById("form");
const msgInput = document.getElementById("msgInput");
const messages = document.getElementById("messages");

const addSelfMessage = (message) => {
  const msgElement = document.createElement("div");
  msgElement.textContent = message;
  msgElement.className = "message self";
  messages.appendChild(msgElement);
};

const addReceivedMessage = (message) => {
  const msgElement = document.createElement("div");
  msgElement.textContent = message;
  msgElement.className = "message received";
  messages.appendChild(msgElement);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (msgInput.value) {
    socket.emit("chat message", msgInput.value);
    addSelfMessage(msgInput.value);
    msgInput.value = "";
  }
});

socket.on("chat message", (msg) => {
  addReceivedMessage(msg);
});
