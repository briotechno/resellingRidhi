import React from 'react';
import {View, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../helper/colorConstant';
import {wp} from '../../helper/utilities';

const Loading = ({visible}) => {
  return (
    <Modal isVisible={visible} hasBackdrop style={{margin: 0}}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.containerStyle}>
          <ActivityIndicator color={colors.black} size={'large'} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  containerStyle: {
    width: wp(22),
    height: wp(22),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});

export default Loading;
