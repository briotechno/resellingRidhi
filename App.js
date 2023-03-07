import React, {useEffect, useState, useRef} from 'react';
import {LogBox, StatusBar, AppState} from 'react-native';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import MainNavigator from './src/navigation/MainNavigator';
import rootReducer from './src/reducers';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';

GoogleSignin.configure({
  scopes: ['email'],
  offlineAccess: true,
  webClientId:
    '116096283498-i0mfbgnqa7h0eft7m70of3bqgicglooa.apps.googleusercontent.com',
  iosClientId:
    '116096283498-63re7e6gp62qsb9maqcvpcq6bv0in72p.apps.googleusercontent.com',
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log(fcmToken);
    if (fcmToken) {
      console.log(fcmToken);
      // console.log('notification', fcmToken);
      messaging().onMessage(async remoteMessage => {
        console.log('remoteMessage', remoteMessage);
        PushNotificationIos.addNotificationRequest({
          id: remoteMessage.messageId,
          body: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          userInfo: remoteMessage.data,
        });
      });
    } else {
      console.log('Failed', 'No token received');
    }
  };

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      {appStateVisible === 'active' ? <MainNavigator /> : null}
    </Provider>
  );
};

export default App;
