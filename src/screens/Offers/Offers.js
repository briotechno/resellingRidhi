import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

import { GradientHeader, BrandsItem, TabItem, Loading } from "../../components";
import { routeName, storageKey, strings } from "../../helper/constants";
import { icons } from "../../helper/iconConstant";
import { hp, isIos, statusBar } from "../../helper/utilities";
import { navigate } from "../../helper/rootNavigation";

import { colors } from "../../helper/colorConstant";
import { useDispatch } from "react-redux";
import {
  getBrandList,
  getOfferList,
  getShopList,
} from "../../actions/OfferAction";
import { getAsyncStorage } from "../../helper/globalFunction";
import stringslang from "../lng/LocalizedStrings";
var limit = 5;

const Offers = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [activeIdx, setActiveIdx] = useState(1);
  const [brandList, setBrandList] = useState([]);
  const [shopList, setShopList] = useState([]);
  const [brandOfferData, setBrandOfferData] = useState([]);
  const [shopOfferData, setShopOfferData] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [shopName, setShopName] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (route?.params) {
      let { type, data } = route?.params;
      setActiveIdx(type === "Brands" ? 0 : 1);
      setLoading(true);
      const request = {
        onSuccess: async (res) => {
          if (res) {
            if (res?.length > 0) {
              setBrandName(data?.brand_name);
            }
            let finalList = [];
            res?.map((item, index) => {
              let obj = {
                ...item,
                isSelected: item?.id === data?.id ? true : false,
              };
              finalList.push(obj);
            });
            setBrandList([...finalList]);
          }
        },
        onFail: () => {},
      };
      dispatch(getBrandList(request));
    } else {
      setLoading(true);
      const request = {
        onSuccess: async (res) => {
          if (res) {
            if (res?.length > 0) {
              setBrandName(res?.[0]?.brand_name);
            }
            let finalList = [];
            res?.map((item, index) => {
              let obj = {
                ...item,
                isSelected: index === 0 ? true : false,
              };
              finalList.push(obj);
            });
            setBrandList([...finalList]);
          }
        },
        onFail: () => {},
      };
      dispatch(getBrandList(request));
    }
  }, [route?.params]);

  useEffect(() => {
    if (route?.params) {
      let { type, data } = route?.params;
      setActiveIdx(type === "Shops" ? 1 : 0);
      setOffset(0);
      setShopOfferData([]);
      setLoading(true);
      const request = {
        onSuccess: async (res) => {
          if (res) {
            if (res?.length > 0) {
              setShopName(data?.shop_name);
            }
            let finalList = [];
            res?.map((item, index) => {
              let obj = {
                ...item,
                isSelected: item?.id === data?.id ? true : false,
              };
              finalList.push(obj);
            });
            setShopList([...finalList]);
          }
        },
        onFail: () => {},
      };
      dispatch(getShopList(request));
    } else {
      setLoading(true);
      const request = {
        onSuccess: async (res) => {
          if (res) {
            if (res?.length > 0) {
              setShopName(res?.[0]?.shop_name);
            }
            let finalList = [];
            res?.map((item, index) => {
              let obj = {
                ...item,
                isSelected: index === 0 ? true : false,
              };
              finalList.push(obj);
            });
            setShopList([...finalList]);
          }
        },
        onFail: () => {},
      };
      dispatch(getShopList(request));
    }
  }, [route?.params]);

  useEffect(() => {
    setTimeout(() => {
      getResult();
    }, 500);
  }, [brandName, shopName, activeIdx]);

  const getResult = async () => {
    {
      shopOfferData.length >= 5 ? setLoading(true) : setLoading(false);
    }
    let userDetail = await getAsyncStorage(storageKey.userDetails);
    const formdata = new FormData();
    formdata.append("user_id", userDetail?.user_id);
    {
      activeIdx === 0
        ? formdata.append("brand_name", brandName)
        : formdata.append("shop_name", shopName);
    }
    formdata.append("limit", limit);
    formdata.append("offset", offset);

    setOffset(offset + limit);
    const request = {
      data: formdata,
      onSuccess: async (res) => {
        setLoading(false);
        if (res) {
          let mergeData = [];
          if (activeIdx === 0) {
            setBrandOfferData(res);
          } else {
            if (res.length !== 0) {
              mergeData = shopOfferData;
              res.map((item) => {
                mergeData.push(item);
              });
              setShopOfferData([...mergeData]);
            }
          }
        }
      },
      onFail: (error) => {
        setLoading(false);
        setBrandOfferData([]);
        setShopOfferData([]);
      },
    };
    dispatch(getOfferList(request));
  };

  const onBrandItemPress = (id, name) => {
    setBrandName(name);

    const localObj = brandList?.map((item, idx) =>
      item?.id === id
        ? {
            ...item,
            isSelected: true,
          }
        : {
            ...item,
            isSelected: false,
          }
    );
    setBrandList(localObj);
  };
  const onShopItemPress = (id, name) => {
    setOffset(0);
    setShopOfferData([]);
    setShopName(name);
    const localObj = shopList?.map((item, idx) =>
      item?.id === id
        ? {
            ...item,
            isSelected: true,
          }
        : {
            ...item,
            isSelected: false,
          }
    );
    setShopList(localObj);
  };

  const renderBrandItem = ({ item, index }) => {
    return (
      <TabItem
        title={item?.brand_name}
        textStyle={{
          opacity: item?.isSelected ? 1 : 0.4,
        }}
        mainContainer={{
          borderBottomColor: item?.isSelected ? colors.bgBlue : colors.white,
        }}
        onPress={() => onBrandItemPress(item?.id, item?.brand_name)}
      />
    );
  };

  const renderShopItem = ({ item, index }) => {
    return (
      <TabItem
        title={item?.shop_name}
        textStyle={{
          opacity: item?.isSelected ? 1 : 0.4,
        }}
        mainContainer={{
          borderBottomColor: item?.isSelected ? colors.bgBlue : colors.white,
        }}
        onPress={() => onShopItemPress(item?.id, item?.shop_name)}
      />
    );
  };

  const renderAmazonItem = ({ item, index }) => {
    return (
      <BrandsItem
        topLeftImg={{
          uri: item.image_url,
        }}
        title={item.title}
        price={`${Number(item.price).toFixed(2)}€`}
        pushType={`${item.push_type.toUpperCase()}! - `}
        btnTitle={stringslang.CLAIM}
        discount={item?.discount_percent}
        discountVisible={item?.push_type === "Discount"}
        expiryText={stringslang.EXPIRE_IN}
        expiryTime={strings.expireTime1}
        onClaimPress={() =>
          navigate(routeName.offerDetails, {
            item,
            brandName,
            shopName,
            activeIdx,
          })
        }
        onItemPress={() =>
          navigate(routeName.offerDetails, {
            item,
            brandName,
            shopName,
            activeIdx,
          })
        }
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <GradientHeader
        activeIdx={activeIdx}
        leftTitle={stringslang.OFFERS}
        tab1Title={stringslang.BRANDS}
        // onTab1Press={() => {
        //   setActiveIdx(0);
        //   if (brandList?.length > 0) {
        //     setBrandName(brandList?.[0]?.brand_name);
        //   }
        // }}
        // tab2Title={stringslang.SHOPS}
        // onTab2Press={() => {
        //   setActiveIdx(1);
        //   if (shopList?.length > 0) {
        //     setShopName(shopList?.[0]?.shop_name);
        //   }
        // }}
        rightSource={icons.filter}
        onRightImgPress={() => navigate(routeName.FilterScreen)}
      />
      {activeIdx === 0 && (
        <View>
          <FlatList
            horizontal
            bounces={false}
            data={brandList}
            renderItem={renderBrandItem}
            showsHorizontalScrollIndicator={false}
            style={{
              backgroundColor: colors.white,
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          {brandOfferData?.length === 0 ? (
            <View
              style={{
                height: isIos ? hp(73) : hp(77),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>Data not found!</Text>
            </View>
          ) : (
            <View
              style={{
                height: isIos ? hp(73) : hp(77),
              }}
            >
              <FlatList
                data={brandOfferData}
                renderItem={renderAmazonItem}
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: colors.textInputBg }}
                ListHeaderComponent={() => (
                  <View style={{ height: hp(1.75) }} />
                )}
                ItemSeparatorComponent={() => (
                  <View style={{ height: hp(1) }} />
                )}
                ListFooterComponent={() => <View style={{ height: hp(2) }} />}
              />
            </View>
          )}
        </View>
      )}
      {activeIdx === 1 && (
        <View>
          <FlatList
            horizontal
            bounces={false}
            data={shopList}
            renderItem={renderShopItem}
            showsHorizontalScrollIndicator={false}
            style={{
              backgroundColor: colors.white,
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          {shopOfferData?.length === 0 ? (
            <View
              style={{
                height: isIos ? hp(73) : hp(77),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>Data not found!</Text>
            </View>
          ) : (
            <View
              style={{
                height: isIos ? hp(73) : hp(77),
              }}
            >
              <FlatList
                data={shopOfferData}
                renderItem={renderAmazonItem}
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: colors.textInputBg }}
                ListHeaderComponent={() => (
                  <View style={{ height: hp(1.75) }} />
                )}
                ItemSeparatorComponent={() => (
                  <View style={{ height: hp(1) }} />
                )}
                ListFooterComponent={() => <View style={{ height: hp(2) }} />}
                onEndReached={getResult}
                onEndReachedThreshold={0.2}
              />
            </View>
          )}

          {/* )} */}
        </View>
      )}
      <Loading visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: statusBar,
  },
});

export default Offers;
