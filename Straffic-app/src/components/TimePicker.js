import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePicker = ({onTimeChange, style}) => {
  const [fromTime, setFromTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [toTime, setToTime] = useState(new Date());
  const [isFrom, setIsFrom] = useState(true);

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  useEffect(() => {
    onTimeChange(fromTime, toTime);
  }, [fromTime, toTime]);
  const formatDate = time => {
    const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    const month =
      time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    return date + '/' + month + '/' + time.getFullYear();
  };
  const formatTime = time => {
    const hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    const minute =
      time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    return hour + ':' + minute;
  };
  const onChange = (event, selectedTime) => {
    setShow(false);
    if (isFrom) {
      const currentTime = selectedTime || fromTime;
      setFromTime(currentTime);
    } else {
      const currentTime = selectedTime || toTime;
      setToTime(currentTime);
    }
  };
  return (
    <View style={style}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={{fontSize: 16, width: 50}}>TỪ</Text>
          <TouchableOpacity
            onPress={() => {
              setIsFrom(true);
              showMode('time');
            }}
            style={styles.button}>
            <Icon iconStyle={{marginRight: 5}} name="timer" />
            <Text style={styles.text}>{formatTime(fromTime)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsFrom(true);
              showMode('date');
            }}
            style={styles.button}>
            <Icon iconStyle={{marginRight: 5}} name="calendar-today" />
            <Text style={styles.text}>{formatDate(fromTime)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <Text style={{fontSize: 16, width: 50}}>ĐẾN</Text>
          <TouchableOpacity
            onPress={() => {
              setIsFrom(false);
              showMode('time');
            }}
            style={styles.button}>
            <Icon iconStyle={{marginRight: 5}} name="timer" />
            <Text style={styles.text}>{formatTime(toTime)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsFrom(false);
              showMode('date');
            }}
            style={styles.button}>
            <Icon iconStyle={{marginRight: 5}} name="calendar-today" />
            <Text style={styles.text}>{formatDate(toTime)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={isFrom ? fromTime : toTime}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(39, 174, 96,0.1)',
    flex: 1,
    justifyContent: 'space-around',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(39, 174, 96,0.5)',
    borderRadius: 10,
    padding: 7,
  },
});
export default TimePicker;
