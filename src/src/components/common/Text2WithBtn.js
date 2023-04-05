import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../helper/colorConstant';
import {fontSize, hp} from '../../helper/utilities';

const Text2WithBtn = ({desc, btnTitle, onPress, mainContainer}) => {
  return (
    <View style={[styles.mainContainer, mainContainer]}>
      <Text style={styles.textStyle}>{`${desc} `}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={[
            styles.textStyle,
            {
              color: colors.blueTxt,
            },
          ]}>
          {btnTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp(1.75),
    flexDirection: 'row',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: fontSize(14),
    color: 'rgba(31, 61, 77, 0.4)',
  },
});

export default Text2WithBtn;
