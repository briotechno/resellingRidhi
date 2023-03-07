import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {images} from '../../helper/iconConstant';
import {fontSize, hp, statusBar, wp} from '../../helper/utilities';
import stringslang from '../lng/LocalizedStrings';
const NoInternet = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerMainView}>
        <Image
          source={images.noInternet}
          resizeMode={strings.contain}
          style={styles.imgStyle}
        />
        <Text style={styles.headerTitle}>{stringslang.NO_INTERNET}</Text>
        <Text style={styles.titleText}>{stringslang.NO_INTERNET_TEXT}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerMainView: {
    flex: 1,
    alignItems: 'center',
    marginTop: statusBar,
    justifyContent: 'center',
    backgroundColor: colors.textInputBg,
  },
  imgStyle: {
    width: wp(74.9),
    height: wp(74.9),
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: fontSize(24),
    color: colors.lightBTxt,
  },
  titleText: {
    fontWeight: '400',
    marginTop: hp(0.3),
    fontSize: fontSize(14),
    color: colors.lightBTxt,
  },
});

export default NoInternet;
