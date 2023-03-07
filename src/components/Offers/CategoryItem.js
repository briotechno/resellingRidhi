import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../helper/colorConstant";
import { icons } from "../../helper/iconConstant";
import { fontSize, hp, wp } from "../../helper/utilities";

const CategoryItem = ({ onItemPress, data, renderItemBrand }) => {
  return (
    <>
      <View style={styles.checkBoxView}>
        <TouchableOpacity
          onPress={onItemPress}
          style={
            data.isChecked
              ? styles.checkBoxViewEnable
              : styles.checkBoxDisableView
          }
        >
          {data.isChecked ? (
            <Image
              source={icons.checkRight}
              style={{
                width: wp(3.5),
                height: wp(3.5),
                tintColor: "white",
              }}
            />
          ) : null}
        </TouchableOpacity>
        <Text style={styles.keepTextStyle}>{data.category}</Text>
      </View>
      {data.isChecked && data.brands.lenght !== 0 ? (
        <FlatList
          data={data.brands}
          renderItem={({ item, index }) =>
            renderItemBrand({ brandItem: item, idx: index })
          }
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  checkBoxView: {
    alignSelf: "flex-start",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: hp(1),
  },
  checkBoxViewEnable: {
    borderRadius: hp(0.4),
    backgroundColor: colors.blueTxt,
    borderStyle: "solid",
    borderWidth: 1,
    width: wp(6),
    height: wp(6),
    borderColor: colors.blueTxt,
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxDisableView: {
    borderRadius: hp(0.4),
    backgroundColor: colors.white,
    borderStyle: "solid",
    borderWidth: 1,
    width: wp(6),
    height: wp(6),
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  keepTextStyle: {
    fontWeight: "400",
    fontSize: fontSize(14),
    color: colors.gray,
    marginHorizontal: hp(1),
    textAlign: "center",
  },
});

export default CategoryItem;
