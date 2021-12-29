import { router } from "./api/router";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { Data } from "./config";
import { Server } from "socket.io";
dotenv.config();
const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
const PORT = Data.PORT || 3000;
const io = new Server();
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
io.on("Connection", (socket) => {
  console.log("Connection started");
});
app.listen(PORT, () => {
  return console.log(`App is listening at http://localhost:${PORT}`);
});
