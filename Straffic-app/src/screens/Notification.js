import {Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import NotiItem from '../components/NotiItem';
import Filter from '../components/Filter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const END_POINT = 'localhost/notification/history';

const Notification = () => {
  const [data, setData] = useState([]);
  return (
    <View style={{padding: 20, height: '100%'}}>
      <Text style={{fontSize: 35, fontWeight: 'bold'}}>Notification</Text>
      <Filter setData={setData}></Filter>
      <ScrollView>
        {data.reverse().map((ele, index) => {
          return (
            <NotiItem
              key={index}
              title={ele.Name}
              content={ele.Content}
              type="warning"
              time={ele.Time}></NotiItem>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default Notification;
