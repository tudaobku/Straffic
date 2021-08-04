const express = require("express");
const router = express.Router();
const sensor = require("../models/sensor");

router.post("/temp", sensor.getTempData);
router.post("/gas", sensor.getGasData);
router.post("/sound", sensor.getSoundData);
router.post("/all", sensor.getAllData);

module.exports = router;
