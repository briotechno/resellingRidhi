import React from 'react';
import MaskedView from '@react-native-community/masked-view';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../helper/colorConstant';
import {fontSize, hitSlop} from '../../helper/utilities';

const GradientText = ({title, onPress}) => {
  return (
    <TouchableOpacity hitSlop={hitSlop(5)} onPress={onPress}>
      <MaskedView maskElement={<Text style={styles.textStyle}>{title}</Text>}>
        <LinearGradient
          colors={[colors.bgBlue, colors.lightBlue]}
          start={{x: 0, y: 0}}
          end={{x: 0.8, y: 0}}>
          <Text
            style={[
              styles.textStyle,
              {
                opacity: 0,
              },
            ]}>
            {title}
          </Text>
        </LinearGradient>
      </MaskedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    fontSize: fontSize(12),
  },
});

export default GradientText;
