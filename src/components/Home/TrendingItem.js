import React from 'react';
import {StyleSheet, ImageBackground, Text, TouchableOpacity} from 'react-native';

import {colors} from '../../helper/colorConstant';
import {fontSize, hp, wp} from '../../helper/utilities';

const TrendingItem = ({bgSource, title, coupon,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <ImageBackground
      style={styles.mainContainer}
      // blurRadius={6}
      imageStyle={styles.bgImgStyle}
      source={bgSource}>
      <Text style={styles.titleTextStyle}>{title}</Text>
      <Text style={styles.couponText}>{coupon}</Text>
    </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    elevation: 10,
    shadowRadius: 5,
    width: wp(66.5),
    height: wp(37.5),
    shadowOpacity: 0.5,
    paddingVertical: wp(2),
    shadowColor: colors.gray,
    justifyContent: 'flex-end',
    paddingHorizontal: wp(3.5),
    shadowOffset: {height: 3, width: 3},
  },
  bgImgStyle: {
    borderRadius: wp(1.6),
  },
  titleTextStyle: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: fontSize(10),
  },
  couponText: {
    marginTop: hp(0.3),
    fontWeight: 'bold',
    color: colors.white,
    fontSize: fontSize(12),
  },
});

export default TrendingItem;
