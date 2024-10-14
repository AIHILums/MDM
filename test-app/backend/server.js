import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import { type } from "os";

const server = http.createServer(app);

// config({
//   path: "./config.env",
// });
// connect();

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});