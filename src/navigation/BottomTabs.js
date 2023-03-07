import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {colors} from '../helper/colorConstant';
import {BtmTabs} from '../components';
import {routeName} from '../helper/constants';
import Home from '../screens/Home/Home';
import Offers from '../screens/Offers/Offers';
import Profile from '../screens/Profile/Profile';
import News from '../screens/News/News';

const Tab = createBottomTabNavigator();

export default function BottomTabs(route) {
  console.log('route:=>', route.route.params);
  const [index, setIndex] = React.useState(0);
  return (
    <View style={styles.mainContainer}>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        tabBar={props => {
          setIndex(props?.state?.index);
          return <BtmTabs props={props} />;
        }}>
        <Tab.Screen name={routeName.home} component={Home} />
        <Tab.Screen name={routeName.offers} component={Offers} />
        <Tab.Screen name={routeName.news} component={News} />
        <Tab.Screen name={routeName.profile} component={Profile} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white,
  },
});
