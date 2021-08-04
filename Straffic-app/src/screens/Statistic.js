import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseURL } from '../utils/env';
import { AuthContext } from '../contexts/Auth';
import { CrossRoadContext } from '../contexts/CrossRoad';
import TimePicker from '../components/TimePicker';
import PagerView from 'react-native-pager-view';
import SensorChart from '../components/SensorChart';
const Statistic = () => {
  const { logout } = useContext(AuthContext);
  const { crossRoad } = useContext(CrossRoadContext);
  const [roadData1, setRoadData1] = useState({ TEMPERATURE_SENSOR: [], SOUND_SENSOR: [], GAS_SENSOR: [] });
  const [roadData2, setRoadData2] = useState({ TEMPERATURE_SENSOR: [], SOUND_SENSOR: [], GAS_SENSOR: [] });
  const [isLoading, setIsLoading] = useState(false);
  let startTime = new Date();
  let endTime = new Date();
  const getData = async (road) => {
    try {
      const response = await axios.post(
        baseURL + 'sensor/all',
        {
          roadCrossRoadId: road,
          startTime,
          endTime,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + (await AsyncStorage.getItem('userToken')),
          },
        },
      );
      return response.data;

    } catch (err) {
      logout();
    }
  };

  const getSensorDatas = async (fromTime, toTime) => {
    startTime = fromTime;
    endTime = toTime;
    setIsLoading(true);
    setRoadData1(await getData(crossRoad.roadCrossRoadId1));
    setRoadData2(await getData(crossRoad.roadCrossRoadId2));
    setIsLoading(false);
  };

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <TimePicker style={{ flex: 3 }} onTimeChange={getSensorDatas} />
      <View style={{ flex: 4, justifyContent: 'center' }}>
        {isLoading ?
          <ActivityIndicator size="large" color="#0000ff" />
          :
          <PagerView style={{ flex: 1 }} initialPage={0} orientation='vertical'>
            <View key="1">
              <Text style={[styles.text, { color: 'rgba(230, 126, 34,1.0)' }]}>
                Dữ liệu nhiệt độ
              </Text>
              <SensorChart data1={roadData1.TEMPERATURE_SENSOR} data2={roadData2.TEMPERATURE_SENSOR} legend1={crossRoad.roadName1} legend2 = {crossRoad.roadName2}/>
            </View>
            <View key="2">
              <Text style={[styles.text, { color: 'rgba(142, 68, 173,1.0)' }]}>
                Dữ liệu tiếng ồn
              </Text>
              <SensorChart data1={roadData1.SOUND_SENSOR} data2={roadData2.SOUND_SENSOR} legend1={crossRoad.roadName1} legend2 = {crossRoad.roadName2}/>

            </View>
            <View key="3">
              <Text style={[styles.text, { color: 'rgba(41, 128, 185,1.0)' }]}>
                Dữ liệu khí gas
              </Text>
              <SensorChart data1={roadData1.GAS_SENSOR} data2={roadData2.GAS_SENSOR} legend1={crossRoad.roadName1} legend2 = {crossRoad.roadName2}/>
            </View>
          </PagerView>
        }
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
export default Statistic;
