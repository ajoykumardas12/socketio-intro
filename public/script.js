import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io();

const form = document.getElementById("form");
const msgInput = document.getElementById("msgInput");
const messages = document.getElementById("messages");

const addUser = (id) => {
  const userAddedEl = document.createElement("div");
  userAddedEl.textContent = `${id} joined the chat`;
  userAddedEl.className = "user-connect";
  messages.appendChild(userAddedEl);
};

const removeUser = (id) => {
  const userRemoveedEl = document.createElement("div");
  userRemoveedEl.textContent = `${id} left the chat`;
  userRemoveedEl.className = "user-disconnect";
  messages.appendChild(userRemoveedEl);
};

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

  if (msgInput.value && msgInput.value.replace(/\s/g, "").length) {
    socket.emit("chat message", msgInput.value);
    addSelfMessage(msgInput.value);
    msgInput.value = "";
  }
});

socket.on("chat message", (msg) => {
  addReceivedMessage(msg);
});

socket.on("user-connected", (id) => {
  addUser(id);
});

socket.on("user-disconnected", (id) => {
  removeUser(id);
});
