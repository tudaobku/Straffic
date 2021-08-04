import { NativeModules, NativeEventEmitter } from 'react-native';
const { MQTTModule } = NativeModules;
let eventListener;
const topicList = ['CSE_BBC/feeds/bk-iot-traffic', 'CSE_BBC/feeds/bk-iot-temp-humid'];
const topicList1 = ['CSE_BBC1/feeds/bk-iot-sound', 'CSE_BBC1/feeds/bk-iot-gas'];
const topicList2 =
  [
    'tudaobku/feeds/temp1',
    'tudaobku/feeds/gas1',
    'tudaobku/feeds/sound1',
    'tudaobku/feeds/trafficlight1',
    'tudaobku/feeds/temp2',
    'tudaobku/feeds/gas2',
    'tudaobku/feeds/sound2',
    'tudaobku/feeds/trafficlight2',
  ];
const connectServer = (dev1, dev2) => {
  MQTTModule.connectServer(topicList, topicList1, topicList2);
  const eventEmitter = new NativeEventEmitter(MQTTModule);
  eventListener = eventEmitter.addListener('messageArrived', params => {
    const topic = params.topic;
    const msg = JSON.parse(params.message);
    switch (topic) {
      case 'tudaobku/feeds/temp1':
      case 'CSE_BBC/feeds/bk-iot-temp-humid':
        dev1.setTemp(msg.data.substr(0, 2));
        break;
      case 'tudaobku/feeds/gas1':
      case 'CSE_BBC1/feeds/bk-iot-gas':
        dev1.setGas(msg.data);
        break;
      case 'tudaobku/feeds/sound1':
      case 'CSE_BBC1/feeds/bk-iot-sound':
        dev1.setSound(msg.data);
        break;
      case 'tudaobku/feeds/trafficlight1':
      case 'CSE_BBC/feeds/bk-iot-traffic':
        dev1.setLight(msg.data);
        break;
      case 'tudaobku/feeds/temp2':
        dev2.setTemp(msg.data.substr(0, 2));
        break;
      case 'tudaobku/feeds/gas2':
        dev2.setGas(msg.data);
        break;
      case 'tudaobku/feeds/sound2':
        dev2.setSound(msg.data);
        break;
      case 'tudaobku/feeds/trafficlight2':
        // console.log('>> change led 2');
        dev2.setLight(msg.data);
        break;
      default:
    }
  });
};
const subscribeTopics = () => {
  MQTTModule.subscribeTopics(topicList, topicList1, topicList2);
}
const unsubscribeTopics = () => {
  MQTTModule.unsubscribeAllTopic();
}
const controlLight = (id, color) => {
  const msg = { id: '6', name: 'TRAFFIC', data: color, unit: '' };
  if (id == 1) {
    MQTTModule.sendData('tudaobku/feeds/trafficlight1', JSON.stringify(msg), 2);
    MQTTModule.sendData('CSE_BBC/feeds/bk-iot-traffic', JSON.stringify(msg), 0);
  } else {
    MQTTModule.sendData('tudaobku/feeds/trafficlight2', JSON.stringify(msg), 2);
  }
};
const disconnectServer = () => {
  eventListener.remove();
  MQTTModule.disconnectServer();
};
export { connectServer, controlLight, disconnectServer, unsubscribeTopics, subscribeTopics };
