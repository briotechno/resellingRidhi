import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  FlatList,
  Platform,
} from "react-native";

import InAppPurchase, {
  configure,
} from "@class101/react-native-in-app-purchase";

import { BrandSelectionItem, BtnIconText, GradientBtn } from "../../components";
import { colors } from "../../helper/colorConstant";
import { routeName, strings } from "../../helper/constants";
import { icons } from "../../helper/iconConstant";
import { goBack, navigate } from "../../helper/rootNavigation";
import { fontSize, hitSlop, hp, statusBar, wp } from "../../helper/utilities";
import stringslang from "../lng/LocalizedStrings";
import { getShopList } from "../../actions/OfferAction";
import { getInAppPurchase } from "../../actions/ProfileAction";
import { useDispatch } from "react-redux";
import Toast from "react-native-simple-toast";
import { getAsyncStorage } from "../../helper/globalFunction";
import { storageKey } from "../../helper/constants";

const IOS_PRODUCT_IDS = ["com.reselling.1shop", "com.reselling.3shops"];

const ANDROID_PRODUCT_IDS = ["com.reselling.1shop", "com.reselling.3shops"];

// const brand_List = [
//   {
//     id: 0,
//     image: icons.lego,
//     isSelected: true,
//   },
//   {
//     id: 1,
//     image: icons.hp,
//     isSelected: false,
//   },
//   {
//     id: 2,
//     image: icons.samsung,
//     isSelected: false,
//   },
//   {
//     id: 3,
//     image: icons.asus,
//     isSelected: false,
//   },
//   {
//     id: 4,
//     image: icons.canon,
//     isSelected: false,
//   },
//   {
//     id: 5,
//     image: icons.zara,
//     isSelected: false,
//   },
//   {
//     id: 6,
//     image: icons.dell,
//     isSelected: true,
//   },
//   {
//     id: 7,
//     image: icons.nike,
//     isSelected: false,
//   },
//   {
//     id: 8,
//     image: icons.handm,
//     isSelected:  true,
//   },
// ];

const ChooseBrand = (routes) => {
  console.log("route:::", routes.route.params.plan_id);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const request = {
      onSuccess: async (res) => {
        console.log("ress::", res);
        if (res) {
          let finalList = [];
          res?.map((item, index) => {
            let obj = {
              ...item,
              isSelected: false,
            };
            finalList.push(obj);
          });
          setBrandData([...finalList]);
        }
      },
      onFail: () => {},
    };

    const configureInApp = async () => {
      InAppPurchase.onFetchProducts(onFetchProducts);
      InAppPurchase.onPurchase(onPurchase);
      InAppPurchase.onError(onError);

      InAppPurchase.configure().then(() => {
        if (Platform.OS == "ios") {
          InAppPurchase.fetchProducts(IOS_PRODUCT_IDS);
        } else {
          InAppPurchase.fetchProducts(ANDROID_PRODUCT_IDS);
        }
      });
    };
    dispatch(getShopList(request));
    setTimeout(() => {
      configureInApp();
    }, 2000);
  }, []);

  onFetchProducts = (products) => {
    //alert('Products: '+JSON.stringify(products));
    //this.setState({ products });
  };

  onError = (e) => {
    console.log(e);
    //alert(e);
  };

  onPurchase = (purchase) => {
    setTimeout(() => {
      // Complete the purchase flow by calling finalize function.
      InAppPurchase.finalize(
        purchase,
        true
        //purchase.productIds === selectedProduct
      ).then(() => {
        if (Platform.OS == "ios") {
          inAppPurchaseApiCall(purchase.transactionId, purchase.receipt);
        } else {
          inAppPurchaseApiCall(purchase.transactionId, purchase.purchaseToken);
        }
        //alert('Purchase Succeed!');
        //alert('Purchase Succeed!'+'====='+JSON.stringify(purchase));
      });
    });
  };

  // const [brandData, setBrandData] = useState(brand_List);
  const [brandData, setBrandData] = useState([]);
  const onItemPress = (id, title) => {
    console.log("title:::", title);
    const localObj = brandData.map((item, idx) =>
      item?.id === id
        ? {
            ...item,
            isSelected:
              brandData?.filter((brandItem, index) => brandItem.isSelected)
                .length < 3 && !item.isSelected,
          }
        : item
    );
    const localObjone = brandData.map((item, idx) =>
      item?.id === id
        ? {
            ...item,
            isSelected:
              brandData?.filter((brandItem, index) => brandItem.isSelected)
                .length < 1 && !item.isSelected,
          }
        : item
    );

    title === "bronze" ? setBrandData(localObjone) : setBrandData(localObj);
    title === "bronze"
      ? isSelectedShop(localObjone, title)
      : isSelectedShop(localObj, title);
  };

  const renderBrandItem = ({ item, index }) => {
    return (
      <BrandSelectionItem
        source={{ uri: item.shop_img }}
        onPress={() => onItemPress(item?.id, routes.route.params.name)}
        mainContainer={{
          borderWidth: item?.isSelected ? wp(1) : wp(0.4),
          borderColor: item?.isSelected ? colors.lightBlue : colors.brandBorder,
        }}
      />
    );
  };
  const [shopid, setShopId] = useState([]);
  const [shopbronzeid, setShopBronzeId] = useState("");

  const isSelectedShop = (data, title) => {
    let obj = [];
    title === "bronze"
      ? data.map((item) => {
          console.log("item....", item.isSelected);
          if (item.isSelected === true) {
            setShopBronzeId(item.id);
          }
        })
      : data.map((item) => {
          console.log("item....", item.isSelected);
          if (item.isSelected === true) {
            obj.push(item.id);
          }
          setShopId([...obj]);
        });
  };
  /* const inAppPurchaseApiCall = async title => {
    const stringifyArr = title === 'bronze' ? shopbronzeid : shopid.join(', ');
    console.log('shop_ids::::', stringifyArr);
    alert(stringifyArr);
    let userDetail = await getAsyncStorage(storageKey.userDetails);
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append('login_id', userDetail?.user_id);
    formdata.append('txn_id', 'txt-1');
    formdata.append('plan_id', 2);
    formdata.append('shop_id', stringifyArr);
    formdata.append('device_type', 0);
    formdata.append('tra_response', 'test');

    console.log('formdata:::', formdata);
    const request = {
      data: formdata,
      onSuccess: async res => {
        console.log('res:::bronze', res);
        // Toast.showWithGravity(res.text, Toast.SHORT, Toast.BOTTOM);
        setIsLoading(false);
      },
      onFail: error => {
        setIsLoading(false);
      },
    };
    // dispatch(getInAppPurchase(request));
  };
*/

  const inAppPurchaseApiCall = async (tnx_id, tnx_response) => {
    const stringifyArr =
      routes.route.params.name === "bronze" ? shopbronzeid : shopid.join(", ");

    let userDetail = await getAsyncStorage(storageKey.userDetails);
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("login_id", userDetail?.user_id);
    formdata.append("txn_id", tnx_id);
    formdata.append("plan_id", routes.route.params.plan_id);
    formdata.append("device_type", Platform.OS == "ios" ? "1" : "0");
    formdata.append("tra_response", tnx_response);
    formdata.append("shop_id", stringifyArr);

    console.log(JSON.stringify(formdata));

    const request = {
      data: formdata,
      onSuccess: async (res) => {
        //console.log('res:::', res);

        if (
          res.status != undefined &&
          res.status != null &&
          res.status == true
        ) {
          alert(res?.text);
        }

        setIsLoading(false);
      },
      onFail: (error) => {
        alert("Failed to update your purchase");
        setIsLoading(false);
      },
    };
    dispatch(getInAppPurchase(request));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerMainView}>
        <BtnIconText
          source={icons.backFat}
          title={stringslang.SHOPS}
          onPress={() => goBack()}
          mainContainer={styles.headerInnerView}
          textStyle={styles.headerText}
        />
        <TouchableOpacity hitSlop={hitSlop(8)} style={styles.touchMainView}>
          <Image
            style={styles.imgStyle}
            source={icons.searchBold}
            resizeMode={strings.contain}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.innerMainView}>
        <Text style={styles.titleStyle}>{stringslang.CHOOSESHOP}</Text>
        <FlatList
          numColumns={3}
          data={brandData}
          style={styles.flatListMain}
          columnWrapperStyle={styles.columnWrapperStyle}
          renderItem={renderBrandItem}
          ItemSeparatorComponent={() => <View style={{ height: hp(2) }} />}
        />
      </View>
      <GradientBtn
        title={stringslang.SUBSCRIBE}
        onPress={() => {
          // navigate(
          //   routeName.subscription,
          //   routes.route.params.name === 'bronze'
          //     ? {id: shopbronzeid}
          //     : {id: shopid.join(', ')},
          // )

          if (Platform.OS == "ios") {
            InAppPurchase.purchase(
              routes.route.params.name === "bronze"
                ? IOS_PRODUCT_IDS[0]
                : IOS_PRODUCT_IDS[1],
              {}
            );
          } else {
            InAppPurchase.purchase(
              routes.route.params.name === "bronze"
                ? ANDROID_PRODUCT_IDS[0]
                : ANDROID_PRODUCT_IDS[1],
              {}
            );
          }
        }}
        mainContainer={{ marginHorizontal: 0, width: wp(100) }}
        linearGradient={{ borderRadius: 0, height: hp(7.35) }}
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
  innerMainView: {
    flex: 1,
    backgroundColor: colors.textInputBg,
  },
  headerMainView: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: wp(4.3),
    backgroundColor: colors.bgBlue,
    justifyContent: "space-between",
  },
  titleStyle: {
    marginTop: hp(2),
    fontWeight: "700",
    marginLeft: wp(6.4),
    fontSize: fontSize(14),
    color: colors.textColor,
  },
  headerInnerView: {
    paddingVertical: hp(2),
  },
  headerText: {
    marginLeft: wp(4),
  },
  imgStyle: {
    width: wp(4.8),
    height: wp(4.8),
  },
  touchMainView: {
    marginRight: wp(2.1),
  },
  flatListMain: {
    marginTop: hp(2),
    paddingHorizontal: wp(6.2),
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
});

export default ChooseBrand;
