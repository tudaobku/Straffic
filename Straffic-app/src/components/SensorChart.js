import React from 'react';
import {View, Text, StyleSheet, Dimensions, processColor} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';
const COLOR_PURPLE = processColor('#697dfb');

const SensorChart = ({data1, data2, legend1, legend2}) => {
  const start = data1[0]?.x;
  data1 = data1.map(point => {
    return {
      x: point.x - start,
      y: point.y,
      marker: new Date(point.x * 1000).toString(),
    };
  });
  data2 = data2.map(point => {
    return {
      x: point.x - start,
      y: point.y,
      marker: new Date(point.x * 1000).toString(),
    };
  });

  return (
    <LineChart
      style={styles.chart}
      drawGridBackground={true}
      borderColor={processColor('teal')}
      borderWidth={1}
      drawBorders={true}
      xAxis={{enabled: false, position: 'BOTTOM', valueFormatter: '#,##0.0'}}
      chartDescription={{text: ''}}
      marker={{
        enabled: true,
        markerColor: processColor('#a9a9a9'),
        textColor: processColor('white'),
        markerFontSize: 14,
      }}
      data={{
        dataSets: [
          {
            label: legend1,
            values: data1,
            config: {
              circleColor: processColor('red'),
              color: processColor('red'),
            },
          },
          {
            label: legend2,
            values: data2,
            config: {
              circleColor: processColor('blue'),
              color: processColor('blue'),
            },
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  chart: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F5FCFF',
  },
});

export default SensorChart;
