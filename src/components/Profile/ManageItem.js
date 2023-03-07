import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';

import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {fontSize, hp, wp} from '../../helper/utilities';

const ManageItem = ({source, title, onPress, rightSource, mainContainer}) => {
  return (
    <TouchableOpacity
      style={[styles.mainContainer, mainContainer]}
      onPress={onPress}>
      <View style={styles.leftMainView}>
        {/* <Image
          source={source}
          style={styles.imgStyle}
          resizeMode={strings.contain}
        /> */}
        {source}
        <Text style={styles.textStyle}>{title}</Text>
      </View>
      <Image
        source={rightSource}
        style={[
          styles.imgStyle,
          {
            width: wp(3),
          },
        ]}
        resizeMode={strings.contain}
      />
    </TouchableOpacity>
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
  leftMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgStyle: {
    width: wp(4.5),
    height: wp(4.5),
  },
  textStyle: {
    marginLeft: wp(4),
    fontWeight: '500',
    fontSize: fontSize(14),
    color: colors.textColor,
  },
});

export default ManageItem;
