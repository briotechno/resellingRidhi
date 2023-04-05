import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ChangePassword = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>{'Change Password Screen'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChangePassword;
