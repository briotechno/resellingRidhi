import React, { useEffect, useState } from "react";
import { Image, View, Alert, StyleSheet, BackHandler } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/AuthAction";
import stringslang from "../lng/LocalizedStrings";
import {
  Input,
  TxtTouchBtn,
  GradientBtn,
  BtnWithIcon,
  Text2WithBtn,
  WelcomeMsgView,
  SepratorOrView,
  Loading,
} from "../../components";
import { colors } from "../../helper/colorConstant";
import { routeName, storageKey, strings } from "../../helper/constants";
import { setAsyncStorage } from "../../helper/globalFunction";
import { icons, images } from "../../helper/iconConstant";
import { navigate } from "../../helper/rootNavigation";
import { fontSize, hp, isIos, wp } from "../../helper/utilities";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import appleAuth from "@invertase/react-native-apple-authentication";
import messaging from "@react-native-firebase/messaging";
import Toast from "react-native-simple-toast";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPwd, setIsValidPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backBtnCounter, setBackBtnCounter] = useState(0);

  const dispatch = useDispatch();

  const backAction = () => {
    setTimeout(() => {
      setBackBtnCounter(0);
    }, 2000);

    if (backBtnCounter === 0) {
      setBackBtnCounter(backBtnCounter + 1);
    } else if (backBtnCounter === 1) {
      Alert.alert("Exit App!", "Are you sure you want to exit app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
    }
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  const onEmailTxtChange = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text)) {
      setEmail(text);
      setIsValidEmail(true);
    } else {
      setEmail(text);
      setIsValidEmail(false);
    }
  };

  const onPwdTxtChange = (text) => {
    let reg = new RegExp("^(?=.{6,})");
    if (reg.test(text)) {
      setPwd(text);
      setIsValidPwd(true);
    } else {
      setPwd(text);
      setIsValidPwd(false);
    }
  };

  const onForgotPwdPress = () => {
    navigate(routeName.forgotPwd);
  };

  const onSignUpPress = () => {
    navigate(routeName.register);
  };

  const onLoginBtnPress = async () => {
    // navigate(routeName.bottomTab);
    if (email?.length === 0) {
      // Alert.alert(strings.email, strings.enterEmail);
      Toast.showWithGravity(strings.enterEmail, Toast.SHORT, Toast.BOTTOM);
    } else if (!isValidEmail) {
      // Alert.alert(strings.email, strings.validEmail);
      Toast.showWithGravity(strings.validEmail, Toast.SHORT, Toast.BOTTOM);
    } else if (pwd?.length === 0) {
      // Alert.alert(strings.password, strings.enterPwd);
      Toast.showWithGravity(strings.enterPwd, Toast.SHORT, Toast.BOTTOM);
    } else if (!isValidPwd) {
      // Alert.alert(strings.password, strings.validPwd);
      Toast.showWithGravity(strings.validPwd, Toast.SHORT, Toast.BOTTOM);
    } else {
      const fcmToken = await messaging().getToken();
      console.log("FCM Token ::--", fcmToken);
      setIsLoading(true);
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", pwd);
      formdata.append("device_type", isIos ? 1 : 0);
      formdata.append("device_token", fcmToken);
      formdata.append("social_type", "normal");
      const request = {
        data: formdata,
        onSuccess: async (res) => {
          console.log("Login res ::--", res);
          setIsLoading(false);
          if (res?.status === 200) {
            setAsyncStorage(storageKey.userDetails, res?.data?.data);
            setAsyncStorage(storageKey.flag, true);
            // navigate(routeName.bottomTab);
            setAsyncStorage(storageKey.termFlag, true);
            navigate("Term");
          }
        },
        onFail: (error) => {
          setIsLoading(false);
          if (error?.response?.status === 400) {
            // Alert.alert(strings.error, error?.response?.data?.message);
            Toast.showWithGravity(
              error?.response?.data?.message,
              Toast.SHORT,
              Toast.BOTTOM
            );
          }
        },
      };
      dispatch(loginUser(request));
    }
  };

  const onAppleBtnPress = async () => {
    try {
      const appleAuthRes = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const { identityToken, nonce } = appleAuthRes;
      const credential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce
      );
      let rnFirebase = await auth().signInWithCredential(credential);
    } catch (error) {
      console.log("apple signin catch!", error);
    }
  };

  const onGoogleLoginAPI = async (rnFirebase) => {
    const fcmToken = await messaging().getToken();
    console.log("FCM Token ::--", fcmToken);
    setLoading(true);
    const formdata = new FormData();
    formdata.append("email", rnFirebase?.user?.email);
    formdata.append("password", null);
    formdata.append("device_type", isIos ? 1 : 0);
    formdata.append("device_token", fcmToken);
    formdata.append("social_type", "google");
    const request = {
      data: formdata,
      onSuccess: async (res) => {
        setLoading(false);
        if (res?.status === 200) {
          setAsyncStorage(storageKey.userDetails, res?.data?.data);
          setAsyncStorage(storageKey.flag, true);
          // navigate(routeName.bottomTab);
          setAsyncStorage(storageKey.termFlag, true);
          navigate("Term");
        }
      },
      onFail: (error) => {
        setLoading(false);
        if (error?.response?.status === 400) {
          // Alert.alert(strings.error, error?.response?.data?.message);
          Toast.showWithGravity(
            error?.response?.data?.message,
            Toast.SHORT,
            Toast.BOTTOM
          );
        }
      },
    };
    dispatch(loginUser(request));
  };

  const onGoogleBtnPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      let rnFirebase = await auth().signInWithCredential(credential);
      onGoogleLoginAPI(rnFirebase);
    } catch (error) {
      console.log("google signin catch!");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        extraScrollHeight={10}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
      >
        <View
          style={[
            styles.mainContainer,
            {
              alignItems: "center",
            },
          ]}
        >
          <Image
            source={images.logo}
            style={styles.imageStyle}
            resizeMode={strings.contain}
          />
          <WelcomeMsgView
            title={stringslang.WELCOME}
            description={stringslang.WELCOME_TEXT}
          />
          <Input
            value={email}
            source={icons.email}
            onChange={onEmailTxtChange}
            placeholder={stringslang.EMAIL}
          />
          <Input
            value={pwd}
            secureTextEntry
            source={icons.password}
            onChange={onPwdTxtChange}
            placeholder={stringslang.PASSWORD}
          />
          <TxtTouchBtn
            title={stringslang.FORGOT_PASSWORD}
            onPress={onForgotPwdPress}
          />

          <GradientBtn
            loading={isLoading}
            disabled={isLoading}
            title={stringslang.LOGIN}
            onPress={onLoginBtnPress}
            mainContainer={{ marginTop: hp(4.3) }}
          />

          <SepratorOrView />

          {isIos && (
            <BtnWithIcon
              source={icons.apple}
              title={stringslang.WITH_APPLE}
              onPress={onAppleBtnPress}
            />
          )}

          <BtnWithIcon
            source={icons.google}
            title={stringslang.WITH_GOOGLE}
            onPress={onGoogleBtnPress}
            mainContainer={{
              marginTop: isIos ? hp(0.85) : 0,
              backgroundColor: colors.redBg,
            }}
          />

          <Text2WithBtn
            desc={stringslang.NEW_RESELLING}
            btnTitle={stringslang.SIGNUP}
            onPress={onSignUpPress}
            mainContainer={{
              marginTop: hp(3),
            }}
          />
        </View>
      </KeyboardAwareScrollView>

      {/* <TxtTouchBtn
        title={stringslang.SKIP}
        onPress={() => {
          // navigation.navigate(routeName.bottomTab, {skip: 'skip'});
        }}
        mainContainer={styles.skipMainView}
        textStyle={styles.skipTextStyle}
      /> */}
      <Loading visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageStyle: {
    width: wp(67),
    height: hp(8),
    marginTop: hp(8),
  },
  skipMainView: {
    right: wp(1.6),
    bottom: hp(5),
    position: "absolute",
  },
  skipTextStyle: {
    opacity: 0.8,
    fontSize: fontSize(14),
    color: colors.textColor,
    textDecorationLine: "underline",
  },
});

export default Login;
