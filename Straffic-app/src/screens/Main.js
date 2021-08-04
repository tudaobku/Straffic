import React, {useEffect, useState, useContext, useRef} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import ControlLed from './ControlLed';
import Statistic from './Statistic';
import Notification from './Notification';
import Profile from './Profile';
import CrossRoadMap from './CrossRoadMap';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  enableNotification,
  handlingInteraction,
} from '../services/Notification';
import {CrossRoadContextProvider} from '../contexts/CrossRoad';
import {CrossRoadContext} from '../contexts/CrossRoad';
import {AuthContext} from '../contexts/Auth';
import NotificationPopup from 'react-native-push-notification-popup';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const HomeSreen = () => {
  const {logout} = useContext(AuthContext);
  const {isLoading: isCrossRoadLoading, error} = useContext(CrossRoadContext);
  const [initTab, setInitTab] = useState('ControlLed');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const popup = useRef(null);
  useEffect(() => {
    handlingInteraction(
      () => {
        navigation.navigate('Notification');
      },
      notification => {
        if (notification) setInitTab('Notification');
        setLoading(false);
      },
    );
    const cleanup = enableNotification(popup);
    return cleanup;
  }, []);

  if (loading || isCrossRoadLoading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  if (error) {
    logout();
  }
  return (
    <View style={{flex:1}}>
      <Tab.Navigator
        initialRouteName={initTab}
        shifting={true}
        activeColor="green"
        barStyle={{backgroundColor: '#fff'}}>
        <Tab.Screen
          component={ControlLed}
          name="ControlLed"
          options={{
            tabBarIcon: () => (
              <View>
                <Icon style={[{color: 'green'}]} size={25} name={'home'} />
              </View>
            ),
          }}></Tab.Screen>
        <Tab.Screen
          component={Statistic}
          name="Statistic"
          options={{
            tabBarIcon: () => (
              <View>
                <Icon
                  style={[{color: 'green'}]}
                  size={25}
                  name={'stats-chart'}
                />
              </View>
            ),
            tabBarColor: null,
          }}></Tab.Screen>
        <Tab.Screen
          component={Notification}
          name="Notification"
          options={{
            tabBarIcon: () => (
              <View>
                <Icon
                  style={[{color: 'green'}]}
                  size={25}
                  name={'notifications'}
                />
              </View>
            ),
          }}></Tab.Screen>
        <Tab.Screen
          component={Profile}
          name="Profile"
          options={{
            tabBarIcon: () => (
              <View>
                <Icon
                  style={[{color: 'green'}]}
                  size={25}
                  name={'ios-person'}
                />
              </View>
            ),
          }}></Tab.Screen>
      </Tab.Navigator>
      <NotificationPopup ref={popup} />
    </View>
  );
};
const Main = () => {
  return (
    <CrossRoadContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeSreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Map" component={CrossRoadMap} />
        </Stack.Navigator>
      </NavigationContainer>
    </CrossRoadContextProvider>
  );
};
export default Main;
