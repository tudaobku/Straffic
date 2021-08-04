const express = require("express");
const router = express.Router();
const prediction = require("../models/prediction");

router.post("/density", prediction.getTrafficDensity);

module.exports = router;
