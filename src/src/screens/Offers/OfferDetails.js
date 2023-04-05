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

import moment from 'moment';
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
import {storageKey} from '../../helper/constants';
import {getAsyncStorage} from '../../helper/globalFunction';
import {fontSize, hp, statusBar, wp} from '../../helper/utilities';
import {getEmojiRate, getOfferList} from '../../actions/OfferAction';
import stringslang from '../lng/LocalizedStrings';
import Share from 'react-native-share';

const OfferDetails = ({route}) => {
  const {item, brandName, shopName, activeIdx} = route?.params;
  const dispatch = useDispatch();

  const [isPreview, setIsPreview] = useState(false);
  const [like, setLike] = useState(false);
  const [unlike, setunLike] = useState(false);
  const [rocket, setRocket] = useState(false);
  const [fire, setFire] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {offerList} = useSelector(state => state.offer);

  // useEffect(() => {
  //   console.log("Offer List called!!!");
  //   console.log("Offer List called!!!111 ::--", offerList);
  //   if (offerList?.length > 0) {
  //     offerList?.map((offerItem, index) => {
  //       if (offerItem?.id === item?.id) {
  //         setSelectedItem(offerItem);
  //       }
  //     });
  //   }
  // }, [offerList, item]);

  useEffect(() => {
    console.log('iteeemmm', item);
    if (item) {
      setSelectedItem(item);
    }
  }, [item]);

  const ClickEmoji = async type => {
    console.log('selectedItem ::--', selectedItem);
    if (type === 'like') {
      setLike(!like);
      EmojiRate(type, like);
    } else if (type === 'unlike') {
      setunLike(!unlike);
      EmojiRate(type, unlike);
    } else if (type === 'rocket') {
      setRocket(!rocket);
      EmojiRate(type, rocket);
    } else if (type === 'fire') {
      setFire(!fire);
      EmojiRate(type, fire);
    } else {
    }
  };

  useEffect(() => {
    if (selectedItem && selectedItem?.getemojicheck) {
      setLike(
        (selectedItem?.getemojicheck &&
          selectedItem?.getemojicheck?.is_like === '1') ||
          false,
      );
      setunLike(
        (selectedItem?.getemojicheck &&
          selectedItem?.getemojicheck?.is_unlike === '1') ||
          false,
      );
      setRocket(
        (selectedItem?.getemojicheck &&
          selectedItem?.getemojicheck?.is_rocket === '1') ||
          false,
      );
      setFire(
        (selectedItem?.getemojicheck &&
          selectedItem?.getemojicheck?.is_fire === '1') ||
          false,
      );
    }
  }, [selectedItem]);

  const getOfferListAPICall = userDetail => {
    const formdata = new FormData();
    formdata.append('user_id', userDetail?.user_id);
    {
      activeIdx === 0
        ? formdata.append('brand_name', brandName)
        : formdata.append('shop_name', shopName);
    }

    const request = {
      data: formdata,
      onSuccess: res => {
        res?.map((offerItem, index) => {
          console.log('offerItem', offerItem);
          if (offerItem?.id === item?.id) {
            setSelectedItem(offerItem);
          }
        });
      },
      onFail: () => {},
    };
    dispatch(getOfferList(request));
  };

  const EmojiRate = async (type, val) => {
    let userDetail = await getAsyncStorage(storageKey.userDetails);
    const formdata = new FormData();
    formdata.append('offer_id', selectedItem?.id);
    formdata.append('user_id', userDetail?.user_id);
    type === 'like' && !val
      ? formdata.append('is_like', '1')
      : formdata.append('is_like', '2');
    type === 'unlike' && !val
      ? formdata.append('is_unlike', '1')
      : formdata.append('is_unlike', '2');
    type === 'rocket' && !val
      ? formdata.append('is_rocket', '1')
      : formdata.append('is_rocket', '2');
    type === 'fire' && !val
      ? formdata.append('is_fire', '1')
      : formdata.append('is_fire', '2');
    const request = {
      data: formdata,
      onSuccess: async res => {
        if (res) {
          getOfferListAPICall(userDetail);
        }
      },
      onFail: () => {},
    };
    dispatch(getEmojiRate(request));
  };

  const onImgPress = () => {
    setIsPreview(true);
  };

  const onModalClose = () => {
    setIsPreview(false);
  };

  function onShare() {
    let url = `${'Reselling.de'}  ${selectedItem?.affiliate_link}`;
    Share.open({message: `${url}`})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <OfferDetailHeader
        source={icons.share}
        title={stringslang.OFFER_DETAILS}
        onPress={() => onShare()}
      />

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imageViewStyle} onPress={onImgPress}>
          <Image
            style={styles.imageStyle}
            resizeMode={strings.contain}
            source={
              selectedItem?.image_url ? {uri: selectedItem?.image_url} : null
            }
          />
        </TouchableOpacity>
        <Image
          style={styles.imageBrandStyle}
          resizeMode={strings.contain}
          source={
            selectedItem?.getshop === null
              ? {uri: selectedItem?.getbrand?.brand_img}
              : {uri: selectedItem?.getshop?.shop_img}
          }
        />
        <View style={styles.moreDetailMainView}>
          <View style={{height: hp(2.5)}} />
          {/* <Text style={styles.moreDetailTitle}>{selectedItem?.title}</Text> */}
          <Text
            style={[
              styles.moreDetailTitle,
              {
                fontWeight: '800',
              },
            ]}>
            {`${selectedItem?.push_type?.toUpperCase()}! - `}
            <Text style={styles.moreDetailTitle}>{selectedItem?.title}</Text>
          </Text>
          <MoreDetailsItem
            title={stringslang.NEW_PRICE}
            chidren={
              <Text
                style={[
                  styles.updatedPriceText,
                  {
                    color: colors.parrot,
                  },
                ]}>
                {`${Number(selectedItem?.price).toFixed(2)}€ `}
                <Text
                  style={[
                    styles.mainPriceText,
                    {
                      textDecorationLine: 'line-through',
                    },
                  ]}>{`${Number(selectedItem?.old_price).toFixed(2)}€`}</Text>
              </Text>
            }
            mainContainer={{
              paddingTop: hp(2),
              borderTopWidth: wp(0.3),
              borderTopColor: colors.textInputBg,
            }}
          />
          <MoreDetailsItem
            title={stringslang.DISCOUNT}
            chidren={
              <Text
                style={[
                  styles.updatedPriceText,
                  {
                    color: colors.redTxt,
                  },
                ]}>
                {`${selectedItem?.discount_percent}% `}
                <Text style={styles.mainPriceText}>{`${Number(
                  selectedItem?.discount_price,
                ).toFixed(2)}€`}</Text>
              </Text>
            }
          />
          <MoreDetailsItem
            title={stringslang.SHIPPING_CHARGES}
            chidren={
              <Text style={styles.updatedPriceText}>{`${Number(
                selectedItem?.shipping,
              ).toFixed(2)}€`}</Text>
            }
          />
          <MoreDetailsItem
            title={stringslang.EBAY_AVERAGE_PRICE}
            chidren={
              <Text style={[styles.updatedPriceText, {color: colors.blueTxt}]}>
                {`${Number(selectedItem?.ebay_price).toFixed(2)}€`}
              </Text>
            }
          />
          <MoreDetailsItem
            title={stringslang.EBAY_TOP_PRICE}
            chidren={
              <Text style={[styles.updatedPriceText, {color: colors.blueTxt}]}>
                {`${Number(selectedItem?.ebay_topprice).toFixed(2)}€`}
              </Text>
            }
          />
          <MoreDetailsItem
            title={stringslang.EBAY_SALES}
            chidren={
              <Text style={[styles.updatedPriceText, {color: colors.blueTxt}]}>
                {`${selectedItem?.ebay_count}`}
              </Text>
            }
          />
          <MoreDetailsItem
            title={stringslang.MANUFACURE_PRICE}
            chidren={
              <Text style={styles.updatedPriceText}>
                {selectedItem?.uvp !== '0'
                  ? `${Number(selectedItem?.uvp).toFixed(2)}€`
                  : `-`}
              </Text>
            }
          />
          <MoreDetailsItem
            title={stringslang.SELLER}
            chidren={
              <Text style={styles.updatedPriceText}>
                {selectedItem?.amazon_seller}
              </Text>
            }
          />
          <Text style={styles.dateText}>
            {moment(selectedItem?.created_at).format('DD/MM/YYYY - hh:mm A')}
          </Text>
          <View style={styles.emojiMainView}>
            <ReviewItem
              emoji={'👍🏻'}
              counter={selectedItem?.like_count}
              isSelected={
                selectedItem?.getemojicheck &&
                selectedItem?.getemojicheck?.is_like === '1'
              }
              mainContainer={{marginRight: wp(2.15)}}
              onPress={() => ClickEmoji('like')}
            />
            <ReviewItem
              emoji={'👎🏻'}
              counter={selectedItem?.unlike_count}
              isSelected={
                selectedItem?.getemojicheck &&
                selectedItem?.getemojicheck?.is_unlike === '1'
              }
              mainContainer={{marginRight: wp(2.15)}}
              onPress={() => ClickEmoji('unlike')}
            />
            <ReviewItem
              emoji={'🚀'}
              counter={selectedItem?.rocket_count}
              isSelected={
                selectedItem?.getemojicheck &&
                selectedItem?.getemojicheck?.is_rocket === '1'
              }
              mainContainer={{marginRight: wp(2.15)}}
              onPress={() => ClickEmoji('rocket')}
            />
            <ReviewItem
              emoji={'🔥'}
              counter={selectedItem?.fire_count}
              isSelected={
                selectedItem?.getemojicheck &&
                selectedItem?.getemojicheck?.is_fire === '1'
              }
              onPress={() => ClickEmoji('fire')}
            />
          </View>
          <View style={{height: hp(2.85)}} />
        </View>
      </ScrollView>

      <GradientBtn
        title={stringslang.GOTO + shopName}
        onPress={() => {
          console.log(
            'selectedItem?.affiliate_link',
            selectedItem?.affiliate_link,
          );
          if (selectedItem?.affiliate_link) {
            Linking.openURL(selectedItem?.affiliate_link);
          }
        }}
        mainContainer={{marginHorizontal: 0, width: wp(100)}}
        linearGradient={{borderRadius: 0, height: hp(7.35)}}
      />

      <PreviewImgModal
        isVisible={isPreview}
        imageSource={
          selectedItem?.image_url ? {uri: selectedItem?.image_url} : null
        }
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
  imageBrandStyle: {
    width: wp(14),
    height: hp(8.5),
    position: 'absolute',
    backgroundColor: colors.white,
    top: hp(19),
    right: hp(1),
    alignSelf: 'flex-end',
  },
  moreDetailMainView: {
    flex: 1,
    paddingHorizontal: wp(6.4),
    backgroundColor: colors.white,
  },
  moreDetailTitle: {
    fontWeight: 'bold',
    marginBottom: hp(2),
    color: colors.bgBlue,
    fontSize: fontSize(16),
  },
  updatedPriceText: {
    fontWeight: '700',
    fontSize: fontSize(16),
    color: colors.textColor,
  },
  mainPriceText: {
    opacity: 0.4,
    fontWeight: '600',
    fontSize: fontSize(14),
    color: colors.textColor,
  },
  emojiMainView: {
    marginTop: hp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontWeight: '700',
    fontSize: fontSize(12),
    color: colors.red,
    textAlign: 'center',
    marginTop: hp(1),
  },
});

export default OfferDetails;
