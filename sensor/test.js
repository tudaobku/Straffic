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
    data: "60-52",
    unit: "*C-%",
  };
  client.publish("tudaobku/feeds/temp2", JSON.stringify(tempMsg));
});
