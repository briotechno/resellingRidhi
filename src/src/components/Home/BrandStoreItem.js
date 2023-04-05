import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {wp} from '../../helper/utilities';

const BrandStoreItem = ({source, onPress}) => {
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress}>
      <Image
        source={source}
        style={styles.imageStyle}
        resizeMode={strings.contain}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(26.7),
    height: wp(10.7),
    alignItems: 'center',
    borderRadius: wp(1.1),
    justifyContent: 'center',
    backgroundColor: colors.textInputBg,
  },
  imageStyle: {
    width: wp(24.7),
    height: wp(8.3),
  },
});

export default BrandStoreItem;
