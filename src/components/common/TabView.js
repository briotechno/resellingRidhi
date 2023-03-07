import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colors} from '../../helper/colorConstant';
import {fontSize, hp, wp} from '../../helper/utilities';

const TabView = ({
  activeIdx,
  tab1Title,
  tab2Title,
  onTab1Press,
  onTab2Press,
}) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={[
          styles.innerView,
          {
            backgroundColor: activeIdx === 0 ? colors.white : colors.tabBg,
          },
        ]}
        onPress={onTab1Press}>
        <Text
          style={[
            styles.textStyle,
            {
              color: activeIdx === 0 ? colors.textColor : colors.inactiveText,
            },
          ]}>
          {tab1Title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.innerView,
          {
            backgroundColor: activeIdx === 1 ? colors.white : colors.tabBg,
          },
        ]}
        onPress={onTab2Press}>
        <Text
          style={[
            styles.textStyle,
            {
              color: activeIdx === 1 ? colors.textColor : colors.inactiveText,
            },
          ]}>
          {tab2Title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    borderRadius: wp(1.1),
    backgroundColor: colors.tabBg,
  },
  innerView: {
    alignItems: 'center',
    borderRadius: wp(1.1),
    justifyContent: 'center',
    paddingVertical: hp(0.75),
    paddingHorizontal: wp(5.35),
  },
  textStyle: {
    fontWeight: '500',
    fontSize: fontSize(14),
  },
});

export default TabView;
