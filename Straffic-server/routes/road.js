const express = require("express");
const router = express.Router();
const road = require("../models/road");

router.post("/crossroad", road.getCrossRoad);

module.exports = router;
