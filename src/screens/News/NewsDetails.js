import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {
  ReviewItem,
  GradientBtn,
  MoreDetailsItem,
  OfferDetailHeader,
  PreviewImgModal,
} from '../../components';
import {strings} from '../../helper/constants';
import {icons} from '../../helper/iconConstant';
import {colors} from '../../helper/colorConstant';
import {fontSize, hp, statusBar, wp} from '../../helper/utilities';
import stringslang from '../lng/LocalizedStrings';
import NewsDescWithTitle from '../../components/News/newsDescWithTitle';
import moment from 'moment';

const newsDetails = ({route}) => {
  const [isPreview, setIsPreview] = useState(false);
  const {item} = route?.params;
  console.log('item:::', item);

  const htmlStr = item.news_description;

  const newStr = htmlStr.replace(/(<([^>]+)>)/gi, '');
  const secondRegEx = /((&nbsp;))*/gim;
  const result = newStr.replace(secondRegEx, '');

  const onImgPress = () => {
    setIsPreview(true);
  };

  const onModalClose = () => {
    setIsPreview(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <OfferDetailHeader title={stringslang.NEWS_TITLE} onPress={() => {}} />

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imageViewStyle} onPress={onImgPress}>
          <Image
            style={styles.imageStyle}
            resizeMode={strings.cover}
            source={item?.news_img ? {uri: item?.news_img} : null}
          />
        </TouchableOpacity>

        <View style={styles.moreDetailMainView}>
          <Text style={styles.updatedPriceText}>{`${stringslang.UPLOAD_ON}: ${moment(
            item.created_at,
          ).format('DD/MM/YYYY hh:mm A')}`}</Text>
          <NewsDescWithTitle title={item?.news_name} desc={result} />
          <View style={{height: hp(2.85)}} />
        </View>
     
      </ScrollView>
      <GradientBtn
          title={stringslang.VISITLINK}
          onPress={() => {
            if (item?.news_link) {
              Linking.openURL(item?.news_link);
            }
          }}
          mainContainer={{marginHorizontal: 0, width: wp(100)}}
          linearGradient={{borderRadius: 0, height: hp(7.35)}}
        />
      <PreviewImgModal
        isVisible={isPreview}
        imageSource={item?.news_img ? {uri: item?.news_img} : null}
        onClosePress={onModalClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: statusBar,
    backgroundColor: colors.white,
  },
  imageViewStyle: {
    width: wp(100),
    height: hp(27),
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  imageStyle: {
    width: wp(60),
    height: hp(26.5),
    backgroundColor: colors.white,
  },

  moreDetailMainView: {
    flex: 1,
    paddingHorizontal: wp(6),
    backgroundColor: colors.white,
  },

  updatedPriceText: {
    textAlign: 'right',
    paddingTop: hp(1.2),
    paddingBottom: hp(1.7),
    fontSize: fontSize(14),
    color: colors.grayText,
  },
});

export default newsDetails;
