import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colors} from '../../helper/colorConstant';
import {fontSize, hp, wp} from '../../helper/utilities';

const TxtTouchBtn = ({onPress, title, mainContainer, textStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.mainContainer, mainContainer]}
      onPress={onPress}>
      <Text style={[styles.textStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp(1.5),
    marginRight: wp(6.5),
    alignSelf: 'flex-end',
  },
  textStyle: {
    fontWeight: '700',
    fontSize: fontSize(12),
    color: colors.lightBlue,
  },
});

export default TxtTouchBtn;
