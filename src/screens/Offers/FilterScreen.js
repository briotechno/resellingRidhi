import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../helper/colorConstant';
import {fontSize, statusBar, hp, wp} from '../../helper/utilities';
import {routeName, strings} from '../../helper/constants';
import {navigate} from '../../helper/rootNavigation';
import {CategoryItem, GradientBtn, Input} from '../../components';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {icons} from '../../helper/iconConstant';
import {getCategoryWithBrand, getFilter} from '../../actions/OfferAction';
import {useDispatch} from 'react-redux';
import {BrandsItem} from '../../components';
import stringslang from '../lng/LocalizedStrings';
import Toast from 'react-native-simple-toast';

const SLIDERVALUE = {min: 0, max: 100};

const FilterScreen = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(0);
  const select = index => {
    setSelected(index);
  };

  const listArray = [
    {title: stringslang.DISCOUNT},
    {title: stringslang.PRICE_RANGE},
    {title: stringslang.BRAND_WITH_CATEGORY},
  ];

  const renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => select(index)}
          style={[
            styles.listStyle,
            selected === index ? {backgroundColor: colors.white} : {},
          ]}>
          <Text style={[styles.listText]}>{item.title}</Text>
        </TouchableOpacity>
      </>
    );
  };

  const [maxvalue, setMaxvalue] = useState('');
  const [minvalue, setMinvalue] = useState('');

  const maxValueChange = value => {
    setMaxvalue(value);
  };
  const minValueChange = value => {
    setMinvalue(value);
  };

  const {min, max} = SLIDERVALUE;
  const [width, setWidth] = useState(200);
  const [selectedslide, setSelectedslide] = useState(null);

  if (!selectedslide) {
    setSelectedslide([min]);
  }
  const onValuesChangeFinish = values => {
    if (values > 1) {
      setSelectedslide(values);
    }
  };
  //checkbox
  const [category, setCategory] = useState([]);

  const handleChange = id => {
    let temp = category.map(catItem => {
      if (id === catItem.id) {
        return {...catItem, isChecked: !catItem.isChecked};
      }
      return catItem;
    });
    setCategory(temp);
    isSelectedCat(temp);
  };
  const [cateName, setCateName] = useState([]);

  const isSelectedCat = (data, title) => {
    let obj = [];
    data.map(item => {
      if (item.isChecked === true) {
        obj.push(item.category);
      }
      setCateName([...obj]);
    });
  };

  const handleChangeBrands = (item, mainItem) => {
    let temp = category.map(catItem => {
      if (mainItem.id === catItem.id) {
        let innerTemp = mainItem.brands.map(brandItem => {
          if (item.id === brandItem.id) {
            return {...brandItem, isCheckedbrand: !brandItem.isCheckedbrand};
          }
          return brandItem;
        });
        return {...catItem, brands: innerTemp};
      }
      return catItem;
    });
    setCategory(temp);
    isSelectedBrands(temp);
  };
  const [brandId, setBrandId] = useState([]);

  const isSelectedBrands = (data, title) => {
    console.log('data::', JSON.stringify(data));
    let obj = [];
    let maindata = data.map(item => {
      if (item.isChecked === true) {
        item.brands.map(itembrand => {
          console.log('itembrand', itembrand);
          if (itembrand.isCheckedbrand === true) {
            obj.push(itembrand.id);
          }
        });
        setBrandId([...obj]);
      }
      return maindata;
    });
  };

  useEffect(() => {
    getResult();
  }, []);

  const getResult = async () => {
    const request = {
      onSuccess: async res => {
        // setLoading(false);
        if (res) {
          console.log('resss:=', res.data);
          let finalList = [];
          res.data.map((item, index) => {
            let obj = {
              ...item,
              id: index,
            };
            finalList.push(obj);
            setCategory(finalList);
          });
        }
      },
      onFail: error => {
        // setLoading(false);
      },
    };
    dispatch(getCategoryWithBrand(request));
  };

  const renderItemCategory = ({item, index}) => {
    return (
      <CategoryItem
        onItemPress={() => {
          handleChange(item.id);
        }}
        data={item}
        renderItemBrand={({brandItem, idx}) => renderItemBrand(brandItem, item)}
      />
    );
  };
  const renderItemBrand = (brandItem, mainItem) => {
    return (
      <View style={[styles.checkBoxView, {marginLeft: wp(5)}]}>
        <TouchableOpacity
          onPress={() => handleChangeBrands(brandItem, mainItem)}
          style={
            brandItem.isCheckedbrand
              ? styles.checkBoxViewEnable
              : styles.checkBoxDisableView
          }>
          {brandItem.isCheckedbrand ? (
            <Image
              source={icons.checkRight}
              style={{
                width: wp(3.5),
                height: wp(3.5),
                tintColor: 'white',
              }}
            />
          ) : null}
        </TouchableOpacity>
        <Text style={styles.keepTextStyle}>{brandItem.brand_name}</Text>
      </View>
    );
  };
  //filter api call

  const [shopItem, setShopItem] = useState([]);

  const filterApicall = async () => {
    const categoryArr = cateName.join(', ');
    const brandIdArr = brandId.join(', ');
    const percentageArr = selectedslide.join(', ');
    console.log(JSON.stringify(brandIdArr));
    const formdata = new FormData();
    if (percentageArr !== '0') {
      formdata.append('percentage', percentageArr);
    }
    if (minvalue.length !== 0) {
      formdata.append('min_price', minvalue);
    }
    if (maxvalue.length !== 0) {
      formdata.append('max_price', maxvalue);
    }
    brandIdArr !== '' ? formdata.append('brand', brandIdArr) : null;
    categoryArr !== '' ? formdata.append('category', categoryArr) : null;
    console.log('formdata:', formdata);
    const request = {
      data: formdata,
      onSuccess: async res => {
        if (res) {
          // Toast.showWithGravity(res.message, Toast.SHORT, Toast.BOTTOM);
          setShopItem(res.data);
          console.log(res.data);
        }
      },
      onFail: error => {
        // setLoading(false);
      },
    };
    dispatch(getFilter(request));
  };
  const renderAmazonItem = ({item, index}) => {
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
        discountVisible={item?.push_type === 'Discount'}
        expiryText={stringslang.EXPIRE_IN}
        expiryTime={strings.expireTime1}
        onClaimPress={() =>
          navigate(routeName.offerDetails, {
            item,
            shopName:item.shop
          })
        }
        onItemPress={() =>
          navigate(routeName.offerDetails, {
            item,
            shopName:item.shop
          })
        }
      />
    );
  };

  const clearFilterFunction = () => {
    setShopItem([]);
    setSelected(0);
    setMinvalue('');
    setMaxvalue('');
    setSelectedslide(null);
    getResult();
    setBrandId([]);
    setCateName([]);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainheadContainer}>
        <Text style={styles.headerRightText}>{stringslang.FILTER}</Text>
        <View style={styles.rightMainView}></View>
        <Text
          onPress={() => navigate(routeName.offers)}
          style={styles.headerLeftText}>
          {stringslang.CLOSE}
        </Text>
      </View>
      <View style={styles.sepratorView} />

      <View style={styles.contentView}>
        <>
          {shopItem.length === 0 ? (
            <>
              <View style={styles.leftContent}>
                <FlatList data={listArray} renderItem={renderItem} />
              </View>

              {selected === 0 ? (
                <View style={styles.rightContent}>
                  <MultiSlider
                    min={min}
                    max={max}
                    values={selectedslide}
                    sliderLength={width}
                    onValuesChangeFinish={onValuesChangeFinish}
                    allowOverlap
                    snapped
                    selectedStyle={{
                      backgroundColor: colors.blueTxt,
                      height: hp(0.5),
                    }}
                    trackStyle={{height: hp(0.5)}}
                    markerStyle={{
                      borderColor: colors.blueTxt,
                      borderWidth: 1,
                      backgroundColor: colors.white,
                      height: hp(2.4),
                      width: wp(5),
                      alignSelf: 'center',
                    }}
                    enableLabel={false}
                  />
                  <Text
                    style={
                      styles.rightContentHeader
                    }>{`${selectedslide}%`}</Text>
                </View>
              ) : selected === 1 ? (
                <View style={styles.rightContent}>
                  <Text style={styles.rightContentHeader}>
                    {stringslang.MINIPRICE}
                  </Text>
                  <Input
                    placeholder={stringslang.MINIPRICE}
                    value={minvalue}
                    onChange={minValueChange}
                    keyboardType="numeric"
                    mainContainer={styles.inputStyle}
                  />
                  <Text style={styles.rightContentHeader}>
                    {stringslang.MAXPRICE}
                  </Text>
                  <Input
                    placeholder={stringslang.MAXPRICE}
                    value={maxvalue}
                    onChange={maxValueChange}
                    keyboardType="numeric"
                    mainContainer={styles.inputStyle}
                  />
                </View>
              ) : (
                <View style={styles.rightContent}>
                  <FlatList renderItem={renderItemCategory} data={category} />
                </View>
              )}
            </>
          ) : (
            <>
              <FlatList
                renderItem={renderAmazonItem}
                data={shopItem}
                showsVerticalScrollIndicator={false}
                style={{backgroundColor: colors.textInputBg}}
                ListHeaderComponent={() => <View style={{height: hp(1.75)}} />}
                ItemSeparatorComponent={() => <View style={{height: hp(1)}} />}
                ListFooterComponent={() => <View style={{height: hp(2)}} />}
              />
            </>
          )}
        </>
      </View>

      <View style={[styles.sepratorView, {marginTop: 0}]} />

      <View style={styles.mainheadContainer}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            clearFilterFunction();
          }}>
          <Text style={styles.btnTextStyle}>{stringslang.CLEAR_FILTER}</Text>
        </TouchableOpacity>
        <View style={styles.rightMainView}>
          <GradientBtn
            mainContainer={[styles.btnStyle, {paddingHorizontal: wp(0)}]}
            linearGradient={styles.btnStyle}
            title={stringslang.SHOW_RESULT}
            onPress={() => {
              filterApicall();
            }}
          />
        </View>
      </View>
      <View style={styles.sepratorView} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: statusBar,
    backgroundColor: colors.white,
  },
  rightMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainheadContainer: {
    marginTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.5),
    justifyContent: 'space-between',
  },
  headerRightText: {
    fontSize: fontSize(18),
    color: colors.textColor,
    fontWeight: '500',
  },
  headerLeftText: {
    fontSize: fontSize(16),
    color: colors.blueTxt,
    fontWeight: '500',
  },
  sepratorView: {
    height: hp(0.28),
    marginTop: hp(2),
    backgroundColor: colors.textInputBg,
  },
  btnStyle: {
    width: 'auto',
    height: wp(11),
    alignItems: 'center',
    borderRadius: wp(2.5),
    justifyContent: 'center',
    borderColor: colors.textInputBg,
    borderWidth: hp(0.2),
    paddingHorizontal: wp(3.5),
    marginHorizontal: wp(0),
  },
  btnTextStyle: {
    fontSize: fontSize(15),
    color: colors.blueTxt,
    fontWeight: '500',
  },

  listText: {
    fontSize: fontSize(16),
    color: colors.black,
    fontWeight: '500',
  },
  listStyle: {
    paddingVertical: hp(0.8),
    justifyContent: 'center',
    paddingVertical: hp(1.7),
    paddingHorizontal: wp(3.5),
  },
  contentView: {flex: 1, flexDirection: 'row'},
  leftContent: {width: wp(35), backgroundColor: colors.textInputBg},
  rightContent: {
    flex: 1,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3.5),
  },
  rightContentHeader: {
    fontSize: fontSize(15),
    color: colors.black,
    fontWeight: '500',
    marginVertical: hp(0.8),
  },
  checkBoxView: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    margin: hp(1),
  },
  checkBoxViewEnable: {
    borderRadius: hp(0.4),
    backgroundColor: colors.blueTxt,
    borderStyle: 'solid',
    borderWidth: 1,
    width: wp(6),
    height: wp(6),
    borderColor: colors.blueTxt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxDisableView: {
    borderRadius: hp(0.4),
    backgroundColor: colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    width: wp(6),
    height: wp(6),
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keepTextStyle: {
    fontWeight: '400',
    fontSize: fontSize(14),
    color: colors.gray,
    marginHorizontal: hp(1),
    textAlign: 'center',
  },
  inputStyle: {marginHorizontal: wp(0)},
});

export default FilterScreen;
