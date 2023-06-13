require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Station = require("./models/stationModel");
const server = express();

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

server.use(express.json());

//Routes
const userRouter = require("./routes/userRoutes");
server.use("/users", userRouter);

const stationRouter = require("./routes/stationRouters");
server.use("/stations", stationRouter);
