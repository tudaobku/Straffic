const mqtt = require("mqtt");
const { topic1, topic2, topic3 } = require("./topics");
const query = require("./db");
const axios = require("axios");
const notification = require("./Service/Notification");
var AIMode = false;
var cycleBeginTime = Date.now();
var lightTime = [];
var timer1, timer2, timer3, timer4, timer5, timer6, timer7;
var idCycle = 0;
var cycleLoadingTime = true;

const getAIMode = () => {
  return AIMode;
};

let changeAIMode = async (type) => {
  type = parseInt(type);
  if ((AIMode && type === 1) || (!AIMode && type === 0)) return;
  AIMode = type === 1 ? true : false;
  console.log("AIMode:", AIMode);
  for (let timer of [timer1, timer2, timer3, timer4, timer5, timer6, timer7]) {
    if (timer) clearTimeout(timer);
  }
  idCycle += 1;
  if (idCycle > 1000) idCycle = 0;
  cycle(idCycle);
};
let getCycleTime = (req, res) => {
  let t = setInterval(() => {
    if (!cycleLoadingTime) {
      res.json([
        {
          green: cycleBeginTime + lightTime[0].green * 1000,
          yellow:
            cycleBeginTime +
            lightTime[0].green * 1000 +
            lightTime[0].yellow * 1000,
          red:
            cycleBeginTime +
            lightTime[0].green * 1000 +
            lightTime[0].red * 1000 +
            lightTime[0].yellow * 1000,
        },
        {
          red: cycleBeginTime + lightTime[1].red * 1000,
          green:
            cycleBeginTime +
            lightTime[1].red * 1000 +
            lightTime[1].green * 1000,
          yellow:
            cycleBeginTime +
            lightTime[1].green * 1000 +
            lightTime[1].red * 1000 +
            lightTime[1].yellow * 1000,
        },
      ]);
      clearInterval(t);
    }
  }, 100);
};
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
const queryLocation = (sensor) => {
  return `select r.Name as road, c.Name as crossRoad, c.Id as crossRoadId from ${sensor} s join DeviceLocation d on s.LocationId = d.Id join RoadCrossRoad rc on d.RoadCrossRoadId = rc.Id join Road r on rc.RoadId = r.Id join CrossRoad c on rc.CrossRoadId = c.Id where s.Id = ?`;
};
const randomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()+=-";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
const options = {
  host: process.env.MQTT_SERVER,
  port: process.env.MQTT_PORT,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  clientId: randomString(50),
};
const options2 = {
  host: process.env.MQTT_SERVER_2,
  port: process.env.MQTT_PORT_2,
  username: process.env.MQTT_USERNAME_2,
  password: process.env.MQTT_PASSWORD_2,
  clientId: randomString(50),
};
const options3 = {
  host: process.env.MQTT_SERVER_3,
  port: process.env.MQTT_PORT_3,
  username: process.env.MQTT_USERNAME_3,
  password: process.env.MQTT_PASSWORD_3,
  clientId: randomString(50),
};

let client = mqtt.connect(options);
let client2 = mqtt.connect(options2);
let client3 = mqtt.connect(options3);

client.on("connect", () => {
  console.log("MQTT connected");
});

client2.on("connect", () => {
  console.log("MQTT connected 2");
});

client3.on("connect", () => {
  console.log("MQTT connected 3");
});

var sensorData = [35, 500, 0, 35, 500, 0];

const getDensity = async () => {
  try {
    var data1 = {
      data: [
        {
          temperature: parseInt(sensorData[0]),
          noise: parseInt(sensorData[1]),
          gas: parseInt(sensorData[2]),
        },
        {
          temperature: parseInt(sensorData[3]),
          noise: parseInt(sensorData[4]),
          gas: parseInt(sensorData[5]),
        },
      ],
    };
    const predictDensity = await axios.post(
      "localhost/predict" + "/traffic_density",
      JSON.stringify(data1),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // alert(typeof predictDensity.data['response']);
    return predictDensity.data["response"];
  } catch (err) {
    console.log(err);
  }
};
const getTimeCountDown = async () => {
  var density = await getDensity();
  var data1 = {
    data: density,
  };
  try {
    const predictTime = await axios.post(
      "localhost/predict" + "/traffic_light_time",
      JSON.stringify(data1),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return predictTime.data["response"];
  } catch (err) {
    console.log(err);
  }
};
const setTimeCountDown = async () => {
  if (AIMode) {
    console.log("AI mode is on!!! sensorData is changed:", sensorData);
    if (sensorData.every((x) => x > -1)) {
      lightTime = await getTimeCountDown();
      sensorData = [-1, -1, -1, -1, -1, -1];
      console.log(
        "Set time already!!! sensorData is set to default:",
        sensorData
      );
    }
  }
};
const cycle = async (id) => {
  if (!AIMode) return;
  cycleLoadingTime = true;
  lightTime = await getTimeCountDown();
  console.log(lightTime);
  if (id !== idCycle) return;
  cycleBeginTime = Date.now();
  cycleLoadingTime = false;
  timer1 = setTimeout(() => {
    changeLightToGreen(0);
  }, 0);
  timer2 = setTimeout(() => {
    changeLightToRed(1);
  }, 0);

  timer3 = setTimeout(() => {
    changeLightToYellow(0);
  }, lightTime[0].green * 1000);
  timer4 = setTimeout(() => {
    changeLightToGreen(1);
  }, lightTime[1].red * 1000);

  timer5 = setTimeout(() => {
    changeLightToRed(0);
  }, (lightTime[0].yellow + lightTime[0].green) * 1000);
  timer6 = setTimeout(() => {
    changeLightToYellow(1);
  }, (lightTime[1].red + lightTime[1].green) * 1000);

  timer7 = setTimeout(() => {
    cycle(id);
  }, (lightTime[0].yellow + lightTime[0].green + lightTime[0].red) * 1000);
};

// id = 0 -> đường Lý Thường Kiệt, id = 1 -> đường 3 tháng 2
let changeLightToRed = (id) => {
  if (!AIMode) return;
  let message = {
    id: "6",
    name: "TRAFFIC",
    data: "10",
    unit: "",
  };
  if (id === 0) client.publish(topic1[0], JSON.stringify(message));
  else client3.publish(topic3[3], JSON.stringify(message));
  //console.log(id, "RED");
};
let changeLightToGreen = (id) => {
  if (!AIMode) return;
  let message = {
    id: "6",
    name: "TRAFFIC",
    data: "01",
    unit: "",
  };
  if (id === 0) client.publish(topic1[0], JSON.stringify(message));
  else client3.publish(topic3[3], JSON.stringify(message));
  //console.log(id, "GREEN");
};
let changeLightToYellow = (id) => {
  if (!AIMode) return;
  let message = {
    id: "6",
    name: "TRAFFIC",
    data: "11",
    unit: "",
  };
  if (id === 0) client.publish(topic1[0], JSON.stringify(message));
  else client3.publish(topic3[3], JSON.stringify(message));
  //console.log(id, "YELLOW");
};

client.subscribe(topic1);
client2.subscribe(topic2);
client3.subscribe(topic3);
client.on("message", function (topic, message) {
  let { name, data, unit } = JSON.parse(message);
  const id = 1;
  switch (name) {
    case "TEMP-HUMID": {
      data = data.slice(0, 2);
      sensorData[0] = data;
      query("call addTemperatureData(?, ?, TIMESTAMP(?))", [
        id,
        data,
        getNowDateTime(),
      ]);
      if (data >= 50 || data <= 20) {
        query(queryLocation("TemperatureSensor"), [id]).then((loc) => {
          loc[0].road = "Lý Thường Kiệt";
          notification.pushOver(loc[0], "nhiệt độ", data);
        });
        return;
      }
      if (sensorData.slice(0, 3).every((x) => x > -1)) {
        axios
          .post(
            "localhost/predict/anomaly_detection",
            {
              data: [
                {
                  temperature: sensorData[0],
                  noise: sensorData[1],
                  gas: sensorData[2],
                },
              ],
            }
          )
          .then((res2) => {
            if (res2.data.response[0] == 1) {
              query(queryLocation("TemperatureSensor"), [id]).then((loc) => {
                loc[0].road = "Lý Thường Kiệt";
                notification.push(loc[0]);
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      break;
    }
    case "TRAFFIC":
      console.log(
        "Đèn đường Lý Thường Kiệt:",
        data === "01" ? "Xanh" : data === "11" ? "Vàng" : "Đỏ"
      );
      query("call addTrafficSignalData(?, ?, TIMESTAMP(?))", [
        id,
        data,
        getNowDateTime(),
      ]);
      break;
  }
});

client2.on("message", function (topic, message) {
  let { name, data, unit } = JSON.parse(message);
  const id = 1;
  switch (name) {
    case "SOUND": {
      sensorData[1] = data;
      query("call addSoundData(?, ?, TIMESTAMP(?))", [
        id,
        data,
        getNowDateTime(),
      ]);
      if (data >= 800 || data <= 100) {
        query(queryLocation("SoundSensor"), [id]).then((loc) => {
          loc[0].road = "Lý Thường Kiệt";
          notification.pushOver(loc[0], "tiếng ồn", data);
        });
        return;
      }
      if (sensorData.slice(0, 3).every((x) => x > -1)) {
        axios
          .post(
            "localhost/predict/anomaly_detection",
            {
              data: [
                {
                  temperature: sensorData[0],
                  noise: sensorData[1],
                  gas: sensorData[2],
                },
              ],
            }
          )
          .then((res2) => {
            if (res2.data.response[0] == 1) {
              query(queryLocation("SoundSensor"), [id]).then((loc) => {
                loc[0].road = "Lý Thường Kiệt";
                notification.push(loc[0]);
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      break;
    }
    case "GAS": {
      sensorData[2] = data;
      query("call addGasData(?, ?, TIMESTAMP(?))", [
        id,
        data,
        getNowDateTime(),
      ]);
      if (data > 1 || data < 0) {
        query(queryLocation("GasSensor"), [id]).then((loc) => {
          loc[0].road = "Lý Thường Kiệt";
          notification.pushOver(loc[0], "khí gas", data);
        });
        return;
      }
      if (sensorData.slice(0, 3).every((x) => x > -1)) {
        axios
          .post(
            "localhost/predict/anomaly_detection",
            {
              data: [
                {
                  temperature: sensorData[0],
                  noise: sensorData[1],
                  gas: sensorData[2],
                },
              ],
            }
          )
          .then((res2) => {
            if (res2.data.response[0] == 1) {
              query(queryLocation("GasSensor"), [id]).then((loc) => {
                loc[0].road = "Lý Thường Kiệt";
                notification.push(loc[0]);
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      break;
    }
  }
});

client3.on("message", async function (topic, message) {
  let { name, data, unit } = JSON.parse(message);
  const id = 2;
  switch (name) {
    case "TEMP-HUMID": {
      data = data.slice(0, 2);
      sensorData[3] = data;
      query("call addTemperatureData(?, ?, TIMESTAMP(?))", [
        id,
        data,
        getNowDateTime(),
      ]);
      if (data >= 50 || data <= 20) {
        query(queryLocation("TemperatureSensor"), [id]).then((loc) => {
          loc[0].road = "3 tháng 2";
          notification.pushOver(loc[0], "nhiệt độ", data);
        });
        return;
      }
      if (sensorData.slice(3).every((x) => x > -1)) {
        axios
          .post(
            "localhost/predict/anomaly_detection",
            {
              data: [
                {
                  temperature: sensorData[3],
                  noise: sensorData[4],
                  gas: sensorData[5],
                },
              ],
            }
          )
          .then((res2) => {
            if (res2.data.response[0] == 1) {
              query(queryLocation("TemperatureSensor"), [id]).then((loc) => {
                loc[0].road = "3 tháng 2";
                notification.push(loc[0]);
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      break;
    }
    case "SOUND": {
      sensorData[4] = data;
      query("call addSoundData(?, ?, TIMESTAMP(?))", [
        id,
        data,
        getNowDateTime(),
      ]);
      if (data >= 800 || data <= 200) {
        query(queryLocation("SoundSensor"), [id]).then((loc) => {
          loc[0].road = "3 tháng 2";
          notification.pushOver(loc[0], "tiếng ồn", data);
        });
        return;
      }
      if (sensorData.slice(3).every((x) => x > -1)) {
        axios
          .post(
            "localhost/predict/anomaly_detection",
            {
              data: [
                {
                  temperature: sensorData[3],
                  noise: sensorData[4],
                  gas: sensorData[5],
                },
              ],
            }
          )
          .then((res2) => {
            if (res2.data.response[0] == 1) {
              query(queryLocation("SoundSensor"), [id]).then((loc) => {
                loc[0].road = "3 tháng 2";
                notification.push(loc[0]);
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      break;
    }
    case "GAS": {
      sensorData[5] = data;
      query("call addGasData(?, ?, TIMESTAMP(?))", [
        id,
        data,
        getNowDateTime(),
      ]);
      if (data > 1 || data < 0) {
        query(queryLocation("GasSensor"), [id]).then((loc) => {
          loc[0].road = "3 tháng 2";
          notification.pushOver(loc[0], "khí gas", data);
        });
        return;
      }
      if (sensorData.slice(3).every((x) => x > -1)) {
        axios
          .post(
            "localhost/predict/anomaly_detection",
            {
              data: [
                {
                  temperature: sensorData[3],
                  noise: sensorData[4],
                  gas: sensorData[5],
                },
              ],
            }
          )
          .then((res2) => {
            if (res2.data.response[0] == 1) {
              query(queryLocation("GasSensor"), [id]).then((loc) => {
                loc[0].road = "3 tháng 2";
                notification.push(loc[0]);
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      break;
    }
    case "TRAFFIC":
      console.log(
        "Đèn đường 3 tháng 2:",
        data === "01" ? "Xanh" : data === "11" ? "Vàng" : "Đỏ"
      );
      query("call addTrafficSignalData(?, ?, TIMESTAMP(?))", [
        id,
        data,
        getNowDateTime(),
      ]);
      break;
  }
});

module.exports = { client, changeAIMode, getCycleTime, getAIMode };
