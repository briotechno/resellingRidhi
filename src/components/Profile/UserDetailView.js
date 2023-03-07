import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { colors } from "../../helper/colorConstant";
import { strings } from "../../helper/constants";
import { fontSize, hp, wp } from "../../helper/utilities";
import stringslang from "../../screens/lng/LocalizedStrings";

const UserDetailView = ({ source, name, email, bonusPoints }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgViewStyle}>
        <Image
          source={source}
          style={styles.imgStyle}
          resizeMode={strings.contain}
        />
      </View>
      <Text style={styles.textStyle}>{name}</Text>
      <Text style={styles.emailTxtStyle}>{email}</Text>
      <Text style={styles.bonusTitleStyle}>
        {stringslang.BONUS_POINTS}
        <Text style={styles.bonusValueStyle}>{bonusPoints}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp(5.9),
    alignItems: "center",
  },
  imgViewStyle: {
    borderWidth: 2,
    width: wp(37.6),
    height: wp(37.6),
    alignItems: "center",
    borderRadius: wp(18.8),
    justifyContent: "center",
    borderColor: colors.lightBlue,
  },
  imgStyle: {
    width: wp(34.2),
    height: wp(34.2),
    borderRadius: wp(17.1),
  },
  textStyle: {
    marginTop: hp(2),
    fontWeight: "bold",
    color: colors.white,
    fontSize: fontSize(14),
  },
  emailTxtStyle: {
    opacity: 0.4,
    fontWeight: "bold",
    marginTop: hp(0.5),
    color: colors.white,
    fontSize: fontSize(12),
  },
  bonusTitleStyle: {
    fontWeight: "400",
    marginTop: hp(0.65),
    color: colors.white,
    fontSize: fontSize(12),
  },
  bonusValueStyle: {
    fontWeight: "700",
    color: colors.white,
    fontSize: fontSize(14),
  },
});

export default UserDetailView;
