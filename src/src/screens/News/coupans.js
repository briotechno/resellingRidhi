import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { images } from '../../helper/iconConstant';
import { fonts } from '../../helper/fontConstant';
import { colors } from '../../helper/colorConstant';
import LinearGradient from 'react-native-linear-gradient';

const Coupans = () => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Offers on games and clothes',

      date: 'Expired on: 05/08/2022 3:34 PM',
      image_url: '50%',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Offers on games and clothes',
      date: 'Expired on: 05/08/2022 3:34 PM',
      image_url: '20£',


    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Offers on games and clothes',

      date: 'Expired on: 05/08/2022 3:34 PM',
      image_url: '50%',
    },

    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Offers on games and clothes',
      date: 'Expired on: 05/08/2022 3:34 PM',
      image_url: '20£',


    },

    // image_url: require('../../../assets/images/newslist3.png'),

    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Offers on games and clothes',
      subtitle:
        'Quick, get this offer before it expires. Only valid for new users.',
      date: 'Expired on: 05/08/2022 3:34 PM',
      image_url: '20£',



      // image_url: require('../../../assets/images/newslist4.png'),
    },
  ];

  const renderItem = ({ item }) => {
    return (
      // <View style={styles.item}>
      <View style={{}}>
        <View
          style={{
            backgroundColor: '#fff',
            margin: 8,
            flexDirection: 'row',

            elevation: 2,
            shadowRadius: 5,
            shadowOpacity: 0.5,
            shadowColor: colors.gray,
            shadowOffset: { height: 3, width: 3 },

            margin: 8,
            marginHorizontal: 16,
            borderRadius: 10,
          }}>
          <View
            style={{
              flex: 1.3,
              borderRightColor: '#E5E7E9',
              borderRightWidth: 1,
              alignItems: 'center', justifyContent: 'center'
            }}>
            {/* <Image
              source={item.image_url}
              style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
            /> */}
            <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#1F3D4D' }} >{item.image_url}</Text>
          </View>
          <View style={{ flex: 2, }}>
            <View style={{ padding: 12 }}>
              <Text
                style={{
                  color: '#1F3D4D',
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}>
                {item.title}
              </Text>



              <LinearGradient
                colors={[
                  '#2C398B',
                  '#2C398B',
                  '#2C398B',
                  '#01AAEC',
                  '#01AAEC',
                  '#01AAEC',
                ]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={{
                  padding: 1,
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    padding: 7,
                    width: '100%',
                    borderRadius: 9,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                  }}>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 12,
                      color: '#2C398B',
                    }}>
                    Tap to view
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View
              style={{
                borderWidth: 0.2,
              
                borderColor: '#1F3D4D',
                opacity: 0.4,
              }}
            />
            <View style={{ padding: 10 }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  color: '#1F3D4D',
                  opacity: 0.4,
                }}>
                {item.date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={{ marginTop: 8 }}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  grediant: {
    height: 44,
    width: 300,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonContainer: {
    flex: 1.0,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '99%',
    margin: 1
  },
  buttonText: {
    textAlign: 'center',
    color: '#4C64FF',
    alignSelf: 'center',
  }
});

export default Coupans;
