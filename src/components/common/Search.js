import React from 'react';
import {StyleSheet, View, Image, TextInput} from 'react-native';

import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {fontSize, hp, isIos, wp} from '../../helper/utilities';
import stringslang from '../../screens/lng/LocalizedStrings';
function Search({value, onChangeText, leftImgSource}) {
  return (
    <View style={styles.sectionStyle}>
      <TextInput
        value={value}
        autoCorrect={false}
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={onChangeText}
        placeholderTextColor={colors.gray}
        placeholder={stringslang.SEARCH}
      />
      <Image source={leftImgSource} style={styles.searchImg} />
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  sectionStyle: {
    width: wp(87.2),
    marginTop: hp(1),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: wp(18.6),
    paddingHorizontal: wp(4.3),
    backgroundColor: colors.textInputBg,
    paddingVertical: isIos ? hp(1.5) : 0,
  },
  searchImg: {
    width: wp(4),
    height: wp(4),
    alignSelf: 'center',
    tintColor: colors.gray,
  },
  textInput: {
    flex: 1,
    color: colors.black,
    // paddingLeft: wp(2.7),
    fontSize: fontSize(16),
  },
});
