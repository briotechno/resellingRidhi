import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';

import {BtnIconText, NoNotification, Input} from '../../components';
import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {icons, images} from '../../helper/iconConstant';
import {goBack, navigate} from '../../helper/rootNavigation';
import {fontSize, hp, statusBar, wp} from '../../helper/utilities';
import stringslang from '../lng/LocalizedStrings';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {getCategoryWithBrand} from '../../actions/OfferAction';
import {routeName} from '../../helper/constants';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const SLIDERVALUE = {min: 0, max: 100};

const NotificationSettingScreen = ({route}) => {
  console.log('user setting', route.params);

  const dispatch = useDispatch();
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [discountMin, setDiscountMin] = useState('');
  const [discountMax, setDiscountMax] = useState('');
  const [ebayCount, setEbeyCount] = useState('');

  const [listData, setListData] = useState([
    {id: '1', title: 'offerPrice Range', enabled: false},
    {id: '2', title: 'Discount', enabled: false},
    {id: '3', title: 'ebay Difference', enabled: false},
    {id: '4', title: 'ebay Count', enabled: false},
    {id: '5', title: 'Categories', enabled: false},
  ]);
  //slider value
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
  useEffect(() => {
    getResult();
  }, []);
  const [category, setCategory] = useState([]);

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
              enabled: true,
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

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        <View style={styles.languageView}>
          <Text style={styles.languageText}>{item.title}</Text>

          <Switch
            trackColor={{false: colors.gray, true: colors.green}}
            thumbColor={colors.white}
            ios_backgroundColor={colors.gray}
            onValueChange={() => {
              // route.params.transaction === null
              //   ? setModalVisible(true)
              //   :
              setListData(prevListData =>
                prevListData.map(data =>
                  data.id === item.id
                    ? {...data, enabled: !data.enabled}
                    : data,
                ),
              );
            }}
            value={item.enabled}
          />
        </View>
        {item.title === 'Categories' && item.enabled ? (
          <FlatList data={category} renderItem={renderSubItem} />
        ) : item.title === 'offerPrice Range' && item.enabled ? (
          <>
            <View style={styles.container}>
              <TextInput
                style={styles.textInput}
                value={priceMin}
                onChangeText={setPriceMin}
                placeholder="Min Price"
                placeholderTextColor={colors.black}
                keyboardType="numeric"
              />
              <Text style={styles.toTextStyle}>{'to'}</Text>
              <TextInput
                style={styles.textInput}
                value={priceMax}
                onChangeText={setPriceMax}
                placeholder="Max Price"
                placeholderTextColor={colors.black}
                keyboardType="numeric"
              />
            </View>
          </>
        ) : item.title === 'Discount' && item.enabled ? (
          <>
            <View style={styles.container}>
              <TextInput
                style={styles.textInput}
                value={discountMin}
                onChangeText={setDiscountMin}
                placeholder="Min Price"
                placeholderTextColor={colors.black}
                keyboardType="numeric"
              />
              <Text style={styles.toTextStyle}>{'to'}</Text>
              <TextInput
                style={styles.textInput}
                value={discountMax}
                onChangeText={setDiscountMax}
                placeholder="Max Price"
                placeholderTextColor={colors.black}
                keyboardType="numeric"
              />
            </View>
          </>
        ) : item.title === 'ebay Difference' && item.enabled ? (
          <>
            <View style={styles.container}>
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
                style={styles.rightContentHeader}>{`${selectedslide}%`}</Text>
            </View>
          </>
        ) : item.title === 'ebay Count' && item.enabled ? (
          <>
            <TextInput
              style={[styles.textInput,{marginHorizontal:wp(10),width:wp(33)}]}
              value={ebayCount}
              onChangeText={setEbeyCount}
              placeholder="ebay Count"
              placeholderTextColor={colors.black}
              keyboardType="numeric"
            />
          </>
        ) : null}
        <View style={styles.lineView} />
      </>
    );
  };

  const renderSubItem = ({item}) => {
    return (
      <>
        <View style={styles.lineView} />

        <View style={styles.languageView}>
          <Text
            style={[
              styles.languageText,
              {fontSize: fontSize(12), paddingLeft: wp(5)},
            ]}>
            {item.category}
          </Text>

          <Switch
            trackColor={{false: colors.gray, true: colors.green}}
            thumbColor={colors.white}
            ios_backgroundColor={colors.gray}
            onValueChange={() =>
              setCategory(prevListData =>
                prevListData.map(data =>
                  data.id === item.id
                    ? {...data, enabled: !data.enabled}
                    : data,
                ),
              )
            }
            value={item.enabled}
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <BtnIconText
        source={icons.backFat}
        title={stringslang.NOTIFICATIONS_SETTING}
        onPress={() => goBack()}
        mainContainer={styles.headerMainView}
        textStyle={styles.headerText}
        iconStyle={{tintColor: colors.blue}}
      />
      <View style={styles.viewSelectLang}>
        <View style={styles.leftContent}>
          <FlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[colors.bgBlue, colors.lightBlue]}
          style={[styles.linearGradient]}>
          <Text style={[styles.buttonText]}>Submit</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        nRequestClose={() => setModalVisible(false)}>
        <View style={[styles.Container]}>
          <View style={styles.modal}>
            <Text style={[styles.toTextStyle]}>
              {'Be a premium user to access this content.'}
            </Text>
            <View style={styles.modalBtnView}>
              <TouchableOpacity
                onPress={() => navigate(routeName.subscription)}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[colors.bgBlue, colors.lightBlue]}
                  style={styles.btngradientStyle}>
                  <Text style={[styles.buttonText]}>ok</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[colors.bgBlue, colors.lightBlue]}
                  style={styles.btngradientStyle}>
                  <Text style={[styles.buttonText]}>{stringslang.CLOSE}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: statusBar,
    backgroundColor: colors.white,
  },
  headerMainView: {
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(4.3),
  },
  headerText: {
    color: colors.blue,
    marginLeft: wp(3.5),
    fontSize: fontSize(14),
  },

  viewSelectLang: {backgroundColor: colors.white, flex: 1, marginTop: hp(2)},
  selectText: {
    fontWeight: 'bold',
    fontSize: fontSize(18),
    color: colors.textColor,
  },
  innerView: {
    backgroundColor: colors.white,
    flex: 16,
    padding: 15,
    borderRadius: 4,
    marginVertical: hp(2),
  },
  languageView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: wp(10),
    paddingRight: wp(4),
  },
  languageText: {
    color: colors.textColor,
    fontSize: fontSize(16),
    textAlign: 'left',
    marginVertical: hp(0.2),
  },
  lineView: {
    borderWidth: 0.2,
    marginVertical: hp(1.3),
    borderColor: colors.gray,
    opacity: 0.4,
  },
  touchableText: {width: '90%', justifyContent: 'center'},
  linearGradient: {
    height: hp(5.9),
    alignItems: 'center',
    borderRadius: wp(2.15),
    justifyContent: 'center',
    margin: hp(2.5),
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: fontSize(14),
  },
  inputStyle: {
    width: wp(30),
    marginHorizontal: wp(0),
    paddingVertical: hp(1),
    height: hp(4),
    alignItems: 'center',
    borderWidth: wp(0.3),
    borderRadius: wp(2.15),
    backgroundColor: colors.textInputBg,
    borderColor: 'rgba(31, 61, 77, 0.1)',
  },
  toTextStyle: {
    fontSize: fontSize(16),
    textAlign: 'center',
    fontWeight: '600',
    color: colors.black,
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    // width: '80%',
    height: hp(4),
    borderWidth: 1,
    borderColor: 'rgba(31, 61, 77, 0.1)',
    borderRadius: 10,
    paddingHorizontal: wp(7),
    paddingVertical: hp(0.4),
    marginVertical: 7,
    color: colors.black,
    backgroundColor: 'rgba(31, 61, 77, 0.1)',
    fontSize: fontSize(14),
    fontWeight: '700',
  },
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // marginHorizontal: 30,
    // opacity: 0.5,
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: hp(2),
    height: 'auto',
    width: wp(80),
    padding: hp(2.75),
  },
  btngradientStyle: {
    paddingHorizontal: wp(13),
    padding: hp(2),
    borderRadius: wp(2),
    marginVertical: hp(3),
    opacity: 0.9,
  },
  modalBtnView: {flexDirection: 'row', justifyContent: 'space-between'},
  rightContentHeader: {
    paddingRight: wp(10),
    fontSize: fontSize(14),
    color: colors.black,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default NotificationSettingScreen;
