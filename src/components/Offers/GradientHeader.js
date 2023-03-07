import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { colors } from "../../helper/colorConstant";
import { strings } from "../../helper/constants";
import { fontSize, hitSlop, hp, wp } from "../../helper/utilities";
import TabView from "../common/TabView";

const GradientHeader = ({
  leftTitle,
  activeIdx,
  tab1Title,
  tab2Title,
  rightSource,
  onTab1Press,
  onTab2Press,
  onRightImgPress,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.bgBlue, colors.lightBlue]}
      style={styles.mainContainer}
    >
      <Text style={styles.textStyle}>{leftTitle}</Text>
      <View style={styles.rightMainView}>
        {/* <TabView
          activeIdx={activeIdx}
          tab1Title={tab1Title}
          tab2Title={tab2Title}
          onTab1Press={onTab1Press}
          onTab2Press={onTab2Press}
        /> */}
        <TouchableOpacity hitSlop={hitSlop(7)} onPress={onRightImgPress}>
          <Image
            source={rightSource}
            style={styles.rightImgStyle}
            resizeMode={strings.contain}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: hp(1.5),
    justifyContent: "space-between",
  },
  textStyle: {
    fontWeight: "bold",
    marginLeft: wp(6.5),
    color: colors.white,
    fontSize: fontSize(14),
  },
  rightMainView: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: wp(5.35),
  },
  rightImgStyle: {
    width: wp(3.7),
    height: wp(3.7),
    marginLeft: wp(4.6),
    tintColor: colors.white,
  },
});

export default GradientHeader;
