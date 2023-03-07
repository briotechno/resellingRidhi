import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  I18nManager,
} from 'react-native';
import {setLng, getLng} from '../helper/changeLng';
import strings from './lng/LocalizedStrings';
import RNRestart from 'react-native-restart';
import {colors} from '../helper/colorConstant';
import LinearGradient from 'react-native-linear-gradient';
import {fontSize, hp, wp} from '../helper/utilities';

// import {Picker} from '@react-native-picker/pic

const Screen = ({navigation}) => {
  console.log('open btn lan');
  const selectedLng = async () => {
    console.log('cll selectedlng');
    const lngData = await getLng();
    if (!!lngData) {
      strings.setLanguage(lngData);
    }
    console.log('selected Language data==>>>', lngData);
  };

  const onChangeLng = async lng => {
    console.log('lag ::: ', lng);
    if (lng === 'en') {
      I18nManager.forceRTL(false);
      setLng('en');
      RNRestart.Restart();
      return;
    }
    if (lng === 'ar') {
      I18nManager.forceRTL(true);
      setLng('ar');
      RNRestart.Restart();
      return;
    }
    if (lng === 'hi') {
      I18nManager.forceRTL(false);
      setLng('hi');
      RNRestart.Restart();
      return;
    }
    if (lng === 'ch') {
      I18nManager.forceRTL(false);
      setLng('ch');
      RNRestart.Restart();
      return;
    }
  };

  useEffect(() => {
    selectedLng();
  }, []);

  return (
    <View style={styles.mainView}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            marginTop: '20%',
          }}>
          Select Language
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: '10%',
        }}>
        <TouchableOpacity
          style={styles.mainContainer}
          onPress={() => onChangeLng('en')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.bgBlue, colors.lightBlue]}
            style={[styles.linearGradient]}>
            <Text style={[styles.buttonText]}>English</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* <TouchableOpacity
            style={{
              backgroundColor: '#000',
              width: '40%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => onChangeLng('ar')}>
            <Text style={{fontSize: 18, color: '#fff'}}>عربى</Text>
          </TouchableOpacity> */}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: '5%',
        }}>
        <TouchableOpacity
          style={styles.mainContainer}
          onPress={() => onChangeLng('hi')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.bgBlue, colors.lightBlue]}
            style={[styles.linearGradient]}>
            <Text style={[styles.buttonText]}>German</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* <TouchableOpacity
            style={{
              backgroundColor: '#000',
              width: '40%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => onChangeLng('ch')}>
            <Text style={{fontSize: 18, color: '#fff'}}>中國人</Text>
          </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(87),
    marginHorizontal: wp(6.5),
  },
  linearGradient: {
    height: hp(5.9),
    alignItems: 'center',
    borderRadius: wp(2.15),
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: fontSize(14),
  },
});

export default Screen;
