import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../../helper/colorConstant';
import {fontSize, hp} from '../../helper/utilities';

const WelcomeMsgView = ({title, description}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textStyle}>{title}</Text>
      <Text style={styles.bottomText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp(4),
    marginBottom: hp(6),
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: fontSize(26),
    color: colors.textColor,
  },
  bottomText: {
    opacity: 0.6,
    fontWeight: '700',
    marginTop: hp(0.25),
    fontSize: fontSize(12),
    color: colors.textColor,
  },
});

export default WelcomeMsgView;
