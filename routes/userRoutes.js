const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get("/", (req, res) => {
  User.find() // Fetch all users from the sser collection
    .then((users) => {
      res.json(users); // Send the users as a JSON response
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
});

router.post("/add-user", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  });
  user
    .save() //Saves to db
    .then((data) => {
      res.status(201).send("user added");
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
