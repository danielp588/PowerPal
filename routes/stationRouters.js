const express = require("express");
const router = express.Router();
const Station = require("../models/stationModel");

router.get("/", (req, res) => {
  Station.find() // Fetch all stations from the station collection
    .then((stations) => {
      res.status(200).json(stations); // Send the station as a JSON response
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
});

//Add station to db
router.post("/add-station", (req, res) => {
  const station = new Station({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  station
    .save() //Saves to db
    .then((data) => {
      res.status(201).send("Station added to mongoDB");
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
