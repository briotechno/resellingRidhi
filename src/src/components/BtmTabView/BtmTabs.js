import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import {hp, wp} from '../../helper/utilities';
import {icons} from '../../helper/iconConstant';
import {navigate} from '../../helper/rootNavigation';

import BtmTabItem from './BtmTabItem';
import {routeName} from '../../helper/constants';
import {colors} from '../../helper/colorConstant';
import stringslang from '../../screens/lng/LocalizedStrings';
function BtmTabs({props}) {
  const isActive = index => {
    return index === props?.state?.index;
  };

  const onPressHome = () => {
    navigate(routeName.home);
  };

  const onPressOffers = () => {
    navigate(routeName.offers);
  };

  const onPressNews = () => {
    navigate(routeName.news);
  };

  const onPressProfile = () => {
    navigate(routeName.profile);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <BtmTabItem
        icons={props?.state?.index === 0 ? icons.isHome : icons.home}
        // title={routeName.home}
        title={stringslang.HOME}
        onPress={onPressHome}
        isActive={isActive(0)}
      />
      <BtmTabItem
        icons={props?.state?.index === 1 ? icons.isOffers : icons.offers}
        // title={routeName.offers}
        title={stringslang.OFFERS}
        onPress={onPressOffers}
        isActive={isActive(1)}
      />
      <BtmTabItem
        icons={props?.state?.index === 2 ? icons.isNews : icons.news}
        // title={routeName.news}
        title={stringslang.NEWS}
        onPress={onPressNews}
        isActive={isActive(2)}
      />
      <BtmTabItem
        icons={props?.state?.index === 3 ? icons.setting : icons.isSetting}
        // title={routeName.settings}
        title={stringslang.SETTING}
        onPress={onPressProfile}
        isActive={isActive(3)}
      />
    </SafeAreaView>
  );
}

export default BtmTabs;

const styles = StyleSheet.create({
  mainContainer: {
    elevation: 10,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    paddingBottom: hp(1),
    flexDirection: 'row',
    shadowColor: colors.gray,
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    shadowOffset: {
      height: -4,
      width: 0,
    },
  },
});
