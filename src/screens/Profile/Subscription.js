import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  FlatList,
} from "react-native";

import { SceneMap } from "react-native-tab-view";
import { useDispatch } from "react-redux";
import {
  getInAppPurchase,
  getPlanList,
  getUserProfile,
} from "../../actions/ProfileAction";

import {
  BtnIconText,
  FeatureBenifitItem,
  GradientBtn,
  Loading,
  ScrollableTabs,
  SubscTxtGradient,
  TabItem,
} from "../../components";
import { colors } from "../../helper/colorConstant";
import { storageKey, strings } from "../../helper/constants";
import { getAsyncStorage } from "../../helper/globalFunction";
import { icons } from "../../helper/iconConstant";
import { goBack } from "../../helper/rootNavigation";
import { fontSize, hp, statusBar, wp } from "../../helper/utilities";
import stringslang from "../lng/LocalizedStrings";
import { navigate } from "../../helper/rootNavigation";
import { routeName } from "../../helper/constants";

import InAppPurchase, {
  configure,
} from "@class101/react-native-in-app-purchase";

const IOS_PRODUCT_IDS = [
  "com.reselling.1shop",
  "com.reselling.3shops",
  "com.reselling.unlimitedshops",
];

const ANDROID_PRODUCT_IDS = [
  "com.reselling.1shop",
  "com.reselling.3shops",
  "5unlimitedshop",
];

const featureBenifitData = [
  {
    id: 0,
    title: strings.fetBenTitle1,
  },
  {
    id: 1,
    title: strings.fetBenTitle2,
  },
  {
    id: 2,
    title: strings.fetBenTitle3,
  },
  {
    id: 3,
    title: strings.fetBenTitle1,
  },
];

// const renderFetBenItem = ({ item, index }) => {
//   return <FeatureBenifitItem source={icons.check} title={item?.title} />;
// };

// const FirstRoute = () => {
//   return (
//     <View style={{ flex: 1 }}>
//       <SubscTxtGradient
//         slash={"/"}
//         symbol={"€"}
//         price={"29.99"}
//         period={"month"}
//       />
//       <View style={{ paddingHorizontal: wp(15.5) }}>
//         <Text
//           style={{
//             fontWeight: "700",
//             fontSize: fontSize(18),
//             color: colors.textColor,
//           }}
//         >
//           {stringslang.FEATURES_AND_BENIFITS}
//         </Text>
//         <FlatList
//           data={featureBenifitData}
//           renderItem={renderFetBenItem}
//           style={{ marginTop: hp(2.85) }}
//           ItemSeparatorComponent={() => <View style={{ height: hp(1.6) }} />}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       </View>
//     </View>
//   );
// };

// const SecondRoute = () => {
//   return (
//     <View style={{ flex: 1 }}>
//       <SubscTxtGradient
//         slash={"/"}
//         symbol={"€"}
//         price={"29.99"}
//         period={"month"}
//       />
//       <View style={{ paddingHorizontal: wp(15.5) }}>
//         <Text
//           style={{
//             fontWeight: "700",
//             fontSize: fontSize(18),
//             color: colors.textColor,
//           }}
//         >
//           {stringslang.FEATURES_AND_BENIFITS}
//         </Text>
//         <FlatList
//           data={featureBenifitData}
//           renderItem={renderFetBenItem}
//           style={{ marginTop: hp(2.85) }}
//           ItemSeparatorComponent={() => <View style={{ height: hp(1.6) }} />}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       </View>
//     </View>
//   );
// };

// const ThirdRoute = () => {
//   return (
//     <View style={{ flex: 1 }}>
//       <SubscTxtGradient
//         slash={"/"}
//         symbol={"€"}
//         price={"29.99"}
//         period={"month"}
//       />
//       <View style={{ paddingHorizontal: wp(15.5) }}>
//         <Text
//           style={{
//             fontWeight: "700",
//             fontSize: fontSize(18),
//             color: colors.textColor,
//           }}
//         >
//           {stringslang.FEATURES_AND_BENIFITS}
//         </Text>
//         <FlatList
//           data={featureBenifitData}
//           renderItem={renderFetBenItem}
//           style={{ marginTop: hp(2.85) }}
//           ItemSeparatorComponent={() => <View style={{ height: hp(1.6) }} />}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       </View>
//     </View>
//   );
// };

// const renderScene = SceneMap({
//   one: FirstRoute,
//   two: SecondRoute,
//   three: ThirdRoute,
// });

const Subscription = () => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [planList, setPlanList] = useState([]);
  const [planID, setPlanID] = useState(0);
  // const [routes] = useState([
  //   { key: "one", title: stringslang.STARTER },
  //   { key: "two", title: stringslang.BASIC },
  //   { key: "three", title: stringslang.PRO },
  // ]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getResult = async () => {
      setIsLoading(true);
      const request = {
        onSuccess: async (res) => {
          console.log("res::---", res);
          let finalList = [];
          res.sort(function (a, b) {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          });
          res?.map((item, index) => {
            setIndex(0);
            let obj = {
              ...item,
              isSelected: index === 0 ? true : false,
            };
            finalList.push(obj);
          });
          setPlanList([...finalList]);
          setIsLoading(false);
        },
        onFail: (error) => {
          setIsLoading(false);
        },
      };
      dispatch(getPlanList(request));
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
    getResult();

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
        setSelectedProduct("");
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

  const renderTabItem = ({ item, index }) => {
    return (
      <TabItem
        title={item?.title}
        textStyle={[
          styles.scrollableLable,
          {
            opacity: item?.isSelected ? 1 : 0.4,
          },
        ]}
        mainContainer={{
          width: wp(100 / 3),
          paddingHorizontal: 0,
          alignItems: "center",
          borderBottomColor: item?.isSelected
            ? colors.bgBlue
            : colors.textInputBg,
        }}
        onPress={() => onSubItemPress(item?.id, index)}
      />
    );
  };

  const onSubItemPress = (id, index) => {
    setIndex(index);
    const localObj = planList?.map((item, idx) =>
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
    setPlanList(localObj);
  };

  const inAppPurchaseApiCall = async (tnx_id, tnx_response) => {
    let userDetail = await getAsyncStorage(storageKey.userDetails);
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("login_id", userDetail?.user_id);
    formdata.append("txn_id", tnx_id);
    formdata.append("plan_id", planID);
    formdata.append("device_type", Platform.OS == "ios" ? "1" : "0");
    formdata.append("tra_response", tnx_response);
    formdata.append("shop_id", "");

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
      <View style={styles.innerMainView}>
        <BtnIconText
          title={stringslang.HOME}
          source={icons.backFat}
          onPress={() => goBack()}
          textStyle={styles.headerText}
          mainContainer={styles.headerMainView}
        />
        <Text style={styles.headerTitleTxt}>{stringslang.SUBSCRIPTION}</Text>
        <View style={styles.moreDetailMainView}>
          {/* <ScrollableTabs
            setIndex={setIndex}
            renderScene={renderScene}
            navigationState={{ index, routes }}
            mainContainer={styles.scrollableMainView}
            labelStyle={styles.scrollableLable}
          /> */}
          <View>
            <FlatList
              horizontal
              bounces={false}
              data={planList}
              renderItem={renderTabItem}
              showsHorizontalScrollIndicator={false}
              style={styles.scrollableMainView}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={{ flex: 1 }}>
            <SubscTxtGradient
              slash={"/"}
              symbol={"€"}
              price={planList[index]?.amount}
              period={"month"}
            />
            <View style={{ paddingHorizontal: wp(15.5) }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: fontSize(18),
                  color: colors.textColor,
                }}
              >
                {stringslang.FEATURES_AND_BENIFITS}
              </Text>
              <FeatureBenifitItem
                source={icons.check}
                title={planList[index]?.description}
                mainContainer={{
                  marginTop: hp(2.85),
                }}
              />
            </View>
          </View>
        </View>
        <GradientBtn
          title={index === 2 ? stringslang.SUBSCRIBE : stringslang.CHOOSESHOP}
          onPress={() => {
            //alert(JSON.stringify(planList[index]))

            if (index == 2) {
              if (Platform.OS == "ios") {
                setSelectedProduct(IOS_PRODUCT_IDS[index]);
                InAppPurchase.purchase(IOS_PRODUCT_IDS[index], {});
              } else {
                setSelectedProduct(ANDROID_PRODUCT_IDS[index]);
                InAppPurchase.purchase(ANDROID_PRODUCT_IDS[index], {});
              }
            } else {
              navigate(
                routeName.chooseBrand,
                index === 0
                  ? { name: "bronze", plan_id: planList[index].id }
                  : { name: "silver", plan_id: planList[index].id }
              );

              //InAppPurchase.purchase('com.reselling.1shop',{})
            }
          }}
          mainContainer={{ marginHorizontal: 0, width: wp(100) }}
          linearGradient={{ borderRadius: 0, height: hp(7.35) }}
        />
      </View>
      <Loading visible={isLoading} />
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
    backgroundColor: colors.bgBlue,
  },
  headerTitleTxt: {
    marginTop: hp(4),
    fontWeight: "700",
    textAlign: "center",
    color: colors.white,
    marginBottom: hp(6.7),
    fontSize: fontSize(20),
  },
  headerMainView: {
    paddingTop: hp(2),
    paddingHorizontal: wp(4.3),
  },
  headerText: {
    marginLeft: wp(5),
  },
  moreDetailMainView: {
    flex: 1,
    borderTopLeftRadius: wp(6.4),
    borderTopRightRadius: wp(6.4),
    backgroundColor: colors.white,
  },
  scrollableMainView: {
    borderTopLeftRadius: wp(6.4),
    borderTopRightRadius: wp(6.4),
    backgroundColor: colors.white,
  },
  scrollableLable: {
    fontWeight: "bold",
    fontSize: fontSize(14),
  },
});

export default Subscription;
