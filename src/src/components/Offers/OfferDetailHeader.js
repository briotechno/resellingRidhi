import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { colors } from '../../helper/colorConstant';
import { strings } from '../../helper/constants';
import { icons } from '../../helper/iconConstant';
import { goBack } from '../../helper/rootNavigation';
import { fontSize, hitSlop, hp, wp } from '../../helper/utilities';
import BtnIconText from '../Profile/BtnIconText';

const OfferDetailHeader = ({ title, onPress, source }) => {
  return (
    <View style={styles.mainContainer}>
      <BtnIconText
        title={title}
        source={icons.backFat}
        onPress={() => goBack()}
        textStyle={{ marginLeft: wp(4.3), fontSize: 15 }}
      />
      <TouchableOpacity
        hitSlop={hitSlop(10)}
        onPress={onPress}
        style={{ marginRight: wp(1.6) }}>
        <Image
          source={source}
          resizeMode={strings.contain}
          style={styles.imgStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2.1),
    paddingHorizontal: wp(4.3),
    backgroundColor: colors.bgBlue,
    justifyContent: 'space-between',
  },
  textStyle: {
    fontWeight: '600',
    color: colors.white,
    fontSize: fontSize(10),
  },
  imgStyle: {
    width: wp(3.2),
    height: wp(3.2),
  },
});

export default OfferDetailHeader;
