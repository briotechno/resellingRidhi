// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

export const setLng = data => {
  data = JSON.stringify(data);
  console.log('data of setLang', data);
  return AsyncStorage.setItem('language', data);
};

export const getLng = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('language').then(data => {
      console.log('data of getLang', data);
      resolve(JSON.parse(data));
    });
  });
};
