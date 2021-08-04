import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Switch,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import TrafficLight from '../components/TrafficLight';
import {connectServer, disconnectServer, controlLight, subscribeTopics, unsubscribeTopics} from '../services/MQTT';
import AICoundDown from '../components/AICountDown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CrossRoadContext} from '../contexts/CrossRoad';
import CrossRoadPicker from '../components/CrossRoadPicker';
import axios from 'axios';
const ControlLed = ({navigation}) => {
  const {crossRoad} = useContext(CrossRoadContext);
  const [temp1, setTemp1] = useState('0');
  const [sound1, setSound1] = useState('0');
  const [gas1, setGas1] = useState('0');
  const [density1, setDensity1] = useState();
  const [temp2, setTemp2] = useState('0');
  const [sound2, setSound2] = useState('0');
  const [gas2, setGas2] = useState('0');
  const [density2, setDensity2] = useState();
  const [light1, setLight1] = useState('01');
  const [light2, setLight2] = useState('10');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isCounting, setIsCounting] = useState({one: false, two: false});
  const [timeData, setTimeData] = useState([
    {
      green: 0,
      yellow: 0,
      red: 0,
    },
    {
      red: 0,
      green: 0,
      yellow: 0,
    },
  ]);
  const END_POINT = 'localhost';
  useEffect(() => {
    connectServer(
      {
        id: crossRoad.roadCrossRoadId1,
        setTemp: setTemp1,
        setGas: setGas1,
        setSound: setSound1,
        setLight: setLight1,
        updateDensity: updateDensity,
      },
      {
        id: crossRoad.roadCrossRoadId2,
        setTemp: setTemp2,
        setGas: setGas2,
        setSound: setSound2,
        setLight: setLight2,
        updateDensity: updateDensity,
      },
    );
    return disconnectServer;
  }, []);
  useEffect(() =>{
    subscribeTopics();
    return unsubscribeTopics;
  },[crossRoad])

  useEffect(() => {
    if (!isEnabled) {
      if (light1 == '01') setLight2('10');
      controlLight(crossRoad.roadCrossRoadId1, light1);
    }
  }, [light1]);
  useEffect(() => {
    if (!isEnabled) {
      if (light2 == '01') setLight1('10');
      controlLight(crossRoad.roadCrossRoadId2, light2);
    }
  }, [light2]);

  const getTimeCountDown = async () => {
    try {
      const data = await axios.post(END_POINT + '/ai/time', '', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('userToken')),
        },
      });
      var green1 = Math.floor((data.data[0]['green'] - Date.now()) / 1000);
      var yellow1 =
        green1 > 0
          ? Math.floor((data.data[0]['yellow'] - data.data[0]['green']) / 1000)
          : Math.floor((data.data[0]['yellow'] - Date.now()) / 1000);
      var red1 =
        yellow1 > 0
          ? Math.floor((data.data[0]['red'] - data.data[0]['yellow']) / 1000)
          : Math.floor((data.data[0]['red'] - Date.now()) / 1000);

      var red2 = Math.floor((data.data[1]['red'] - Date.now()) / 1000);
      var green2 =
        red2 > 0
          ? Math.floor((data.data[1]['green'] - data.data[1]['red']) / 1000)
          : Math.floor((data.data[1]['green'] - Date.now()) / 1000);
      var yellow2 =
        green2 > 0
          ? Math.floor((data.data[1]['yellow'] - data.data[1]['green']) / 1000)
          : Math.floor((data.data[1]['yellow'] - Date.now()) / 1000);
      var realData = [
        {
          green: green1,
          yellow: yellow1,
          red: red1,
        },
        {
          red: red2,
          green: green2,
          yellow: yellow2,
        },
      ];
      var test = [
        {
          green: 2,
          yellow: 1,
          red: 3,
        },
        {
          red: 2,
          green: 3,
          yellow: 1,
        },
      ];
      console.log(realData);
      return realData;
    } catch (err) {
      alert(err);
    }
  };

  const turnOffAiMode = async () => {
    console.log('turn off');
    var data = {
      type: 0,
    };
    try {
      const predictDensity = await axios.post(
        END_POINT + '/ai/mode',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + (await AsyncStorage.getItem('userToken')),
          },
        },
      );
    } catch (err) {
      setIsEnabled(pre => !pre);
      setIsCounting({one: false, two: false});
      alert(err);
    }
  };

  const turnOnAiMode = async () => {
    console.log('turn on');
    var data = {
      type: 1,
    };
    try {
      const predictDensity = await axios.post(
        END_POINT + '/ai/mode',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + (await AsyncStorage.getItem('userToken')),
          },
        },
      );
    } catch (err) {
      alert(err);
    }
  };
  const onAiButtonClick = async e => {
    setIsEnabled(pre => !pre);
    if (e) {
      await turnOnAiMode();
      let data = await getTimeCountDown();
      if (data) {
        setTimeData(data);
      }
    } else {
      await turnOffAiMode();
    }
  };
  const getDensity = async () => {
    try {
      var data1 = {
        data: [
          {
            temperature: parseInt(temp1),
            noise: parseInt(sound1),
            gas: parseInt(gas1),
          },
          {
            temperature: parseInt(temp2),
            noise: parseInt(sound2),
            gas: parseInt(gas2),
          },
        ],
      };
      const predictDensity = await axios.post(
        'localhost/predict' + '/traffic_density',
        JSON.stringify(data1),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // alert(typeof predictDensity.data['response']);
      return predictDensity.data['response'];
    } catch (err) {
      console.log(err);
    }
  };
  const getIndex = data => {
    for (let i = 0; i < 3; i++) {
      if (data[Object.keys(data)[i]] > 0) return i;
    }
    return 3;
  };
  const updateDensity = async () => {
    console.log('Update Density');
    const density = await getDensity();
    setDensity1(Math.floor(density[0]));
    setDensity2(Math.floor(density[1]));
  };
  useEffect(async () => {
    await updateDensity(), [temp1, temp2, sound1, sound2, gas1, gas2];
  });
  useEffect(async () => {
    if (isEnabled && !isCounting.one && !isCounting.two) {
      let data = await getTimeCountDown();
      if (data) setTimeData(data);
    }
  }, [isCounting]);
  useEffect(async () => {
    try {
      const data = await axios.get(END_POINT + '/ai/mode', {
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('userToken')),
        },
      });
      var mode = data.data['response'];
      if (mode) {
        await turnOnAiMode();
        let data = await getTimeCountDown();
        if (data) {
          setTimeData(data);
          setIsEnabled(mode);
        }
        let index = getIndex(data[0]);
        switch (index) {
          case 0:
            setLight1('01');
            break;
          case 1:
            setLight1('11');
            break;
          case 2:
            setLight1('10');
            break;
        }
        let index2 = getIndex(data[1]);
        switch (index2) {
          case 0:
            setLight2('10');
            break;
          case 1:
            setLight2('01');
            break;
          case 2:
            setLight2('11');
            break;
        }
      } else {
        turnOffAiMode();
      }
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    setIsCounting({one: true, two: true});
  }, timeData);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.label}>Chọn ngã tư: </Text>
        <Switch
          trackColor={{false: 'black', true: 'lime'}}
          thumbColor="white"
          onValueChange={onAiButtonClick}
          value={isEnabled}
        />
      </View>
      {isEnabled && isCounting.one && (
        <View
          style={{
            position: 'absolute',
            top: '20%',
            left: '70%',
          }}>
          <AICoundDown
            a={1}
            setIsCounting={setIsCounting}
            index={getIndex(timeData[0])}
            data={timeData[0]}></AICoundDown>
        </View>
      )}

      {isEnabled && isCounting.two && (
        <View
          style={{
            position: 'absolute',
            top: '85%',
            left: '70%',
          }}>
          <AICoundDown
            a={2}
            setIsCounting={setIsCounting}
            index={getIndex(timeData[1])}
            data={timeData[1]}></AICoundDown>
        </View>
      )}

      <CrossRoadPicker
        onMapPress={() => {
          navigation.navigate('Map');
        }}
      />

      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 2}} />
        <ImageBackground
          resizeMode="stretch"
          source={require('../assets/road1.png')}
          style={styles.verticalRoad}>
          <View style={{flexWrap: 'wrap', transform: [{rotate: '90deg'}]}}>
            <Text>{crossRoad.roadName1}</Text>
          </View>
        </ImageBackground>

        <View
          style={{
            flex: 5,
            alignItems: 'flex-end',
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          <TrafficLight
            isVertical={true}
            selectedLight={light1}
            setSelectedLight={setLight1}
            isEnabled={isEnabled}
          />
          <View>
            <Text style={styles.text}>Temperature: {temp1}</Text>
            <Text style={styles.text}>Noise: {sound1}</Text>
            <Text style={styles.text}>Gas: {gas1}</Text>
            <Text style={styles.text}>Mật độ xe: {density1}</Text>
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'row', height: 80}}>
        <Image
          source={require('../assets/road2-1.png')}
          style={styles.horizontalRoad1}
        />
        <Image
          source={require('../assets/road2-2.png')}
          style={styles.verticalRoad}
        />
        <ImageBackground
          resizeMode="stretch"
          source={require('../assets/road2-3.png')}
          style={styles.horizontalRoad2}>
          <Text>{crossRoad.roadName2}</Text>
        </ImageBackground>
      </View>

      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 2}} />
        <Image
          source={require('../assets/road3.png')}
          style={styles.verticalRoad}
        />
        <View style={{marginLeft: 10, flex: 5}}>
          <TrafficLight
            isVertical={false}
            selectedLight={light2}
            setSelectedLight={setLight2}
            isEnabled={isEnabled}
          />
          <View>
            <Text style={styles.text}>Temperature: {temp2}</Text>
            <Text style={styles.text}>Noise: {sound2}</Text>
            <Text style={styles.text}>Gas: {gas2}</Text>
            <Text style={styles.text}>Mật độ xe: {density2}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  horizontalRoad1: {
    flex: 2,
    height: 'auto',
    resizeMode: 'stretch',
  },
  horizontalRoad2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 5,
  },
  verticalRoad: {
    resizeMode: 'stretch',
    justifyContent: 'center',
    height: 'auto',
    width: 80,
  },
  text: {
    fontSize: 14,
  },
  label: {
    marginTop: 10,
    marginLeft: 10,
    color: 'darkgrey',
  },

  countdown: {
    position: 'absolute',
    left: 10,
    top: 20,
    backgroundColor: 'red',
  },
});

export default ControlLed;
