import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {colors} from '../../helper/colorConstant';
import {fontSize} from '../../helper/utilities';
import GradientText from '../common/GradientText';

const GradientTextTabItem = ({title, onPress, isSelected}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={[
          styles.textStyle,
          {
            color: isSelected ? colors.bgBlue : colors.textColor,
            opacity: isSelected ? 1 : 0.6,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
  //   return isSelected ? (
  //     <GradientText title={title} onPress={onPress} />
  //   ) : (
  //     <TouchableOpacity onPress={onPress}>
  //       <Text
  //         style={[
  //           styles.textStyle,
  //           {
  //             color: isSelected ? '#2C398B' : colors.textColor,
  //             opacity: isSelected ? 1 : 0.6,
  //           },
  //         ]}>
  //         {title}
  //       </Text>
  //     </TouchableOpacity>
  //   );
};

const styles = StyleSheet.create({
  textStyle: {
    opacity: 0.6,
    fontWeight: 'bold',
    fontSize: fontSize(15),
    color: colors.textColor,
  },
});

export default GradientTextTabItem;
