import React, {useState} from 'react';
import {Image, StyleSheet, SafeAreaView, Text, Alert, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {forgotPwd} from '../../actions/AuthAction';

import {Input, GradientBtn, Text2WithBtn} from '../../components';
import {colors} from '../../helper/colorConstant';
import {routeName, strings} from '../../helper/constants';
import {icons, images} from '../../helper/iconConstant';
import {navigate} from '../../helper/rootNavigation';
import {fontSize, hp, wp} from '../../helper/utilities';
import stringslang from '../lng/LocalizedStrings';
import Toast from 'react-native-simple-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const onEmailTxtChange = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text)) {
      setEmail(text);
      setIsValidEmail(true);
    } else {
      setEmail(text);
      setIsValidEmail(false);
    }
  };

  const onSignInPress = () => {
    navigate(routeName.login);
  };

  const onResetPwdBtnPress = () => {
    if (email?.length === 0) {
      // Alert.alert(strings.email, strings.enterEmail);
      Toast.showWithGravity(strings.enterEmail, Toast.SHORT, Toast.BOTTOM);

    } else if (!isValidEmail) {
      // Alert.alert(strings.email, strings.validEmail);
      Toast.showWithGravity(strings.validEmail, Toast.SHORT, Toast.BOTTOM);

    } else {
      setIsLoading(true);
      const formdata = new FormData();
      formdata.append('email', email);
      const request = {
        data: formdata,
        onSuccess: res => {
          setIsLoading(false);
          if (res?.status === 200) {
            if (res?.data?.status) {
              // navigate(routeName.changePwd);
              Alert.alert(strings.email, res?.data?.message, [
                {text: 'OK', onPress: () => navigate(routeName.login)},
              ]);
            } else {
              // Alert.alert(strings.error, res?.data?.message);
              Toast.showWithGravity( res?.data?.message, Toast.SHORT, Toast.BOTTOM);

              
            }
          }
        },
        onFail: error => {
          setIsLoading(false);
          if (error?.response?.status === 400) {
            // Alert.alert(strings.error, error?.response?.data?.message);
            Toast.showWithGravity(  error?.response?.data?.message, Toast.SHORT, Toast.BOTTOM);

          }
        },
      };
      dispatch(forgotPwd(request));
    }
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        bounces={false}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}>
        <View
          style={[
            styles.mainContainer,
            {
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Image
            source={images.forgotPwdImg}
            style={styles.imageStyle}
            resizeMode={strings.contain}
          />
          <Text style={styles.descTextStyle}>{stringslang.RESET_PASSWORD_TEXT}</Text>
          <Input
            value={email}
            source={icons.email}
            onChange={onEmailTxtChange}
            placeholder={stringslang.EMAIL}
          />
          <GradientBtn
            loading={isLoading}
            disabled={isLoading}
            title={stringslang.RESET_PASSWORD}
            onPress={onResetPwdBtnPress}
            mainContainer={{marginTop: hp(3)}}
          />
          <Text2WithBtn
            desc={stringslang.REMEMBER_PASSWORD}
            btnTitle={stringslang.SIGNIN}
            onPress={onSignInPress}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageStyle: {
    width: wp(74.5),
    height: hp(28),
  },
  descTextStyle: {
    fontWeight: '500',
    marginTop: hp(7.6),
    marginBottom: hp(1),
    fontSize: fontSize(16),
    color: colors.textColor,
  },
});

export default ForgotPassword;
