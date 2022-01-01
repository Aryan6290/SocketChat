import { signInNewUser } from "./api/chat/chatController";
import { router } from "./api/router";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { Data } from "./config";
import { Server } from "socket.io";
import http from "http";
dotenv.config();
const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

const server = http.createServer(app);

const PORT = Data.PORT || 3000;
const io = new Server(server);
app.get("/", (req, res) => {
  res.send("Welcome to socket chat!");
});
app.use(
  "/api",
  (req, res, next) => {
    console.log(req.url);
    next();
  },
  router
);

io.on("connection", (socket) => {
  console.log("Connection started");
  socket.on("signin", (id) => {
    signInNewUser(socket, id);
  });
  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});

app.listen(PORT, () => {
  return console.log(`App is listening at http://localhost:${PORT}`);
});
