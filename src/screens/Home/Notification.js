import React from "react";
import { View, StyleSheet } from "react-native";

import { BtnIconText, NoNotification } from "../../components";
import { colors } from "../../helper/colorConstant";
import { strings } from "../../helper/constants";
import { icons, images } from "../../helper/iconConstant";
import { goBack } from "../../helper/rootNavigation";
import { fontSize, hp, statusBar, wp } from "../../helper/utilities";
import stringslang from "../lng/LocalizedStrings";
const Notification = () => {
  return (
    <View style={styles.mainContainer}>
      <BtnIconText
        source={icons.backFat}
        title={stringslang.NOTIFICATIONS}
        onPress={() => goBack()}
        mainContainer={styles.headerMainView}
        textStyle={styles.headerText}
        iconStyle={{ tintColor: colors.blue }}
      />
      <NoNotification
        source={images.noNotification}
        title={stringslang.NO_NOTIFICATIONS}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: statusBar,
    backgroundColor: colors.white,
  },
  headerMainView: {
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(4.3),
  },
  headerText: {
    color: colors.blue,
    marginLeft: wp(3.5),
    fontSize: fontSize(14),
  },
});

export default Notification;
