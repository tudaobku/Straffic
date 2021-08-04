var mqtt = require("mqtt");
var client = mqtt.connect({
  host: "io.adafruit.com",
  port: 1883,
  username: "tudaobku",
  password: "aio_QtyB12DSO4bTAiiamVr14bTSiiWJ",
});

client.on("connect", function () {
  var i;
  const tempMsg = {
    id: "7",
    name: "TEMP-HUMID",
    data: "30",
    unit: "*C-%",
  };
  const soundMsg = {
    id: "12",
    name: "SOUND",
    data: "512",
    unit: "",
  };
  const gasMsg = {
    id: "23",
    name: "GAS",
    data: Math.random() < 0.1 ? "1" : "0",
    unit: "",
  };
  client.publish("tudaobku/feeds/temp2", JSON.stringify(tempMsg));
  client.publish("tudaobku/feeds/sound2", JSON.stringify(soundMsg));
  client.publish("tudaobku/feeds/gas2", JSON.stringify(gasMsg));
});
