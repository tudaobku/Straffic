import React, {
  useState,
  Component,
  useReducer,
  useContext,
  useEffect,
} from 'react';
import {Text, StyleSheet, Button, View, ActivityIndicator} from 'react-native';
import Login from './src/screens/Login';
import Main from './src/screens/Main';
import {AuthContext} from './src/contexts/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  disableNotification,
  enableNotification,
} from './src/services/Notification';

const App = () => {
  const loginInit = {
    username: null,
    userToken: null,
    isLoading: null,
  };
  const loginReducer = (state, action) => {
    switch (action.type) {
      case 'INIT':
        return {
          ...state,
          userToken: action.userToken,
          username: action.username,
          // isLoading: false,
        };
      case 'LOGIN':
        return {
          ...state,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...state,
          username: null,
          userToken: null,
          isLoading: false,
        };
      default:
        return state;
    }
  };
  const [loginState, dispatch] = useReducer(loginReducer, loginInit);
  const authContext = {
    login: async ({username, userToken}) => {
      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('username', username);
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: 'LOGIN',
        id: username,
        token: userToken,
      });
    },
    logout: async () => {
      try {
        disableNotification();
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('username');
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: 'LOGOUT',
      });
    },
    profile: () => {
      return loginState;
    },
  };
  useEffect(() => {
    setTimeout(async () => {
      const username = await AsyncStorage.getItem('username');
      const userToken = await AsyncStorage.getItem('userToken');
      dispatch({
        type: 'INIT',
        username: username,
        userToken: userToken,
      });
    }, 500);
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userToken !== null ? <Main></Main> : <Login></Login>}
    </AuthContext.Provider>
  );
};
const styles = StyleSheet.create({});
export default App;
