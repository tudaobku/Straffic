import React, {useState, useReducer, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
// Context
import {AuthContext} from '../contexts/Auth';
// Endpoint
const END_POINT = 'localhost';
// User Profile
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [eye, setEye] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [validate, setValidate] = useState({
    isValidUsername: true,
    isValidPassword: true,
  });
  const {login} = useContext(AuthContext);
  const handleLogin = async () => {
    await setIsLoading(true);
    const loginBody = {
      username: loginData.username,
      password: loginData.password,
    };
    try {
      const res = await axios.post(END_POINT + '/login', loginBody);
      login({
        username: res.data.username,
        userToken: res.data.userToken,
      });
    } catch (err) {
      Alert.alert('Lỗi !', 'Tài khoản/ Mật khẩu không đúng!');
    }
    await setIsLoading(false);
  };
  useEffect(() => {
    setValidate(pre => ({
      ...pre,
      isValidPassword: loginData.password.length < 3 ? false : true,
    }));
    setValidate(pre => ({
      ...pre,
      isValidUsername: loginData.username.length < 3 ? false : true,
    }));
  }, [loginData]);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome!</Text>
      </View>
      <View style={styles.footer}>
        <Text>Email</Text>
        <View style={styles.action}>
          <Icon name="person" size={20}></Icon>
          <TextInput
            defaultValue={loginData.username}
            placeholder="Username"
            style={styles.input}
            onChangeText={username => {
              setLoginData({...loginData, username: username});
            }}></TextInput>
        </View>
        <View>
          {!validate.isValidUsername ? (
            <Animatable.Text animation="shake" style={{color: 'red'}}>
              Username must be 3 characters long.
            </Animatable.Text>
          ) : null}
        </View>
        <Text style={{marginTop: 35}}>Password</Text>
        <View style={styles.action}>
          <Icon name="lock-closed" size={20}></Icon>
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={eye ? true : false}
            onChangeText={pass => {
              setLoginData({...loginData, password: pass});
            }}
            defaultValue={loginData.password}></TextInput>
          <Icon
            name={eye ? 'eye' : 'eye-off'}
            size={20}
            onPress={() => {
              setEye(!eye);
            }}></Icon>
        </View>
        <View>
          {!validate.isValidPassword ? (
            <Animatable.Text animation="shake" style={{color: 'red'}}>
              Password must be 3 characters long.
            </Animatable.Text>
          ) : null}
        </View>
        <View style={{marginTop: 20}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (validate.isValidPassword && validate.isValidUsername) {
                handleLogin();
              } else {
                Alert.alert('Sai!');
              }
            }}>
            <Text>Log In</Text>
            {/* <FontAwesomeIcon icon="coffee" /> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 40,
    color: 'white',
    fontWeight: '600',
  },
  action: {
    flexDirection: 'row',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    marginTop: 10,
  },
  input: {
    flex: 1,
    marginLeft: 20,
    color: '#05375a',
    padding: 5,
  },
  button: {
    backgroundColor: '#DDDD',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
    height: 50,
    borderRadius: 15,
    marginTop: 40,
  },
  errorMsg: {
    color: 'red',
    marginTop: 3,
  },
});
export default Login;
