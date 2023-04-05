import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';

import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {fontSize, hp, wp} from '../../helper/utilities';

const BtnWithIcon = ({source, title, onPress, mainContainer}) => {
  return (
    <TouchableOpacity
      style={[styles.mainContainer, mainContainer]}
      onPress={onPress}>
      <Image
        source={source}
        resizeMode={strings.contain}
        style={styles.imageStyle}
      />
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(87),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(2.15),
    justifyContent: 'center',
    paddingVertical: hp(1.6),
    marginHorizontal: wp(6.5),
    backgroundColor: colors.blackBg,
  },
  imageStyle: {
    width: wp(5.5),
    height: wp(5.5),
  },
  textStyle: {
    marginLeft: wp(4),
    fontWeight: 'bold',
    color: colors.white,
    fontSize: fontSize(14),
  },
});

export default BtnWithIcon;
