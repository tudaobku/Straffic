import CountDown from 'react-native-countdown-component';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import React, {useEffect, useState} from 'react';
const END_POINT = 'localhost/predict';
import {View, Text, Animated} from 'react-native';
import axios from 'axios';
const AICoundDown = props => {
  const {data, setIsCounting, index, a} = props;
  console.log('>>><<>?', data, index);
  const [start, setStart] = useState(false);
  const [value, setValue] = useState({
    timeCount: data[Object.keys(data)[index]],
    index: index,
    status: Object.keys(data)[index],
  });

  useEffect(() => {
    console.log('Value:', value);
    setStart(true);
  }, [value]);
  return (
    <View>
      {start ? (
        <CountdownCircleTimer
          isPlaying
          strokeWidth={5}
          duration={value.timeCount || 0}
          size={80}
          onComplete={() => {
            setStart(false);
            if (value.index >= 2) {
              console.log('object');
              a == 1
                ? setIsCounting(pre => {
                    return {...pre, one: false};
                  })
                : setIsCounting(pre => {
                    return {...pre, two: false};
                  });
            } else {
              setValue(pre => {
                return {
                  index: pre.index + 1,
                  timeCount: data[Object.keys(data)[pre.index + 1]],
                  status: Object.keys(data)[pre.index + 1],
                };
              });
            }
          }}
          colors={
            value.status == 'red'
              ? '#c23616'
              : value.status == 'yellow'
              ? '#fbc531'
              : '#4cd137'
          }>
          {({remainingTime, animatedColor}) => (
            <Animated.Text
              style={{color: animatedColor, fontSize: 20, fontWeight: 'bold'}}>
              {remainingTime}
            </Animated.Text>
          )}
        </CountdownCircleTimer>
      ) : null}
    </View>
  );
};

export default AICoundDown;
