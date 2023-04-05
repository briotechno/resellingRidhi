import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

import { colors } from "../../helper/colorConstant";
import { routeName, storageKey, strings } from "../../helper/constants";
import { getAsyncStorage } from "../../helper/globalFunction";
import { gifs } from "../../helper/iconConstant";
import { commonActions } from "../../helper/rootNavigation";
import { wp } from "../../helper/utilities";
import { getLng, setLng } from "../../helper/changeLng";
import stringslang from "../lng/LocalizedStrings";

const Splash = () => {
  useEffect(() => {
    const getResult = async () => {
      setTimeout(async () => {
        let flag = await getAsyncStorage(storageKey.flag);
        let termFlag = await getAsyncStorage(storageKey.termFlag);
        console.log("Flag ::--", flag);
        if (flag && !termFlag) {
          commonActions(routeName.bottomTab);
        } else {
          commonActions(routeName.login);
        }
      }, 1000);
    };
    getResult();
  }, []);

  useEffect(async () => {
    const lngData = await getLng();
    if (!!lngData) {
      stringslang.setLanguage(lngData);
    }
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Image
        source={gifs.logo}
        resizeMode={strings.contain}
        style={styles.imgStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  imgStyle: {
    width: wp(100),
  },
});

export default Splash;
