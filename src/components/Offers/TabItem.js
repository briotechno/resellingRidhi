import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../helper/colorConstant";
import { fontSize, hp, wp } from "../../helper/utilities";

const TabItem = ({ onPress, title, textStyle, mainContainer }) => {
  return (
    <TouchableOpacity
      style={[styles.mainContainer, mainContainer]}
      onPress={onPress}
    >
      <Text style={[styles.textStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: wp(7),
    borderBottomWidth: wp(0.6),
  },
  textStyle: {
    fontWeight: "bold",
    paddingTop: hp(1.85),
    paddingBottom: hp(2),
    fontSize: fontSize(12),
    color: colors.textColor,
  },
});

export default TabItem;
