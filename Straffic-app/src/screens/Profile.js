import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {AuthContext} from '../contexts/Auth';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ProfileSection from '../components/ProfileSection';
import ModalLogout from '../components/ModalLogout';
const END_POINT = 'localhost/user/profile';
const Profile = () => {
  const {logout} = useContext(AuthContext);
  const [username, setUsername] = useState();
  const [profile, setProfile] = useState(null);
  const getProfile = async () => {
    try {
      try {
        const profileApi = await axios.post(
          END_POINT,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer ' + (await AsyncStorage.getItem('userToken')),
            },
          },
        );
        await setProfile({
          Name: profileApi.data.Name,
          Sex: profileApi.data.Sex == 1 ? 'Male' : 'Fermale',
          DOF: new Date(profileApi.data.BirthDate).toDateString(),
          Rank: profileApi.data.Ranks,
          Workplace: profileApi.data.WorkPlace,
          Religion: profileApi.data.Religion,
        });
      } catch (err) {
        alert(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={{fontSize: 35, fontWeight: 'bold'}}>Profile</Text> */}
      <View
        style={{
          margin: 20,
          paddingBottom: 20,
          padding: 10,
        }}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
          }}
          style={{
            // flex: 0.5,
            marginBottom: 50,
            width: 100,
            height: 100,
            resizeMode: 'stretch',
            alignSelf: 'center',
          }}></Image>
        {profile &&
          Object.entries(profile).map((profile, index) => {
            return (
              <ProfileSection
                key={index}
                title={profile[0]}
                content={profile[1]}
                animation={
                  index % 2 == 0 ? 'fadeInLeft' : 'fadeInRight'
                }></ProfileSection>
            );
          })}
      </View>
      {profile && <ModalLogout></ModalLogout>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // marginTop: 100,
    paddingTop: 80,
    // padding: 20,
    flex: 1,
    backgroundColor: '#f1f2f6',
    // alignItems: 'center',
  },
  button: {
    backgroundColor: '#abcd',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
    height: 50,
    borderRadius: 15,
    marginTop: 40,
    position: 'absolute',
    bottom: 20,
  },
  title: {
    fontWeight: 'bold',
  },
});
export default Profile;
