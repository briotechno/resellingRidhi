import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {wp} from '../../helper/utilities';

const BrandSelectionItem = ({source, onPress, mainContainer}) => {
  return (
    <TouchableOpacity
      style={[styles.mainContainer, mainContainer]}
      onPress={onPress}>
      <Image
        source={source}
        style={styles.imgStyle}
        resizeMode={strings.contain}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(27.4),
    height: wp(27.4),
    borderWidth: wp(0.4),
    alignItems: 'center',
    borderRadius: wp(2.15),
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderColor: colors.brandBorder,
  },
  imgStyle: {
    width: wp(20),
    height: wp(18),
  },
});

export default BrandSelectionItem;
