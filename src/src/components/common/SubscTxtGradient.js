import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../helper/colorConstant';
import {fontSize, hp, wp} from '../../helper/utilities';

const SubscTxtGradient = ({symbol, price, slash, period}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[colors.bgBlue, colors.lightBlue]}
      style={styles.mainContainer}>
      <Text style={styles.dollerSymbol}>{symbol}</Text>
      <Text style={styles.priceText}>{price}</Text>
      <Text style={styles.dollerSymbol}>{slash}</Text>
      <Text style={styles.monthText}>{period}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingRight: wp(8),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: wp(26.6),
    paddingVertical: hp(3),
    paddingLeft: wp(11.75),
    marginVertical: hp(7.9),
    justifyContent: 'center',
  },
  dollerSymbol: {
    bottom: hp(0.5),
    fontWeight: '700',
    color: colors.white,
    alignSelf: 'flex-end',
    fontSize: fontSize(20),
  },
  priceText: {
    fontWeight: '700',
    color: colors.white,
    fontSize: fontSize(42),
  },
  monthText: {
    bottom: hp(0.5),
    fontWeight: '500',
    color: colors.white,
    alignSelf: 'flex-end',
    fontSize: fontSize(18),
  },
});

export default SubscTxtGradient;
