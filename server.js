const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Station = require('./models/stationModel');
const server = express();

server.use(express.json());

const URI = 'mongodb+srv://admin:dladmin123@cluster0.24c4gr0.mongodb.net/PowerPal-API?retryWrites=true&w=majority';

async function connect() {
    try {
        await mongoose.connect(URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

connect();

server.listen(3000, () => {
    console.log("Server listening on port 3000");
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

//Add station to db
server.post('/add-station', (req, res) => {
    const station = new Station({
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    })
    station.save() //Saves to db
        .then(data => {
            console.log(data);
            res.send("station added");
        }).catch(error => {
            console.error(error);
        });
});

server.get('/users', (req, res) => {
    User.find() // Fetch all users from the sser collection
        .then(users => {
            res.json(users); // Send the users as a JSON response
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        });
});

server.get('/stations', (req, res) => {
    Station.find() // Fetch all stations from the station collection
        .then(stations => {
            res.json(stations); // Send the station as a JSON response
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        });
});