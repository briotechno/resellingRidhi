import React from 'react';
import {
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {fontSize, hp, wp} from '../../helper/utilities';

function BtmTabItem({icons, title, onPress, isActive}) {
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress}>
      <Image
        source={icons}
        style={styles.imageStyle}
        resizeMode={strings.contain}
      />
      <Text
        style={[
          styles.titleStyle,
          {
            opacity: isActive ? 1 : 0.4,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default BtmTabItem;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: hp(1.2),
    alignItems: 'center',
  },
  imageStyle: {
    width: wp(4.5),
    height: wp(4.5),
  },
  titleStyle: {
    fontWeight: '500',
    marginTop: hp(0.4),
    fontSize: fontSize(12),
    color: colors.textColor,
  },
});
