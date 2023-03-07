import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {fontSize, hp, wp} from '../../helper/utilities';

const DetailsItem = ({source, title}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerView}>
        <Image
          source={source}
          resizeMode={strings.contain}
          style={styles.imageStyle}
        />
      </View>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp(2.1),
    flexDirection: 'row',
    marginHorizontal: wp(6.5),
  },
  innerView: {
    width: wp(26.7),
    height: wp(10.7),
    alignItems: 'center',
    borderRadius: wp(1.1),
    justifyContent: 'center',
    backgroundColor: colors.textInputBg,
  },
  imageStyle: {
    height: wp(4.3),
    width: wp(14.4),
  },
  textStyle: {
    flex: 1,
    fontWeight: '700',
    marginLeft: wp(4.3),
    color: colors.white,
    fontSize: fontSize(16),
  },
});

export default DetailsItem;
