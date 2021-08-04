const query = require("../db");

const checkDB = (req, res, next) => {
  query("select * from Notification limit 1", [])
    .then((data) => {
      next();
    })
    .catch((error) => {
      res.send("DATABASE ERROR");
    });
};

module.exports = { checkDB };
