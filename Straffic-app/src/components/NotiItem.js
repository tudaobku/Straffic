import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const NotiItem = ({title, content, position, time, type}) => {
  var style = type == 'warning' ? styles : styles2;
  return (
    <View style={style.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name={type == 'warning' ? 'warning' : 'nuclear'} size={20}></Icon>
        <Text style={style.title}> {title}</Text>
      </View>
      <Text style={{margin: 10}}>{content}</Text>
      <View style={style.time}>
        <Icon name="time-outline" style={{color: 'gray'}}></Icon>
        <Text style={{color: 'gray'}}> {time}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgba(243, 156, 18,0.4)',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  position: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
const styles2 = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgba(192, 57, 43,0.4)',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  position: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default NotiItem;
