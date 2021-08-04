const jwt = require("jsonwebtoken");
const query = require("../db");
const crypto = require("crypto");

let generateAccessToken = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "18000s" });
};

let hash = (string) => {
  return crypto
    .createHmac("sha256", process.env.HASH_SECRET)
    .update(string)
    .digest("hex");
};

let postLogin = (req, res) => {
  let { username, password } = req.body;

  query(
    "select username from User where username = ? and password = ? limit 1",
    [username, hash(password)]
  ).then((data) => {
    if (data.length) {
      const token = generateAccessToken({ username: username });
      res.json({
        message: "success",
        userToken: token,
        username: username,
      });
    } else {
      res.status(401).send("User not exist!");
    }
  });
};

let authenticateToken = (req, res, next) => {
  if (req.path === "/login") return next();
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.redirect("/login");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) {
      return res.sendStatus(403);
    }

    console.log(user);
    req.user = user;

    next();
  });
};

module.exports = {
  postLogin: postLogin,
  authenticateToken: authenticateToken,
};
