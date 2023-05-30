const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const app = express();

app.use(express.json());

const uri = 'mongodb+srv://admin:dladmin123@cluster0.24c4gr0.mongodb.net/PowerPal-API?retryWrites=true&w=majority';

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

connect();

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})

app.get('/', (req, res) => {
    res.send("Node js - '/' ");
})

app.post('/add-user', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    })
    user.save()
    .then(data => {
        console.log(data);
        res.send("user added");
    }).catch(error => {
        console.error(error);
    });
})