import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const enableNotification = (popup) => {
  messaging().subscribeToTopic('warning');
  return messaging().onMessage(async remoteMessage => {
    if (popup.current != null) {
      popup.current.show({
        appIconSource: require('../assets/traffic_light.png'),
        appTitle: "Straffic",
        timeText: 'now',
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        slideOutTime: 5000
      })
    }
    else {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    }
      
  });
};

const disableNotification = () => {
  messaging()
    .unsubscribeFromTopic('warning')
};

const handlingInteraction = (onOpenedApp, onClosedApp) => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    onOpenedApp();
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      onClosedApp(remoteMessage);
    });
};
export {enableNotification, disableNotification, handlingInteraction};
