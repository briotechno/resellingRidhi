import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import {routeName, storageKey} from '../../helper/constants';

import {BtnIconText, GradientBtn, Input, Loading} from '../../components';
import {colors} from '../../helper/colorConstant';
import {strings} from '../../helper/constants';
import {icons, images} from '../../helper/iconConstant';
import {goBack} from '../../helper/rootNavigation';
import {fontSize, hitSlop, hp, statusBar, wp} from '../../helper/utilities';
import {updateUserProfile} from '../../actions/ProfileAction';
import {getAsyncStorage, removeAsyncStorage} from '../../helper/globalFunction';
import {useDispatch} from 'react-redux';
import stringslang from '../lng/LocalizedStrings';
const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [userImg, setUserImg] = useState(null);
  const [filename, setfileName] = useState(null);
  const [type, setType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log('image:::', userImg);
  const dispatch = useDispatch();
  const {userProfile} = useSelector(state => state.profile);

  const actionSheet = useRef();
  const updateProfileApicall = async () => {
    // setIsLoading(true);
    let userDetail = await getAsyncStorage(storageKey.userDetails);
    console.log('userDetail', userDetail?.id);

    const formdata = new FormData();
    formdata.append('id', userDetail?.id);
    formdata.append('name', fullName);
    formdata.append('email', userDetail?.email);
    // formdata.append('image_url', userImg);
    formdata.append('image_url', {
      uri: userImg,
      name: filename,
      type: type,
    });
    const request = {
      data: formdata,
      onSuccess: async res => {
        // setLoading(false);
        if (res) {
          console.log('response of updateProfile::', res);
          goBack();
        }
      },
      onFail: error => {
        console.log('Error ::--', error);
        // setLoading(false);
      },
    };
    dispatch(updateUserProfile(request));
  };
  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile?.name);
      setUserImg(userProfile?.imageName);
    }
  }, [userProfile]);

  const onFullNameTxtChange = text => {
    setFullName(text);
  };

  const onChangePhoto = () => {
    actionSheet.current.show();
  };

  const onOpenCameraPress = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(image => {
      console.log('image::', image);
      const file = image.path.substring(image.path.lastIndexOf('/') + 1);
      setfileName(file);
      setUserImg(image?.path);
      setType(image?.mime);

    });
  };

  const onChoosePhotoPress = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then(image => {
      console.log('image::', image);
      const file = image.path.substring(image.path.lastIndexOf('/') + 1);
      setfileName(file);
      setUserImg(image?.path);
      setType(image?.mime);
    });
  };

  return (
    <View style={styles.mainContainer}>
      {/* <Loading value={isLoading} /> */}
      <BtnIconText
        source={icons.backFat}
        title={stringslang.PROFILE}
        onPress={() => goBack()}
        mainContainer={styles.headerMainView}
        textStyle={styles.headerText}
      />
      <View style={styles.innerMainView}>
        <View style={styles.innerView}>
          <View style={styles.imageTextMainView}>
            <View style={styles.imgViewStyle}>
              <Image
                source={userImg !== null ? {uri: userImg} : images.profile}
                style={styles.imgStyle}
                resizeMode={strings.cover}
              />
            </View>
            <TouchableOpacity hitSlop={hitSlop(10)} onPress={onChangePhoto}>
              <Text style={styles.changeTextStyle}>
                {stringslang.CHANGE_PHOTO}
              </Text>
            </TouchableOpacity>
            <Input
              value={fullName}
              source={null}
              onChange={onFullNameTxtChange}
              placeholder={stringslang.FULLNAME}
              mainContainer={[
                styles.gradientMainView,
                {
                  marginTop: hp(3.7),
                },
              ]}
              textInputStyle={{opacity: 1}}
            />
          </View>
          <GradientBtn
            title={stringslang.UPDATE_PROFILE}
            onPress={() => updateProfileApicall()}
            mainContainer={styles.gradientMainView}
          />
        </View>
      </View>

      <ActionSheet
        ref={actionSheet}
        options={[strings.openCamera, strings.choosePhoto, strings.cancel]}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={index => {
          if (index === 0) {
            onOpenCameraPress();
          } else if (index === 1) {
            onChoosePhotoPress();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: statusBar,
    backgroundColor: colors.bgBlue,
  },
  headerMainView: {
    paddingVertical: hp(2.2),
    paddingHorizontal: wp(3.75),
  },
  headerText: {
    marginLeft: wp(5),
  },
  innerMainView: {
    flex: 1,
    backgroundColor: colors.textInputBg,
  },
  imgViewStyle: {
    borderWidth: 2,
    width: wp(37.6),
    height: wp(37.6),
    alignItems: 'center',
    borderRadius: wp(18.8),
    justifyContent: 'center',
    borderColor: colors.lightBlue,
  },
  imgStyle: {
    width: wp(34.2),
    height: wp(34.2),
    borderRadius: wp(17.1),
  },
  innerView: {
    flex: 1,
    elevation: 10,
    margin: wp(5.2),
    shadowRadius: 5,
    shadowOpacity: 0.25,
    alignItems: 'center',
    borderRadius: wp(2.15),
    shadowColor: colors.black,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    shadowOffset: {height: 3, width: 0},
  },
  imageTextMainView: {
    marginTop: hp(6.65),
    alignItems: 'center',
  },
  changeTextStyle: {
    opacity: 0.91,
    fontWeight: '700',
    marginTop: hp(3.7),
    fontSize: fontSize(14),
    color: colors.lightBlue,
    textDecorationLine: 'underline',
  },
  gradientMainView: {
    width: wp(82),
    marginBottom: hp(2.5),
  },
});

export default EditProfile;
