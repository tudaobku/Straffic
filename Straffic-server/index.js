const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 80;
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const auth = require("./models/authentication");
const checker = require("./models/checker");
const userRouter = require("./routes/user");
const roadRouter = require("./routes/road");
const sensorRouter = require("./routes/sensor");
const notificationRouter = require("./routes/notification");
const predictionRouter = require("./routes/prediction");
const aiRouter = require("./routes/aimode");
const mqtt_client = require("./mqtt");

app.get("/", (req, res) => {
  res.send("API");
});

app.use(cors());
app.use(checker.checkDB);
app.use(auth.authenticateToken);

app.post("/login", auth.postLogin);
app.use("/user", userRouter);
app.use("/road", roadRouter);
app.use("/sensor", sensorRouter);
app.use("/notification", notificationRouter);
app.use("/prediction", predictionRouter);
app.use("/ai", aiRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
