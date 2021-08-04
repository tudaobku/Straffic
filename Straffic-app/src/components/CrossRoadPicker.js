import RNPickerSelect from 'react-native-picker-select';
import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {CrossRoadContext} from '../contexts/CrossRoad';
import{ Icon} from 'react-native-elements';
const CrossRoadPicker = ({onMapPress}) => {
  const {crossRoad, crossRoadList, setCrossRoad} = useContext(CrossRoadContext);
  return (
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <View style={[styles.container]}>
        <RNPickerSelect
          placeholder={{}}
          onValueChange={(value, index) =>
            setCrossRoad({...crossRoadList[index]})
          }
          value={crossRoad.value}
          items={crossRoadList}
        />
      </View>

      <Icon name='map-search' type='material-community' reverse onPress={onMapPress}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    marginBottom: 10,
    marginTop: 5,
    flex: 1
  },
});
export default CrossRoadPicker;
