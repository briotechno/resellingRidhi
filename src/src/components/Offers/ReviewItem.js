import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../helper/colorConstant';
import {fontSize, hp, wp} from '../../helper/utilities';

const ReviewItem = ({emoji, counter, isSelected, onPress, mainContainer}) => {
  return (
    <TouchableOpacity
      style={[
        styles.mainContainer,
        {
          borderColor: isSelected
            ? 'rgba(31, 61, 77, 0.5)'
            : colors.reviewUnSelect,
        },
        mainContainer,
      ]}
      onPress={onPress}>
      <Text style={styles.imojiText}>{emoji}</Text>
      <Text
        style={[
          styles.counterText,
          {
            fontWeight: isSelected ? '700' : '300',
          },
        ]}>
        {counter}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(20),
    height: hp(4),
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: wp(0.4),
    borderRadius: wp(11.75),
    justifyContent: 'center',
    borderColor: 'rgba(31, 61, 77, 0.5)',
  },
  imojiText: {
    fontSize: fontSize(14),
  },
  counterText: {
    fontWeight: '700',
    marginLeft: wp(2.15),
    fontSize: fontSize(12),
    color: colors.textColor,
  },
});

export default ReviewItem;
