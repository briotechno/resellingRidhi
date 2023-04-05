import React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import Modal from "react-native-modal";
import FastImage from "react-native-fast-image";

import { colors } from "../../helper/colorConstant";
import { icons } from "../../helper/iconConstant";
import { statusBar, wp } from "../../helper/utilities";

const PreviewImgModal = ({ isVisible, imageSource, onClosePress }) => {
  return (
    <Modal
      hasBackdrop
      isVisible={isVisible}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      style={styles.modalStyle}
    >
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={onClosePress} style={styles.closeImgView}>
          <Image source={icons.cancel} style={styles.closeImgStyle} />
        </TouchableOpacity>
        {imageSource && (
          <FastImage
            source={imageSource}
            resizeMode={"stretch"}
            style={styles.previewImgStyle}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    backgroundColor: colors.black,
  },
  mainContainer: {
    flex: 1,
    width: wp(100),
    justifyContent: "center",
  },
  closeImgView: {
    right: wp(4),
    position: "absolute",
    top: statusBar + wp(2),
  },
  closeImgStyle: {
    width: wp(6),
    height: wp(6),
  },
  previewImgStyle: {
    width: wp(100),
    height: wp(75),
  },
});

export default PreviewImgModal;
