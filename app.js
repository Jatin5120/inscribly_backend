const express = require("express");
const cors = require("cors");
const {
  authRouter,
  uploadRouter,
  postRouter,
} = require("./src/routers/routers");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", authRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/post", postRouter);

module.exports = { app };
