import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  I18nManager,
} from 'react-native';
// import LngBtn from './LngBtn';
import {icons} from '../helper/iconConstant';
import {colors} from '../helper/colorConstant';
import {statusBar, fontSize, hp, wp} from '../helper/utilities';
import {BtnIconText} from '../components';
import LinearGradient from 'react-native-linear-gradient';
import {setLng, getLng} from '../helper/changeLng';
import strings from './lng/LocalizedStrings';
import RNRestart from 'react-native-restart';
const Screen = ({navigation}) => {
  console.log('open setting');
  const [isCheck, setIsCheck] = useState(0);
  const SelectLanguage = id => {
    console.log('id:::', id);
    if (id === 0) {
      setIsCheck(0);
    } else {
      setIsCheck(1);
    }
  };

  const selectedLng = async () => {
    console.log('cll selectedlng');
    const lngData = await getLng();
    if (!!lngData) {
      strings.setLanguage(lngData);
    }
    console.log('selected Language data==>>>', lngData);
  };

  const onChangeLng = async lng => {
    console.log('lag ::: ', lng);
    if (lng === 'en') {
      I18nManager.forceRTL(false);
      setLng('en');
      RNRestart.Restart();
      return;
    }

    if (lng === 'hi') {
      I18nManager.forceRTL(false);
      setLng('hi');
      RNRestart.Restart();
      return;
    }
  };

  useEffect(() => {
    selectedLng();
  }, []);

  return (
    // <View style={styles.mainView}>
    //     {/* <LngBtn/> */}
    // </View>
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerMainView}>
        <BtnIconText
          title={"Language"}
          source={icons.backFat}
          onPress={() => navigation.goBack()}
          textStyle={styles.headerText}
          mainContainer={styles.headerMainView}
        />
      </View>
      <View style={styles.viewSelectLang}>
        <Text style={styles.selectText}>{'Select Language'}</Text>
        <View style={styles.innerView}>
          <View style={styles.languageView}>
            <TouchableOpacity onPress={() => SelectLanguage(0)} style={styles.touchableText}>
              <Text style={styles.languageText}>{"English"}</Text>
            </TouchableOpacity>
            {isCheck === 0 ? (
              <Image source={icons.check} style={styles.imgStyle} />
            ) : null}
          </View>
          <View style={styles.lineView} />
          <View style={styles.languageView}>
            <TouchableOpacity onPress={() => SelectLanguage(1)} style={styles.touchableText}>
              <Text style={styles.languageText}>{'German'}</Text>
            </TouchableOpacity>
            {isCheck === 1 ? (
              <Image source={icons.check} style={styles.imgStyle} />
            ) : null}
          </View>
          <View style={styles.lineView} />
        </View>
        <TouchableOpacity
          // style={styles.mainContainer}
          onPress={() => {
            if (isCheck === 0) {
              onChangeLng('en');
            } else {
              onChangeLng('hi');
            }
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[colors.bgBlue, colors.lightBlue]}
            style={[styles.linearGradient]}>
            <Text style={[styles.buttonText]}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    fontWeight: '700',
    textAlign: 'center',
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
    fontSize:fontSize(15)
  },
  moreDetailMainView: {
    flex: 1,
    paddingHorizontal: wp(8.5),
    borderTopLeftRadius: wp(6.4),
    borderTopRightRadius: wp(6.4),
    backgroundColor: colors.white,
  },
  linearGradient: {
    height: hp(5.9),
    alignItems: 'center',
    borderRadius: wp(2.15),
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: fontSize(14),
  },
  imgStyle: {
    width: wp(6.9),
    height: wp(6.9),
  },
  viewSelectLang: {backgroundColor: colors.textInputBg, flex: 16, padding: 15},
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
  languageView: {flexDirection: 'row', justifyContent: 'space-between'},
  languageText: {
    color: colors.black,
    fontSize: fontSize(16),
    textAlign:'left',
    marginVertical:hp(0.4)
  },
  lineView: {
    borderWidth: 0.2,
    marginVertical: hp(2),
    borderColor: '#1F3D4D',
    opacity: 0.4,
  },
  touchableText:{width:'90%',justifyContent:'center'}
});

export default Screen;
