var mqtt = require("mqtt");
var client = mqtt.connect({
  host: "io.adafruit.com",
  port: 1883,
  username: "tudaobku",
  password: "aio_QtyB12DSO4bTAiiamVr14bTSiiWJ",
});

client.on("connect", function () {
  client.subscribe("tudaobku/feeds/trafficlight1")
  client.subscribe("tudaobku/feeds/trafficlight2")
  setInterval(function () {
    var i;
    for (i = 2; i < 3; i++) {
      const tempMsg = {
        id: "7",
        name: "TEMP-HUMID",
        data: Math.floor(Math.random() * 30) + 20 + "-55",
        unit: "*C-%",
      };
      const soundMsg = {
        id: "12",
        name: "SOUND",
        data: (Math.floor(Math.random() * 600) + 200).toString(),
        unit: "",
      };
      const gasMsg = {
        id: "23",
        name: "GAS",
        data: Math.random() < 0.1 ? "1" : "0",
        unit: "",
      };
      client.publish("tudaobku/feeds/temp" + i, JSON.stringify(tempMsg));
      client.publish("tudaobku/feeds/sound" + i, JSON.stringify(soundMsg));
      client.publish("tudaobku/feeds/gas" + i, JSON.stringify(gasMsg));
    }
  }, 20000);
});
const getLight = (data) => {
  switch(data){
    case '01': return 'Green';
    case '11': return 'Yellow';
    case '10': return 'Red';
  }
  
}
client.on('message', function (topic, message) {
  console.log(topic, getLight(JSON.parse(message).data));
});