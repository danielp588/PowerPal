require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Station = require("./models/stationModel");
const server = express();

async function connect() {
    try {
        await mongoose.connect(URI);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error(error);
    }
}

connect();

server.listen(3000, () => {
    console.log("Server listening on port 3000!");
})

//Adding user to db
server.post('/add-user', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    })
    user.save() //Saves to db
        .then(data => {
            console.log(data);
            res.send("user added");
        }).catch(error => {
            console.error(error);
        });
});

server.use(express.json());

//Routes
const userRouter = require("./routes/userRoutes");
server.use("/users", userRouter);

const stationRouter = require("./routes/stationRouters");
server.use("/stations", stationRouter);
