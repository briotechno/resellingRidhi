import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {colors} from '../../helper/colorConstant';
import {fontSize, hp, wp} from '../../helper/utilities';

const MoreDetailsItem = ({title, chidren, mainContainer}) => {
  return (
    <View style={[styles.mainContainer, mainContainer]}>
      <Text style={styles.textStyle}>{title}</Text>
      <View style={{alignItems: 'flex-end', flex: 1}}>{chidren}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(1.6),
    borderBottomWidth: wp(0.3),
    justifyContent: 'space-between',
    borderBottomColor: colors.textInputBg,
  },
  textStyle: {
    flex: 2,
    fontWeight: '500',
    fontSize: fontSize(14),
    color: colors.textColor,
  },
});

export default MoreDetailsItem;
