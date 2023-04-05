import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {icons} from '../../helper/iconConstant';
import {fontSize, hitSlop, hp, wp} from '../../helper/utilities';
import GradientBtn from '../common/GradientBtn';

const PopOfferItem = ({
  desc,
  title,
  btnTitle,
  topLeftImg,
  likeSource,
  expiryText,
  expiryTime,
  onLikePress,
  onItemPress,
  onClaimPress,
}) => {
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onItemPress}>
      <View style={styles.topMainView}>
        <View style={styles.topLeftImgView}>
          <Image
            source={topLeftImg}
            resizeMode={strings.contain}
            style={styles.topLeftImgStyle}
          />
        </View>
        <View style={styles.topTextView}>
          <Text style={styles.titleText}>{title}</Text>
          {/* <Text style={styles.descText}>{desc}</Text> */}
        </View>
        {/* <TouchableOpacity
          style={styles.topRightBtn}
          hitSlop={hitSlop(10)}
          onPress={onLikePress}>
          <Image
            source={likeSource}
            style={styles.topRightImg}
            resizeMode={strings.contain}
          />
        </TouchableOpacity> */}
      </View>

      <View style={styles.sepratorView} />

      <View style={styles.bottomMainView}>
        <View style={styles.bottomLeftView}>
          {/* <Image
            source={icons.time}
            resizeMode={strings.contain}
            style={styles.bottomLeftImg}
          /> */}
          <Text style={styles.expiryText}>
            {expiryText}
            <Text style={styles.expiryValue}>{expiryTime}</Text>
          </Text>
        </View>
        <GradientBtn
          onPress={onClaimPress}
          title={btnTitle}
          buttonText={styles.gradientText}
          mainContainer={styles.gradientMainView}
          linearGradient={styles.gradientView}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: wp(2.15),
    marginHorizontal: wp(6.5),
    backgroundColor: colors.white,
  },
  topMainView: {
    padding: wp(4.3),
    flexDirection: 'row',
  },
  topLeftImgView: {
    width: wp(8.6),
    height: wp(8.6),
    alignItems: 'center',
    borderRadius: wp(4.3),
    justifyContent: 'center',
    backgroundColor: colors.textInputBg,
  },
  topLeftImgStyle: {
    width: wp(4.3),
    height: wp(4.3),
  },
  topTextView: {
    flex: 1,
    marginHorizontal: wp(4.3),
  },
  titleText: {
    fontWeight: '600',
    fontSize: fontSize(14),
    color: colors.textColor,
  },
  descText: {
    opacity: 0.4,
    fontWeight: '400',
    marginTop: hp(0.6),
    fontSize: fontSize(10),
    color: colors.textColor,
  },
  topRightBtn: {
    alignSelf: 'center',
    marginRight: wp(0.6),
  },
  topRightImg: {
    width: wp(4.8),
    height: wp(4.8),
  },
  sepratorView: {
    height: 1,
    marginBottom: hp(1.35),
    backgroundColor: colors.textInputBg,
  },
  bottomMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(1.5),
    paddingHorizontal: wp(4.3),
    justifyContent: 'space-between',
  },
  bottomLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomLeftImg: {
    width: wp(4.5),
    height: wp(4.5),
  },
  expiryText: {
    opacity: 0.4,
    fontWeight: '400',
    marginLeft: wp(2.7),
    fontSize: fontSize(10),
    color: colors.textColor,
  },
  expiryValue: {
    fontWeight: '700',
    fontSize: fontSize(10),
    color: colors.textColor,
  },
  gradientText: {
    fontSize: fontSize(10),
  },
  gradientMainView: {
    width: wp(19),
    marginHorizontal: 0,
    marginRight: wp(1.1),
  },
  gradientView: {
    height: hp(3),
    borderRadius: wp(8),
  },
});

export default PopOfferItem;
