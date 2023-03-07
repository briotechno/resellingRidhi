import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../../helper/colorConstant';
import {fontSize, hp, wp} from '../../helper/utilities';

const GradientBtn = ({
  title,
  loading,
  onPress,
  disabled,
  buttonText,
  mainContainer,
  linearGradient,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.mainContainer, mainContainer]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colors.bgBlue, colors.lightBlue]}
        style={[styles.linearGradient, linearGradient]}>
        {loading ? (
          <ActivityIndicator size={'small'} color={colors.white} />
        ) : (
          <Text style={[styles.buttonText, buttonText]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(87),
    marginHorizontal: wp(6.5),
  },
  linearGradient: {
    height: hp(5.9),
    alignItems: 'center',
    borderRadius: wp(2.15),
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: fontSize(14),
  },
});

export default GradientBtn;
