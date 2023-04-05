import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getDashboard} from '../../actions/HomeAction';

import {
  BrandStoreItem,
  GradientTextTabItem,
  Header,
  HighlightItem,
  Loading,
  PopOfferItem,
  Search,
  TrendingItem,
} from '../../components';
import {colors} from '../../helper/colorConstant';
import {routeName, strings} from '../../helper/constants';
import {icons, images} from '../../helper/iconConstant';
import {navigate, navigationRef} from '../../helper/rootNavigation';
import {fontSize, hp, statusBar, wp} from '../../helper/utilities';
import stringslang from '../lng/LocalizedStrings';
import {getAsyncStorage} from '../../helper/globalFunction';
import {storageKey} from '../../helper/constants';
import {useIsFocused} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

const Home = ({navigation}) => {
  // console.log('routehome', route.params.skipTab);
  const [searchText, setSearchText] = useState('');
  const [offerName, setOfferName] = useState(strings.popularOffers);
  const [loading, setLoading] = useState(false);
  const [highlightData, setHighlightData] = useState(null);
  const [trendingOfferList, setTrendingOfferList] = useState([]);
  const [popularBrandList, setPopularBrandList] = useState([]);
  const [popularShopList, setPopularShopList] = useState([]);
  const [popularOfferList, setPopularOfferList] = useState([]);
  const [latestOfferList, setLatestOfferList] = useState([]);
  const [offerActiveIdx, setOfferActiveIdx] = useState(0);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // const textInputRef = useRef();

  useEffect(() => {
    if (isFocused) {
      setSearchText('');
    }
  }, [isFocused]);

  useEffect(() => {
    const getResult = async () => {
      let userDetail = await getAsyncStorage(storageKey.userDetails);
      console.log('User Details :-', userDetail);
      setLoading(true);

      let params = {
        user_id: userDetail?.user_id,
      };

      console.log('param:', params);
      const request = {
        params: params,
        onSuccess: async res => {
          setLoading(false);
          if (res) {
            console.log('res dash::', res);
            setHighlightData(res?.highlights);
            // setTrendingOfferList(res?.trending_offers);
            setTrendingOfferList(res?.latest_news);
            setPopularBrandList(res?.popular_brands);
            setPopularShopList(res?.popular_shops);
            setPopularOfferList(res?.popular_offers);
            setLatestOfferList(res?.latest_offers);
          }
        },
        onFail: error => {
          console.log('Error ::--', error);
          setLoading(false);
        },
      };
      dispatch(getDashboard(request));
    };
    getResult();
  }, []);

  const onSearchTextChange = text => {
    setSearchText(text);
  };

  const onPopularOffersPress = () => {
    setOfferActiveIdx(0);
    setOfferName(strings.popularOffers);
  };

  const onLatestOffersPress = () => {
    setOfferActiveIdx(1);
    setOfferName(strings.latestOffers);
  };

  const renderTrendingItem = ({item, index}) => {
    return (
      <TrendingItem
        onPress={() =>
          navigate(routeName.newsDetails, {
            item,
          })
        }
        coupon={item?.news_name ? item?.news_name : null}
        // title={'Grab your desserts'}
        // coupon={'250 coupons from 12 places'}
        bgSource={item?.news_img ? {uri: item?.news_img} : null}
      />
    );
  };

  const renderPopularBrandItem = ({item, index}) => {
    return (
      <BrandStoreItem
        source={{uri: item?.brand_img}}
        onPress={() => {
          navigate(routeName.offers, {type: 'Brands', data: item});
        }}
      />
    );
  };

  const renderPopularStoreItem = ({item, index}) => {
    return (
      <BrandStoreItem
        source={{uri: item?.shop_img}}
        onPress={() => {
          navigate(routeName.offers, {type: 'Shops', data: item});
        }}
      />
    );
  };

  const renderPopOfferItem = ({item, index}) => {
    return (
      <PopOfferItem
        title={item.title}
        btnTitle={stringslang.CLAIM}
        // expiryText={stringslang.EXPIRE_IN}
        expiryTime={stringslang.expireTime1}
        onItemPress={() =>
          navigate(routeName.offerDetails, {item, shopName: item?.shop})
        }
        onClaimPress={() =>
          navigate(routeName.offerDetails, {item, shopName: item?.shop})
        }
        topLeftImg={item?.image_url ? {uri: item?.image_url} : null}
      />
    );
  };

  const onSettingPress = async () => {
    let userDetail = await getAsyncStorage(storageKey.userDetails);
    navigate(routeName.notification, {transaction: userDetail.transactionData});
  };

  const onNotificationPress = () => {
    navigate(routeName.notification);
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftSource={icons.logo}
        // right1Source={icons.notification}
        right2Source={icons.notification}
        onSettingPress={onSettingPress}
        onNotificationPress={onNotificationPress}
      />
      <Search
        value={searchText}
        leftImgSource={icons.search}
        onChangeText={onSearchTextChange}
        searchImgstyle={searchText !== '' ? {tintColor: colors.black} : {}}
        onPress={() =>
          searchText !== ''
            ? navigate(routeName.FilterScreen, {
                searchText,
              })
            : null
        }
      />
      <View style={styles.sepratorView} />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: colors.textInputBg, flex: 1}}>
        <View style={{backgroundColor: colors.white}}>
          {trendingOfferList?.length > 0 && (
            <>
              <Text style={styles.mainTitleTxt}>{stringslang.NEWS}</Text>
              <FlatList
                horizontal
                data={trendingOfferList}
                style={styles.trendingMain}
                renderItem={renderTrendingItem}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => (
                  <View style={styles.trendingTopBottomView} />
                )}
                ItemSeparatorComponent={() => (
                  <View style={styles.trendingCenterView} />
                )}
                ListFooterComponent={() => (
                  <View style={styles.trendingTopBottomView} />
                )}
              />
              <View
                style={[
                  styles.sepratorView,
                  {
                    marginTop: 0,
                  },
                ]}
              />
            </>
          )}

          {/* {popularBrandList?.length > 0 && (
            <>
              <Text style={styles.mainTitleTxt}>
                {stringslang.POPULAR_BRANDS}
              </Text>

              <FlatList
                horizontal
                data={popularBrandList}
                style={styles.popularMainStyle}
                renderItem={renderPopularBrandItem}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => (
                  <View style={styles.trendingTopBottomView} />
                )}
                ItemSeparatorComponent={() => (
                  <View style={styles.popularSeprator} />
                )}
                ListFooterComponent={() => (
                  <View style={styles.trendingTopBottomView} />
                )}
              />
              <View style={styles.sepratorView} />
            </>
          )} */}

          {popularShopList?.length > 0 && (
            <>
              <Text style={styles.mainTitleTxt}>
                {stringslang.POPULAR_STORES}
              </Text>
              <FlatList
                horizontal
                data={popularShopList}
                style={[
                  styles.popularMainStyle,
                  {
                    paddingBottom: hp(2),
                  },
                ]}
                renderItem={renderPopularStoreItem}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => (
                  <View style={styles.trendingTopBottomView} />
                )}
                ItemSeparatorComponent={() => (
                  <View style={styles.popularSeprator} />
                )}
                ListFooterComponent={() => (
                  <View style={styles.trendingTopBottomView} />
                )}
              />
            </>
          )}
        </View>
        <View style={styles.tabMainView}>
          <GradientTextTabItem
            title={stringslang.POPULAR_OFFERS}
            onPress={onPopularOffersPress}
            isSelected={offerName === strings.popularOffers}
          />
          <View style={styles.tabCenterView} />
          <GradientTextTabItem
            title={stringslang.LATEST_OFFERS}
            onPress={onLatestOffersPress}
            isSelected={offerName === strings.latestOffers}
          />
        </View>

        {offerActiveIdx === 0 && popularOfferList?.length > 0 && (
          <FlatList
            data={popularOfferList}
            renderItem={renderPopOfferItem}
            ItemSeparatorComponent={() => <View style={{height: hp(1)}} />}
            ListFooterComponent={() => <View style={{height: hp(2)}} />}
          />
        )}

        {offerActiveIdx === 1 && latestOfferList?.length > 0 && (
          <FlatList
            data={latestOfferList}
            renderItem={renderPopOfferItem}
            ItemSeparatorComponent={() => <View style={{height: hp(1)}} />}
            ListFooterComponent={() => <View style={{height: hp(2)}} />}
          />
        )}

        {highlightData &&
          (highlightData?.is_news ||
            highlightData?.is_analytics ||
            highlightData?.is_coupons) && (
            <View style={{backgroundColor: colors.white, paddingTop: hp(1)}}>
              <Text style={styles.mainTitleTxt}>{stringslang.HIGHLIGHTS}</Text>
              <View style={{marginVertical: hp(1.5)}}>
                {highlightData?.is_news && (
                  <>
                    <HighlightItem
                      onPress={() =>
                        navigation.navigate('News', {
                          screen: stringslang.NEWS,
                        })
                      }
                      source={images.news}
                      title={stringslang.NEWS}
                    />
                    <View style={{height: hp(1)}} />
                  </>
                )}
                {highlightData?.is_analytics && (
                  <>
                    <HighlightItem
                      onPress={() =>
                        navigation.navigate('News', {
                          screen: stringslang.ANALYTICS,
                        })
                      }
                      source={images.analytics}
                      title={stringslang.ANALYTICS}
                    />
                    <View style={{height: hp(1)}} />
                  </>
                )}
                {highlightData?.is_coupons && (
                  <HighlightItem
                    onPress={() =>
                      navigation.navigate('News', {
                        screen: stringslang.COUPONS,
                      })
                    }
                    source={images.coupons}
                    title={stringslang.COUPONS}
                  />
                )}
              </View>
            </View>
          )}
        <View style={{height: hp(2)}} />
      </ScrollView>
      <Loading visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: statusBar,
    backgroundColor: colors.white,
  },
  sepratorView: {
    height: hp(1),
    marginTop: hp(2),
    marginBottom: hp(1),
    backgroundColor: colors.textInputBg,
  },
  mainTitleTxt: {
    fontWeight: 'bold',
    marginLeft: wp(6.5),
    fontSize: fontSize(16),
    color: colors.textColor,
  },
  trendingMain: {
    paddingTop: hp(1),
    paddingBottom: hp(2),
  },
  trendingTopBottomView: {
    width: wp(6.5),
  },
  trendingCenterView: {
    width: wp(4.3),
  },
  popularMainStyle: {
    paddingTop: hp(2),
  },
  popularSeprator: {
    width: wp(2.15),
  },
  tabMainView: {
    paddingTop: hp(3),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp(2),
    paddingHorizontal: wp(6.5),
    backgroundColor: colors.textInputBg,
  },
  tabCenterView: {
    width: wp(8),
  },
});

export default Home;
