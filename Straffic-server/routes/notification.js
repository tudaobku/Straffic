const express = require("express");
const router = express.Router();
const notification = require("../models/notification");

router.post("/history", notification.getNotiHistory);

module.exports = router;
