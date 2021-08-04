const express = require("express");
const router = express.Router();
const { changeAIMode, getCycleTime, getAIMode } = require("../mqtt");

router.get("/mode", (req, res) => {
  res.json({'response': getAIMode()})
})

router.post("/mode", (req, res) => {
  changeAIMode(req.body.type);
  res.end();
});

router.post("/time", getCycleTime);

module.exports = router;
