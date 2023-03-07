import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';

import {
  BtnIconText,
  Loading,
  ManageItem,
  TxtTouchBtn,
  UserDetailView,
} from '../../components';
import {colors} from '../../helper/colorConstant';
import {routeName, storageKey, strings} from '../../helper/constants';
import {icons, images} from '../../helper/iconConstant';
import {fontSize, hp, statusBar, wp} from '../../helper/utilities';
import {commonActions, goBack, navigate} from '../../helper/rootNavigation';

import Payment from '../../../assets/svg/Payment.svg';
import Invite from '../../../assets/svg/Invite.svg';
import Notifications from '../../../assets/svg/Notifications.svg';
import Privacy from '../../../assets/svg/Privacy.svg';
import About from '../../../assets/svg/About.svg';
import Language from '../../../assets/svg/Language.svg';
import SignOut from '../../../assets/svg/SignOut.svg';
import {getAsyncStorage, removeAsyncStorage} from '../../helper/globalFunction';
import {getUserProfile} from '../../actions/ProfileAction';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../actions/AuthAction';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import stringslang from '../lng/LocalizedStrings';
import {useIsFocused} from '@react-navigation/native';

const Profile = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      const getResult = async () => {
        let userDetail = await getAsyncStorage(storageKey.userDetails);
        setIsLoading(true);
        const formdata = new FormData();
        formdata.append('user_id', userDetail?.user_id);

        const request = {
          data: formdata,
          onSuccess: async res => {
            setIsLoading(false);
            setProfileDetails(res);
          },
          onFail: error => {
            setIsLoading(false);
          },
        };
        dispatch(getUserProfile(request));
      };
      getResult();
    }
  }, [isFocused]);

  const onSignOutPress = async () => {
    setIsLoading(true);
    let userDetail = await getAsyncStorage(storageKey.userDetails);
    const formdata = new FormData();
    formdata.append('token', userDetail?.authorization_token);
    formdata.append('user_id', userDetail?.user_id);
    const request = {
      data: formdata,
      onSuccess: async res => {
        if (res?.data?.status) {
          if (userDetail?.social_type === 'google') {
            try {
              await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut();
            } catch (error) {
              console.log('Error :-', error);
            }
          }
          removeAsyncStorage(storageKey.userDetails);
          removeAsyncStorage(storageKey.flag);
          setIsLoading(false);
          setTimeout(() => {
            commonActions(routeName.login);
            // commonActions('Term');
          }, 300);
        }
      },
      onFail: error => {
        setIsLoading(false);
      },
    };
    dispatch(logoutUser(request));
  };
  const createTwoButtonAlert = () =>
    Alert.alert('Signout User', 'Are you sure you want to signout?', [
      {
        text: 'YES',
        onPress: () => onSignOutPress(),
        style: 'cancel',
      },
      {text: 'NO', onPress: () => console.log('No Pressed')},
    ]);
  //   const backLoginButtonAlert = () =>
  //   Alert.alert("Please Login", "Login is required to access this , please login.", [
  //     {
  //       text: "cancel",
  //       onPress: () => console.log("No Pressed"),
  //       style: "cancel",
  //     },
  //     { text: "Login", onPress: () => navigate(routeName.editProfile) },
  //   ]);

  // console.log("profileDetails ::--", profileDetails);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerMainView}>
        <BtnIconText
          // source={icons.back}
          // title={stringslang.SETTING}
          onPress={() => goBack()}
        />
        <TxtTouchBtn
          title={stringslang.EDIT_PROFILE}
          onPress={() => navigate(routeName.editProfile)}
          mainContainer={styles.skipMainView}
          textStyle={styles.skipTextStyle}
        />
      </View>
      <UserDetailView
        source={
          profileDetails && profileDetails?.imageName
            ? {uri: profileDetails?.imageName}
            : images.profile
        }
        name={
          profileDetails && profileDetails?.name ? profileDetails?.name : ''
        }
        email={
          profileDetails && profileDetails?.email ? profileDetails?.email : ''
        }
        bonusPoints={
          profileDetails && profileDetails?.bonus_point
            ? profileDetails?.bonus_point
            : ''
        }
      />
      <View style={styles.bottomMainView}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <ManageItem
            source={<Payment />}
            onPress={() => navigate(routeName.subscription)}
            rightSource={icons.forward}
            title={stringslang.MANAGE_PAYMENT}
            mainContainer={styles.itemMainView}
          />
          <ManageItem
            source={<Invite />}
            rightSource={icons.forward}
            title={stringslang.INVITE_FRIENDS}
          />
          <ManageItem
            source={<Notifications />}
            onPress={() => navigate(routeName.notification)}
            rightSource={icons.forward}
            title={stringslang.NOTIFICATIONS}
          />
          <ManageItem
            source={<Privacy />}
            onPress={() => navigate(routeName.privacyPolicy)}
            rightSource={icons.forward}
            title={stringslang.PRIVACY_POLICY}
          />
          <ManageItem
            source={<About />}
            onPress={() => navigate(routeName.aboutUs)}
            rightSource={icons.forward}
            title={stringslang.ABOUT_US}
          />
          {/* {<ManageItem 
            source={<Language />}
            onPress={() => navigate(routeName.chooseBrand)}
            rightSource={icons.forward}
            title={stringslang.CHOOSE_BRANDS}
          />*/}

          <ManageItem
            source={<Language />}
            onPress={() => navigation.navigate('SettingScreen')}
            rightSource={icons.forward}
            title={stringslang.LANGUAGE_SELECTION}
          />
          <ManageItem
            source={<SignOut />}
            // onPress={onSignOutPress}
            onPress={createTwoButtonAlert}
            rightSource={icons.forward}
            title={stringslang.SIGN_OUT}
          />
        </ScrollView>
      </View>
      <Loading visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: statusBar,
    backgroundColor: colors.bgBlue,
  },
  headerMainView: {
    marginTop: hp(2.1),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(6.5),
    justifyContent: 'space-between',
  },
  skipMainView: {
    marginTop: 0,
    marginRight: 0,
    alignSelf: 'auto',
  },
  skipTextStyle: {
    color: colors.white,
    fontSize: fontSize(10),
    textDecorationLine: 'underline',
  },
  bottomMainView: {
    flex: 1,
    marginTop: hp(3),
    paddingHorizontal: wp(6.5),
    borderTopLeftRadius: wp(6.4),
    backgroundColor: colors.white,
    borderTopRightRadius: wp(6.4),
  },
  itemMainView: {
    paddingTop: hp(4.9),
  },
});

export default Profile;
