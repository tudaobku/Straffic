import {StyleSheet} from 'react-native';
import React, {useEffect, useContext} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {CrossRoadContext} from '../contexts/CrossRoad';
MapboxGL.setAccessToken(
  '',
);
MapboxGL.setConnected(true);

const CrossRoadMap = ({navigation}) => {
  const {crossRoadList, setCrossRoad} = useContext(CrossRoadContext);
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);
  return (
    <MapboxGL.MapView style={styles.map}>
      <MapboxGL.Camera zoomLevel={12} centerCoordinate={[crossRoadList[0].long, crossRoadList[0].lat]} />
      {crossRoadList.map((crossRoad) => (
        <MapboxGL.PointAnnotation
          key={crossRoad.value}
          id={crossRoad.value.toString()}
          coordinate={[crossRoad.long,crossRoad.lat]}
          onSelected={() => {
            setCrossRoad(crossRoad);
            navigation.pop();
          }
          }
        />
      ))}
    </MapboxGL.MapView>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
export default CrossRoadMap;
