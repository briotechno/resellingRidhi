// import React from 'react';
// import {View, StyleSheet, Text} from 'react-native';

// const Coupons = () => {
//   return (
//     <View style={styles.mainContainer}>
//       <Text>{'NewsTabList Screen'}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default Coupons;

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {images} from '../../helper/iconConstant';
import {fonts} from '../../helper/fontConstant';
import {colors} from '../../helper/colorConstant';
import {useDispatch} from 'react-redux';
import {getcouponsList} from '../../actions/newsAction';
import moment from 'moment/moment';
import {fontSize, hp, statusBar, wp} from '../../helper/utilities';
import {strings} from '../../helper/constants';
import {Loading} from '../../components';
const Coupons = () => {
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
    dispatch(getcouponsList(request));
  }, []);
  const renderItem = ({item}) => {
    return (
      <View style={{}}>
        <View style={styles.mainView}>
          <View style={styles.perViewStyle}>
            <Text style={styles.perTextStyle}>{item.amount_percentage}</Text>
          </View>
          <View style={{flex: 2}}>
            <View style={{padding: 12}}>
              <Text style={styles.titleText}>{item.title}</Text>

              <LinearGradient
                colors={[
                  '#2C398B',
                  '#2C398B',
                  '#2C398B',
                  '#01AAEC',
                  '#01AAEC',
                  '#01AAEC',
                ]}
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 1.0}}
                style={styles.gradiantStyle}>
                <TouchableOpacity style={styles.touchableStyle}>
                  <Text style={styles.touchableTextStyle}>Tap to view</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={styles.lineView} />
            <View style={{padding: 10}}>
              <Text style={styles.expTextStyle}>{item.expiry_date}</Text>
            </View>
          </View>
        </View>
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
    margin: 8,
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
  title: {
    fontSize: 32,
  },
  grediant: {
    height: 44,
    width: 300,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    flex: 1.0,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '99%',
    margin: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: '#4C64FF',
    alignSelf: 'center',
  },
  perViewStyle: {
    flex: 1.3,
    borderRightColor: '#E5E7E9',
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  perTextStyle: {fontSize: 35, fontWeight: 'bold', color: '#1F3D4D'},
  titleText: {
    color: '#1F3D4D',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gradiantStyle: {
    padding: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  touchableStyle: {
    padding: 7,
    width: '100%',
    borderRadius: 9,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  touchableTextStyle: {
    fontWeight: '400',
    fontSize: 12,
    color: '#2C398B',
  },
  lineView: {
    borderWidth: 0.2,
    borderColor: '#1F3D4D',
    opacity: 0.4,
  },
  expTextStyle: {
    fontWeight: '400',
    fontSize: 12,
    color: '#1F3D4D',
    opacity: 0.4,
  },
});

export default Coupons;
