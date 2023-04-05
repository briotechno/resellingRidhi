import React,{useEffect,useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text, ScrollView} from 'react-native';

import {AboutDescWithTitle, BtnIconText} from '../../components';
import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {icons} from '../../helper/iconConstant';
import {goBack} from '../../helper/rootNavigation';
import {fontSize, hp, statusBar, wp} from '../../helper/utilities';
import stringslang from '../lng/LocalizedStrings';
import { useDispatch } from 'react-redux';
import { getPrivacyPolicy } from '../../actions/ProfileAction';
const PrivacyPolicy = () => {

  const dispatch = useDispatch();
  const [privacyText, setPrivacyText] = useState('');
  const privacypolicyApicall = async () => {
    // setIsLoading(true);
    const request = {
      onSuccess: async res => {
        // setLoading(false);
        if (res) {
          console.log('response of updateProfile::', res);
          setPrivacyText(res.privacy_policy_text)
        }
      },
      onFail: error => {
        console.log('Error ::--', error);
        // setLoading(false);
      },
    };
    dispatch(getPrivacyPolicy(request));
  };

  useEffect(() => {
    privacypolicyApicall();
  }, []);


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
        <Text style={styles.headerTitleTxt}>{stringslang.PRIVACY_POLICY}</Text>
        <View style={styles.moreDetailMainView}>
          <ScrollView bounces={false}>
            <AboutDescWithTitle
              // title={stringslang.ABOUT_US_TEXT1}
              desc={privacyText}
            />
            {/* <AboutDescWithTitle
              title={stringslang.ABOUT_US_TEXT2}
              desc={strings.whereDoesDesc}
            /> */}
          </ScrollView>
        </View>
      </View>
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
  },
  moreDetailMainView: {
    flex: 1,
    paddingHorizontal: wp(8.5),
    borderTopLeftRadius: wp(6.4),
    borderTopRightRadius: wp(6.4),
    backgroundColor: colors.white,
  },
});

export default PrivacyPolicy;
