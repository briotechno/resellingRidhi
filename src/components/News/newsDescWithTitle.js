import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {colors} from '../../helper/colorConstant';
import {fontSize, hp} from '../../helper/utilities';

const NewsDescWithTitle = ({title, desc}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descText}>{desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // marginTop: hp(3.8),
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: fontSize(20),
    color: colors.textColor,
  },
  descText: {
    marginTop: hp(1),
    fontWeight: '400',
    fontSize: fontSize(17),
    color: colors.grayText,
    // lineHeight:hp(2.7)
  },
});

export default NewsDescWithTitle;
