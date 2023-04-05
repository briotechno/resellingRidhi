import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { colors } from "../../helper/colorConstant";
import { strings } from "../../helper/constants";
import { fontSize, wp } from "../../helper/utilities";

const FeatureBenifitItem = ({ source, title, mainContainer }) => {
  return (
    <View style={[styles.mainContainer, mainContainer]}>
      <Image
        source={source}
        resizeMode={strings.contain}
        style={styles.imgStyle}
      />
      <Text style={styles.titleStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgStyle: {
    width: wp(6.9),
    height: wp(6.9),
  },
  titleStyle: {
    fontWeight: "400",
    marginLeft: wp(4),
    fontSize: fontSize(14),
    color: colors.textColor,
  },
});

export default FeatureBenifitItem;
