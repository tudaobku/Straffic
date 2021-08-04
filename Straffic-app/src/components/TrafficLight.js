import React from 'react';
import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';

const TrafficLight = ({
  isVertical,
  selectedLight,
  setSelectedLight,
  isEnabled,
}) => {
  const createAlert = value => {
    const color = value == '10' ? 'đỏ' : value == '11' ? 'vàng' : 'xanh';
    Alert.alert(
      'Xác nhận thay đổi đèn',
      'Thay đổi tín hiệu đèn thành màu ' + color ,
      [{text: 'Cancel'}, {text: 'OK', onPress: () => setSelectedLight(value)}],
    );
  };
  const container = isVertical
    ? styles.verticalContainer
    : styles.horizontalContainer;

  return (
    <View style={container}>
      <TouchableOpacity
        style={[
          styles.light,
          {backgroundColor: '#ff000025'},
          selectedLight == '10' && {backgroundColor: '#ff0000'},
        ]}
        onPress={() => {
          if (!isEnabled) createAlert('10');
        }}
      />
      <TouchableOpacity
        style={[
          styles.light,
          {backgroundColor: '#ffff0025'},
          selectedLight == '11' && {backgroundColor: '#ffff00'},
        ]}
        onPress={() => {
          if (!isEnabled) createAlert('11');
        }}
      />
      <TouchableOpacity
        style={[
          styles.light,
          {backgroundColor: '#7cfc0025'},
          selectedLight == '01' && {backgroundColor: '#7cfc00'},
        ]}
        onPress={() => {
          if (!isEnabled) createAlert('01');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  light: {
    borderWidth: 2,
    borderColor: 'black',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'black',
  },
  verticalContainer: {
    padding: 5,
    backgroundColor: 'gainsboro',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    height: 120,
    flexDirection: 'column-reverse',
    marginLeft: 5,
    marginRight: 5,
  },
  horizontalContainer: {
    padding: 5,
    backgroundColor: 'gainsboro',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    width: 120,
    height: 40,
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
});
export default TrafficLight;
