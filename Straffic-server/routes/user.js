const express = require("express");
const router = express.Router();
const user = require("../models/user");

router.post("/profile", user.getProfile);

module.exports = router;
