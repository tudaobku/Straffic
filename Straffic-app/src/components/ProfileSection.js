import React from 'react';
import * as Animatable from 'react-native-animatable';
import {Text, StyleSheet} from 'react-native';
const ProfileSection = props => {
  const {title, content} = props;

  return (
    <Animatable.View {...props} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>{content}</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(10, 100, 20,0.2)',
  },
  title: {
    fontWeight: 'bold',
  },
  content: {},
});
export default ProfileSection;
