import React from 'react';
import {StyleSheet} from 'react-native';

import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../helper/colorConstant';

import {fontSize, wp} from '../../helper/utilities';

const ScrollableTabs = ({
  setIndex,
  labelStyle,
  renderScene,
  mainContainer,
  navigationState,
}) => {
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.bgBlue}}
      style={[mainContainer, {backgroundColor: colors.white}]}
      labelStyle={[styles.labelStyle, labelStyle]}
      activeColor={colors.textColor}
      inactiveColor={colors.grayText}
    />
  );

  return (
    <TabView
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      initialLayout={styles.mainContainer}
      navigationState={navigationState}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: wp(100),
  },
  labelStyle: {
    fontWeight: '700',
    textTransform: 'none',
    fontSize: fontSize(12),
  },
});

export default ScrollableTabs;
