import React from 'react';
import {StyleSheet, ImageBackground, Text, TouchableOpacity} from 'react-native';

import {colors} from '../../helper/colorConstant';
import {fontSize, hp, wp} from '../../helper/utilities';

const HighlightItem = ({source, title,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <ImageBackground
      blurRadius={1}
      source={source}
      style={styles.mainContainer}
      imageStyle={styles.imageStyle}>
      <Text style={styles.titleText}>{title}</Text>
    </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: hp(8),
    justifyContent: 'center',
    shadowColor: colors.gray,
    marginHorizontal: wp(6.5),
    paddingHorizontal: wp(3.5),
  },
  imageStyle: {
    borderRadius: wp(1),
  },
  titleText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: fontSize(14),
  },
});

export default HighlightItem;
