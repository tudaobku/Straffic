import React, {useState, useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import {Button, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const END_POINT = 'localhost/notification/history';
const Filter = props => {
  const {setData} = props;
  const crossRoadList = [
    {value: '1', label: 'Lý Thường Kiệt - 3 tháng 2'},
    {value: '2', label: 'Ngã Tư Thủ Đức'},
  ];
  const day = new Date();
  day.setDate(day.getDate() - 5);
  const [fromDate, setFromDate] = useState(day);
  const [toDate, setToDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isFrom, setIsFrom] = useState(false);
  const [crossRoad, setCrossRoad] = useState('1');

  useEffect(() => {
    getNotifications();
  }, [crossRoad, fromDate, toDate]);

  const getNotifications = async () => {
    try {
      try {
        var data = {
          pos: parseInt(crossRoad),
          from: fromDate.toISOString().slice(0, 19).replace('T', ' '),
          to: toDate.toISOString().slice(0, 19).replace('T', ' '),
        };
        const notiApi = await axios.post(END_POINT, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + (await AsyncStorage.getItem('userToken')),
          },
        });
        setData(notiApi.data);
      } catch (err) {
        alert(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (event, date) => {
    setShow(false);
    if (isFrom) {
      const curDate = date;
      setFromDate(curDate || fromDate);
    } else {
      const curDate = date;
      setToDate(curDate || toDate);
    }
  };
  const fromPressHandle = () => {
    setIsFrom(true);
    setShow(true);
  };
  const toPressHandle = () => {
    setIsFrom(false);
    setShow(true);
  };

  // useEffect(() => {}, []);
  return (
    <View>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(22, 160, 133,1.0)',
          backgroundColor: 'rgba(26, 188, 156,0.4)',
          borderRadius: 10,
        }}>
        <RNPickerSelect
          placeholder={{}}
          onValueChange={value => {
            setCrossRoad(value);
          }}
          value={crossRoad}
          items={crossRoadList}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{marginRight: 10}}>From</Text>
          <Button
            buttonStyle={{borderRadius: 10, borderWidth: 2}}
            type="outline"
            title={fromDate.toLocaleDateString() || 'default'}
            onPress={fromPressHandle}></Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{marginRight: 10}}>To</Text>
          <Button
            buttonStyle={{borderRadius: 10, borderWidth: 2}}
            type="outline"
            title={toDate.toLocaleDateString() || 'default'}
            onPress={toPressHandle}></Button>
        </View>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={fromDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
export default Filter;
