import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {fontSize, hp, wp} from '../../helper/utilities';

const NoNotification = ({source, title}) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={source}
        style={styles.imgStyle}
        resizeMode={strings.contain}
      />
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.textInputBg,
  },
  imgStyle: {
    width: wp(64.8),
    height: wp(64.8),
  },
  textStyle: {
    fontWeight: '600',
    marginTop: hp(1.5),
    fontSize: fontSize(24),
    color: colors.lightBTxt,
  },
});

export default NoNotification;
