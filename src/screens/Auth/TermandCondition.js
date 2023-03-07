import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { AboutDescWithTitle, BtnIconText } from "../../components";
import { colors } from "../../helper/colorConstant";
import { storageKey, strings } from "../../helper/constants";
import { goBack, navigate } from "../../helper/rootNavigation";
import { fontSize, hp, statusBar, wp } from "../../helper/utilities";
import stringslang from "../lng/LocalizedStrings";
import GradientBtn from "../../components/common/GradientBtn";
import { icons } from "../../helper/iconConstant";
import { routeName } from "../../helper/constants";
import { setAsyncStorage } from "../../helper/globalFunction";
const TermandCondition = () => {
  const [isSelectedCheckBox, setISSelectionCheckBox] = useState(false);

  const selectCheckBox = () => {
    setISSelectionCheckBox(!isSelectedCheckBox);
  };

  const onOkBtnPress = () => {
    // navigate(routeName.login);
    setAsyncStorage(storageKey.termFlag, false);
    navigate(routeName.bottomTab);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerMainView}>
        <BtnIconText
          title={stringslang.BACK}
          source={icons.backFat}
          onPress={() => goBack()}
          textStyle={styles.headerText}
          mainContainer={styles.headerMainView}
        />
        <Text style={styles.headerTitleTxt}>{"Terms & Conditions"}</Text>
        <View style={styles.moreDetailMainView}>
          <ScrollView bounces={false}>
            <Text
              style={{
                fontWeight: "400",
                paddingVertical: hp(3),
                fontSize: fontSize(14),
                color: colors.textColor,
              }}
            >
              {strings.loremIpsumDesc}
            </Text>
            <View style={styles.checkBoxView}>
              <TouchableOpacity
                onPress={() => selectCheckBox()}
                style={
                  isSelectedCheckBox
                    ? styles.checkBoxViewEnable
                    : styles.checkBoxDisableView
                }
              >
                {isSelectedCheckBox ? (
                  <Image
                    source={icons.checkRight}
                    style={{
                      width: wp(3.5),
                      height: wp(3.5),
                      tintColor: "white",
                    }}
                  />
                ) : null}
              </TouchableOpacity>
              <Text style={styles.keepTextStyle}>
                {"Agree Terms and Conditions"}
              </Text>
            </View>
            <GradientBtn
              disabled={isSelectedCheckBox ? false : true}
              title={"Ok"}
              onPress={onOkBtnPress}
              mainContainer={{
                marginHorizontal: 0,
                width: wp(85),
                opacity: isSelectedCheckBox ? 1 : 0.7,
              }}
              linearGradient={{ borderRadius: 7, height: hp(7.35) }}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: statusBar,
    backgroundColor: colors.white,
  },
  innerMainView: {
    flex: 1,
    backgroundColor: colors.bgBlue,
  },
  headerTitleTxt: {
    marginTop: hp(3),
    fontWeight: "700",
    textAlign: "center",
    color: colors.white,
    marginBottom: hp(6.7),
    fontSize: fontSize(20),
  },
  headerMainView: {
    paddingTop: hp(2),
    paddingHorizontal: wp(4.3),
  },
  headerText: {
    marginLeft: wp(5),
  },
  moreDetailMainView: {
    flex: 1,
    paddingHorizontal: wp(7),
    borderTopLeftRadius: wp(6.4),
    borderTopRightRadius: wp(6.4),
    backgroundColor: colors.white,
  },
  checkBoxView: {
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: hp(3),
    marginTop: hp(38),
  },
  checkBoxViewEnable: {
    borderRadius: hp(0.4),
    backgroundColor: colors.blueTxt,
    borderStyle: "solid",
    borderWidth: 1,
    padding: hp(0.4),
    borderColor: colors.blueTxt,
    justifyContent: "center",
  },
  checkBoxDisableView: {
    borderRadius: hp(0.4),
    backgroundColor: colors.white,
    borderStyle: "solid",
    borderWidth: 1,
    padding: hp(1.3),
    borderColor: "grey",
    justifyContent: "center",
  },
  keepTextStyle: {
    fontWeight: "400",
    fontSize: fontSize(14),
    color: colors.gray,
    marginHorizontal: hp(1),
    textAlign: "center",
  },
});

export default TermandCondition;
