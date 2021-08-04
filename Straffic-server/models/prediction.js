const query = require("../db");

let getTrafficDensity = (req, res) => {
  let { temp, noise, gas } = req.body;
  let density = temp + noise / 8 + gas * 5 - 31;
  res.json(density);
};

module.exports = { getTrafficDensity };
