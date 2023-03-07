import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Analytics from './Analytics';
import Coupons from './Coupons';
import NewsTabList from './NewsTabList';
import {isIos, statusBar} from '../../helper/utilities';
import stringslang from '../lng/LocalizedStrings';
import {fontSize, hp, wp} from '../../helper/utilities';
import { colors } from '../../helper/colorConstant';
const Tab = createMaterialTopTabNavigator();

const News = () => {
  return (
    <View style={styles.mainContainer}>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontWeight: 'bold',
            fontSize: fontSize(14),
            textTransform: 'none',
          },

          indicatorStyle: {
            backgroundColor: colors.bgBlue,
          },
        }}>
        <Tab.Screen name={stringslang.NEWS} component={NewsTabList} />
        <Tab.Screen name={stringslang.ANALYTICS} component={Analytics} />
        <Tab.Screen name={stringslang.COUPONS} component={Coupons} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: statusBar,
    backgroundColor:colors.white
  },
});

export default News;
