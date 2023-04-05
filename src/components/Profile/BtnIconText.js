import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {fontSize, hitSlop, wp} from '../../helper/utilities';

const BtnIconText = ({
  onPress,
  source,
  title,
  textStyle,
  iconStyle,
  mainContainer,
  Settingtitle,
  onSettingPress,
}) => {
  return (
    <View style={[styles.mainContainer, mainContainer]}>
      <View style={styles.rightMainView}>
        <TouchableOpacity hitSlop={hitSlop(10)} onPress={onPress}>
          <Image
            source={source}
            style={[styles.iconStyle, iconStyle]}
            resizeMode={strings.contain}
          />
        </TouchableOpacity>
        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
      </View>
      <View style={styles.rightMainView}>
        <TouchableOpacity hitSlop={hitSlop(10)} onPress={onSettingPress}>
          <Text style={[styles.textStyle, textStyle]}>{Settingtitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStyle: {
    width: wp(4),
    height: wp(4),
  },
  textStyle: {
    fontWeight: 'bold',
    marginLeft: wp(2.4),
    color: colors.white,
    fontSize: fontSize(12),
  },
  rightMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BtnIconText;
