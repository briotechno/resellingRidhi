import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../helper/colorConstant';
import {useDispatch} from 'react-redux';
import {getNewsList} from '../../actions/newsAction';
import moment from 'moment/moment';
import {hp, wp} from '../../helper/utilities';
import {strings, routeName} from '../../helper/constants';
import {Loading} from '../../components';
import {navigate} from '../../helper/rootNavigation';
import stringslang from '../lng/LocalizedStrings';

const NewsTabList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    const request = {
      onSuccess: async res => {
        setLoading(false);
        if (res) {
          console.log('responseNEWs::', res);
          setData(res);
        }
      },
      onFail: error => {
        console.log('Error ::--', error.response.data);
        setLoading(false);
      },
    };
    dispatch(getNewsList(request));
  }, []);

  const renderItem = ({item}) => {
    const htmlStr = item.news_description;

    const newStr = htmlStr.replace(/(<([^>]+)>)/gi, '');
    const secondRegEx = /((&nbsp;))*/gim;
    const result = newStr.replace(secondRegEx, '');
    console.log('newStr:::', result);
    return (
      <View>
        <TouchableOpacity
          style={styles.mainView}
          onPress={() =>
            navigate(routeName.newsDetails, {
              item,
            })
          }>
          {/* <View style={styles.imageBrandStyle}> */}
            <Image
              style={styles.imageBrandStyle}
              resizeMode={strings.cover}
              source={{
                uri: item?.news_img,
              }}
            />
          {/* </View> */}
          <View style={styles.textView}>
            <View style={{padding: 14, flex: 1}}>
              <Text style={styles.textStyle}>{item.news_name}</Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.textDescStyle}>
                {result}
              </Text>
            </View>
            <View style={styles.lineView} />
            <View style={{padding: 16, paddingTop: 12}}>
              <Text style={styles.dateText}>
                {`${stringslang.UPLOAD_ON}: ${moment(item.created_at).format(
                  'DD/MM/YYYY hh:mm A',
                )}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Loading visible={loading} />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={{marginTop: 8}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.textInputBg,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  mainView: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    elevation: 2,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowColor: colors.black,
    shadowOffset: {height: 2, width: 2},
    margin: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  imgView: {
    flex: 0.8,
  },
  textView: {flex: 2},
  textStyle: {
    color: '#1F3D4D',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textDescStyle: {
    fontWeight: '400',
    fontSize: 12,
    color: '#1F3D4D',
    opacity: 0.4,
  },
  title: {
    fontSize: 32,
  },
  imageBrandStyle: {
    flex: 1,
    width: wp(30),
    height: hp(15),
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  lineView: {
    height: hp(0.2),
    backgroundColor: '#F2F3FA',
  },
  dateText: {
    fontSize: 12,
    opacity: 0.4,
    color: '#1F3D4D',
    fontWeight: '400',
    marginBottom: 8,
  },
});

export default NewsTabList;
