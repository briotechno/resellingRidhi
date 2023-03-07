import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {fontSize, hp, wp} from '../../helper/utilities';

const SepratorOrView = ({mainContainer}) => {
  return (
    <View style={[styles.mainContainer, mainContainer]}>
      <View style={styles.linesView} />
      <Text style={styles.textStyle}>{strings.or}</Text>
      <View style={styles.linesView} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginVertical: hp(2.8),
    marginHorizontal: wp(6.5),
  },
  linesView: {
    flex: 1,
    height: wp(0.3),
    alignSelf: 'center',
    backgroundColor: 'rgba(31, 61, 77, 0.2)',
  },
  textStyle: {
    opacity: 0.5,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: fontSize(14),
    color: colors.textColor,
    paddingHorizontal: wp(5.85),
  },
});

export default SepratorOrView;
