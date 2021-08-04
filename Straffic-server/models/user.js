const query = require("../db");

let getProfile = (req, res) => {
  query(
    "select BirthDate, CreateAt, Id, IdNo, Name, Ranks, Religion, Sex, UpdateAt, UrlAvatar, WorkPlace, username from User where username = ? limit 1",
    [req.user.username]
  ).then((data) => {
    res.json(data[0]);
  });
};

module.exports = {
  getProfile: getProfile,
};
