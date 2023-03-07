import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {icons} from '../../helper/iconConstant';
import {fontSize, hp, wp} from '../../helper/utilities';
import stringslang from '../../screens/lng/LocalizedStrings';
import GradientBtn from '../common/GradientBtn';

const BrandsItem = ({
  price,
  title,
  pushType,
  btnTitle,
  discount,
  topLeftImg,
  expiryText,
  expiryTime,
  onClaimPress,
  onItemPress,
  discountVisible,
}) => {
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onItemPress}>
      <View style={styles.topLeftImgView}>
        <Image
          source={topLeftImg}
          resizeMode={strings.contain}
          style={styles.topLeftImgStyle}
        />
      </View>
      <View style={styles.topTextView}>
        <Text
          style={[
            styles.titleText,
            {
              fontWeight: '800',
              marginRight: wp(2),
            },
          ]}>
          {pushType}
          <Text style={styles.titleText}>{title}</Text>
        </Text>
        <View style={styles.priceMainView}>
          <Text style={styles.priceText}>{stringslang.OFFER_PRICE}</Text>
          <Text style={styles.priceVal}>{price}</Text>
        </View>
        {discountVisible && (
          <View style={styles.priceMainView}>
            <Text style={styles.priceText}>{stringslang.DISCOUNTTAG}</Text>
            <Text
              style={[
                styles.priceVal,
                {
                  marginLeft: wp(0.6),
                },
              ]}>
              {`${discount}%`}
            </Text>
          </View>
        )}
        <View style={styles.sepratorView} />

        <View style={styles.bottomMainView}>
          <View style={styles.bottomLeftView}>
            {/* <Image
              source={icons.time}
              resizeMode={strings.contain}
              style={styles.bottomLeftImg}
            />
            <Text style={styles.expiryText}>
              {expiryText}
              <Text style={styles.expiryValue}>{expiryTime}</Text>
            </Text> */}
            {/* <Text style={styles.pushTypeText}>{pushType}</Text> */}
            {/* {discountVisible && (
              <View style={styles.priceMainView}>
                <Text style={styles.priceText}>{stringslang.DISCOUNT}</Text>
                <Text
                  style={[
                    styles.priceVal,
                    {
                      marginLeft: wp(0.5),
                    },
                  ]}
                >
                  {`${discount}%`}
                </Text>
              </View>
            )} */}
          </View>
          <GradientBtn
            onPress={onClaimPress}
            title={btnTitle}
            buttonText={styles.gradientText}
            mainContainer={styles.gradientMainView}
            linearGradient={styles.gradientView}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    borderRadius: wp(2.15),
    paddingVertical: wp(3.7),
    marginHorizontal: wp(6.5),
    backgroundColor: colors.white,
  },
  topLeftImgView: {
    width: wp(23),
    height: wp(21.5),
    alignItems: 'center',
    borderRadius: wp(1.1),
    marginHorizontal: wp(4),
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  topLeftImgStyle: {
    width: wp(24.8),
    height: wp(23.5),
  },
  topTextView: {
    flex: 1,
  },
  titleText: {
    fontWeight: '600',
    fontSize: fontSize(14),
    color: colors.textColor,
  },
  priceMainView: {
    marginTop: hp(0.6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    opacity: 0.4,
    fontWeight: '400',
    fontSize: fontSize(12),
    color: colors.textColor,
  },
  priceVal: {
    fontWeight: '700',
    marginLeft: wp(2.4),
    color: colors.parrot,
    fontSize: fontSize(12),
  },
  sepratorView: {
    height: 1,
    marginVertical: hp(1.35),
    backgroundColor: colors.textInputBg,
  },
  bottomMainView: {
    marginRight: wp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '400',
    marginLeft: wp(1.1),
    fontSize: fontSize(10),
    color: colors.textOpacity,
  },
  pushTypeText: {
    fontWeight: '500',
    marginLeft: wp(1.1),
    fontSize: fontSize(12),
    color: colors.black,
  },
  expiryValue: {
    fontWeight: '600',
    color: colors.red,
    fontSize: fontSize(10),
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

export default BrandsItem;
