const admin = require("firebase-admin");
const query = require("../db");
var serviceAccount = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let getNowDateTime = () => {
  const d = new Date();
  return (
    d.getFullYear() +
    "/" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + d.getDate()).slice(-2) +
    " " +
    ("0" + d.getHours()).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2) +
    ":" +
    ("0" + d.getSeconds()).slice(-2)
  );
};

const push = (loc) => {
  const topic = "warning";
  const content =
    "Dữ liệu cảm biến có sự bất thường " + "\nVị trí: Đường " + loc.road;
  const message = {
    notification: {
      title: "Ngã tư " + loc.crossRoad,
      body: content,
    },
    topic: topic,
  };

  const nowTime = getNowDateTime();
  query(
    "insert into Notification (Pos, Content, Time, CreateAt, UpdateAt) values(?, ?, TIMESTAMP(?), ?, ?)",
    [loc.crossRoadId, content, nowTime, nowTime, nowTime]
  );

  console.log(message);

  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

const pushOver = (loc, sensor, data) => {
  const topic = "warning";
  const content =
    "Cảm biến " +
    sensor +
    " vượt ngưỡng - " +
    data +
    "\nVị trí: Đường " +
    loc.road;
  const message = {
    notification: {
      title: "Ngã tư " + loc.crossRoad,
      body: content,
    },
    topic: topic,
  };

  const nowTime = getNowDateTime();
  query(
    "insert into Notification (Pos, Content, Time, CreateAt, UpdateAt) values(?, ?, TIMESTAMP(?), ?, ?)",
    [loc.crossRoadId, content, nowTime, nowTime, nowTime]
  );

  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

module.exports = { push, pushOver };
