import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {strings} from '../../helper/constants';
import {hitSlop, hp, wp} from '../../helper/utilities';

const Header = ({
  leftSource,
  right1Source,
  right2Source,
  onSettingPress,
  onNotificationPress,
}) => {
  return (
    <View style={styles.mainContainer}>
      <Image source={leftSource} style={styles.leftIconStyle} />
      <View style={styles.rightMainView}>
        <TouchableOpacity hitSlop={hitSlop(10)} onPress={onNotificationPress}>
          <Image
            source={right1Source}
            style={styles.rightIconStyle}
            resizeMode={strings.contain}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rightCenterView}
          hitSlop={hitSlop(10)}
          onPress={onSettingPress}>
          <Image
            source={right2Source}
            style={styles.rightIconStyle}
            resizeMode={strings.contain}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(6.5),
    justifyContent: 'space-between',
  },
  leftIconStyle: {
    width: wp(40),
    height: wp(11),
  },
  rightMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIconStyle: {
    width: wp(4.8),
    height: wp(4.8),
  },
  rightCenterView: {
    marginLeft: wp(4.6),
  },
});

export default Header;
