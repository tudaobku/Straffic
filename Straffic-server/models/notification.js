const query = require("../db");

let getNotiHistory = (req, res) => {
  let { pos, from, to } = req.body;
  query(
    "select Content, Time, Name from Notification inner join CrossRoad on Notification.Pos = CrossRoad.Id where Pos = ? and (Time between ? and ?)",
    [pos, from, to]
  ).then((data) => res.json(data));
};

module.exports = { getNotiHistory };
