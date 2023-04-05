import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {navigationRef} from '../helper/rootNavigation';
import Splash from '../screens/Splash/Splash';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import Home from '../screens/Home/Home';
import {routeName} from '../helper/constants';
import ChangePassword from '../screens/Auth/ChangePassword';
import BottomTabs from './BottomTabs';
import Profile from '../screens/Profile/Profile';
import EditProfile from '../screens/Profile/EditProfile';
import OfferDetails from '../screens/Offers/OfferDetails';
import Notification from '../screens/Home/Notification';
import NoInternet from '../screens/NoInternet/NoInternet';
import AboutUs from '../screens/Profile/AboutUs';
import PrivacyPolicy from '../screens/Profile/PrivacyPolicy';
import Subscription from '../screens/Profile/Subscription';
import ChooseBrand from '../screens/Offers/ChooseBrand';
import SettingScreen from '../screens/SettingScreen';
import newsDetails from '../screens/News/NewsDetails';
import TermandCondition from '../screens/Auth/TermandCondition';
import AnalyticsDetails from '../screens/News/AnalyticsDetails';
import FilterScreen from '../screens/Offers/FilterScreen';
import NotificationSettingScreen from '../screens/Home/NotificationSettingScreen';
const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}
        initialRouteName={routeName.splash}>
        <Stack.Screen name={routeName.splash} component={Splash} />
        <Stack.Screen name={'Term'} component={TermandCondition} />
        <Stack.Screen name={routeName.login} component={Login} />
        <Stack.Screen name={routeName.register} component={Register} />
        <Stack.Screen name={routeName.forgotPwd} component={ForgotPassword} />
        <Stack.Screen name={routeName.changePwd} component={ChangePassword} />
        {/* <Stack.Screen name={routeName.profile} component={Profile} /> */}
        <Stack.Screen name={routeName.bottomTab} component={BottomTabs} />
        <Stack.Screen name={routeName.editProfile} component={EditProfile} />
        <Stack.Screen name={routeName.offerDetails} component={OfferDetails} />
        <Stack.Screen name={routeName.notification} component={Notification} />
        <Stack.Screen name={routeName.noInternet} component={NoInternet} />
        <Stack.Screen name={routeName.aboutUs} component={AboutUs} />
        <Stack.Screen
          name={routeName.privacyPolicy}
          component={PrivacyPolicy}
        />
        <Stack.Screen name={routeName.subscription} component={Subscription} />
        <Stack.Screen name={routeName.chooseBrand} component={ChooseBrand} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name={routeName.newsDetails} component={newsDetails} />
        <Stack.Screen
          name={routeName.analyticsDetails}
          component={AnalyticsDetails}
        />
        <Stack.Screen name={routeName.FilterScreen} component={FilterScreen} />
        <Stack.Screen name={routeName.NotificationSettingScreen} component={NotificationSettingScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
