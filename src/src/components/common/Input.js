import React from "react";
import { View, StyleSheet, TextInput, Image, Platform } from "react-native";
import { colors } from "../../helper/colorConstant";
import { strings } from "../../helper/constants";
import { fontSize, hp, isIos, wp } from "../../helper/utilities";

const Input = ({
  value,
  source,
  onChange,
  placeholder,
  mainContainer,
  textInputStyle,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <View style={[styles.mainContainer, mainContainer]}>
      <TextInput
        value={value}
        autoCorrect={false}
        onChangeText={onChange}
        autoCapitalize={"none"}
        style={[styles.textInput, textInputStyle]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.textColor}
        keyboardType={keyboardType}
      />
      <Image
        source={source}
        style={styles.imageStyle}
        resizeMode={strings.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: hp(1),
    alignItems: "center",
    borderWidth: wp(0.3),
    flexDirection: "row",
    borderRadius: wp(2.15),
    paddingVertical: isIos ? hp(1.6) : 0,
    marginHorizontal: wp(6.4),
    paddingHorizontal: wp(4.6),
    backgroundColor: colors.textInputBg,
    borderColor: "rgba(31, 61, 77, 0.1)",
  },
  textInput: {
    flex: 1,
    opacity: 0.6,
    fontWeight: "bold",
    marginRight: wp(4.6),
    fontSize: fontSize(12),
    color: colors.textColor,
  },
  imageStyle: {
    width: wp(4.3),
    height: wp(4.3),
  },
});

export default Input;
