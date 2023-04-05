import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../actions/AuthAction";

import {
  Input,
  TxtTouchBtn,
  GradientBtn,
  Text2WithBtn,
  WelcomeMsgView,
  SepratorOrView,
  BtnWithIcon,
  Loading,
} from "../../components";
import { colors } from "../../helper/colorConstant";
import { routeName, storageKey, strings } from "../../helper/constants";
import { icons, images } from "../../helper/iconConstant";
import { navigate } from "../../helper/rootNavigation";
import { fontSize, hp, isIos, wp } from "../../helper/utilities";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import appleAuth from "@invertase/react-native-apple-authentication";
import { setAsyncStorage } from "../../helper/globalFunction";
import stringslang from "../lng/LocalizedStrings";
import messaging from "@react-native-firebase/messaging";
import Toast from "react-native-simple-toast";
const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPwd, setIsValidPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onFullNameTxtChange = (text) => {
    setFullName(text);
  };

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

  const onConfirmPwdTxtChange = (text) => {
    let reg = new RegExp("^(?=.{6,})");
    if (reg.test(text)) {
      setConfirmPwd(text);
      setIsValidPwd(true);
    } else {
      setConfirmPwd(text);
      setIsValidPwd(false);
    }
  };

  const onSignInPress = () => {
    navigate(routeName.login);
  };

  const onSignUpBtnPress = async () => {
    if (fullName?.length === 0) {
      // Alert.alert(strings.fullName, strings.enterFullName);
      Toast.showWithGravity(strings.enterFullName, Toast.SHORT, Toast.BOTTOM);
    } else if (email?.length === 0) {
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
    } else if (confirmPwd?.length === 0) {
      // Alert.alert(strings.confirmPwd, strings.enterConfirmPwd);
      Toast.showWithGravity(strings.enterConfirmPwd, Toast.SHORT, Toast.BOTTOM);
    } else if (pwd !== confirmPwd) {
      // Alert.alert(strings.password, strings.pwdNotMatch);
      Toast.showWithGravity(strings.pwdNotMatch, Toast.SHORT, Toast.BOTTOM);
    } else {
      const fcmToken = await messaging().getToken();
      setIsLoading(true);
      const formdata = new FormData();
      formdata.append("name", fullName);
      formdata.append("email", email);
      formdata.append("password", pwd);
      formdata.append("device_type", isIos ? 1 : 0);
      formdata.append("device_token", fcmToken);
      formdata.append("social_type", "normal");
      const request = {
        data: formdata,
        onSuccess: (res) => {
          setIsLoading(false);
          if (res?.status === 200) {
            if (res?.data?.status) {
              setAsyncStorage(storageKey.userDetails, res?.data?.data);
              setAsyncStorage(storageKey.flag, true);
              // navigate(routeName.bottomTab);
              setAsyncStorage(storageKey.termFlag, true);
              navigate("Term");
            } else {
              // Alert.alert(strings.error, res?.data?.errors?.email?.[0]);
              Toast.showWithGravity(
                res?.data?.errors?.email?.[0],
                Toast.SHORT,
                Toast.BOTTOM
              );
            }
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
      dispatch(registerUser(request));
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

  const onGoogleLoginAPI = async (rnFirebase) => {
    const fcmToken = await messaging().getToken();
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
            title={stringslang.GET_STARTED}
            description={stringslang.STATED_TEXT}
          />
          <Input
            value={fullName}
            source={icons.user}
            onChange={onFullNameTxtChange}
            placeholder={stringslang.FULLNAME}
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
          <Input
            secureTextEntry
            value={confirmPwd}
            source={icons.password}
            onChange={onConfirmPwdTxtChange}
            placeholder={stringslang.CONFIRM_PASSWORD}
          />
          <GradientBtn
            loading={isLoading}
            disabled={isLoading}
            title={strings.signUp}
            onPress={onSignUpBtnPress}
            mainContainer={{ marginTop: hp(3) }}
          />

          <SepratorOrView mainContainer={{ marginVertical: hp(1.5) }} />

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
            desc={stringslang.ALREADY_ACCOUNT}
            btnTitle={stringslang.SIGNIN}
            onPress={onSignInPress}
          />

          <View style={styles.termAndConView}>
            <Text
              style={[
                styles.termTextStyle,
                {
                  color: "rgba(31, 61, 77, 0.4)",
                },
              ]}
            >
              {stringslang.PRIVACY_POLICY_DES}
            </Text>
            <Text style={styles.termTextStyle}>
              {stringslang.PRIVACY_POLICY_TEXT}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* <TxtTouchBtn
        title={stringslang.SKIP}
        onPress={() => {}}
        textStyle={styles.skipTextStyle}
        mainContainer={styles.skipMainView}
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
  termAndConView: {
    marginTop: hp(1.35),
    alignItems: "center",
  },
  termTextStyle: {
    fontWeight: "700",
    fontSize: fontSize(10),
    color: colors.lightBlue,
  },
  skipMainView: {
    bottom: hp(5),
    right: wp(1.6),
    position: "absolute",
  },
  skipTextStyle: {
    opacity: 0.8,
    fontSize: fontSize(14),
    color: colors.textColor,
    textDecorationLine: "underline",
  },
});

export default Register;
