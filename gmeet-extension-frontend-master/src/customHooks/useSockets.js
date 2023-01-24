import { io } from "socket.io-client";

export const socket = io("http://gmeet-extension.herokuapp.com", {
  // export const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling"],
});

// here we are using the socket.io-client library to connect to the server and listen for events from the server.
